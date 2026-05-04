import express from 'express';
import axios from 'axios';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Activity from '../models/Activity.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { syncUserPoints } from '../services/pointsService.js';


const router = express.Router();

router.get('/proxy-poster/:fileId', async (req, res) => {
    try {
        const { fileId } = req.params;
        const response = await axios.get(`https://drive.google.com/uc?export=view&id=${fileId}`, {
            responseType: 'arraybuffer',
            timeout: 10000
        });
        res.set('Content-Type', response.headers['content-type'] || 'image/jpeg');
        res.set('Cache-Control', 'public, max-age=3600');
        res.send(response.data);
    } catch (error) {
        console.error('Poster proxy error:', error.message);
        res.status(500).json({ message: "Failed to fetch poster", error: error.message });
    }
});

router.get('/', async(req, res) => {
    try {
        const events = await Event.find().sort({ date: -1});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: "Error fetching events" });
    }
});

router.get('/user-activities', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('activities');
        res.json(user.activities || []);
    } catch (error) {
        res.status(500).json({ message: "Error fetching activities" });
    }
});

router.post('/create-event', isAuthenticated, isAdmin, async (req, res) => {
    try {
        const { eventName, date, points, posterUrl, registrationUrl } = req.body;

        const newEvent = new Event({
            eventName,
            date: new Date(date),
            points: Number(points),
            posterUrl,
            registrationUrl,
        });

        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (error) {
        console.error("Create Event Error:", error);
        res.status(500).json({ message: "Failed to create master event" });
    }
});

router.post('/add', isAuthenticated, async (req, res) => {
    try {
        const { eventName, date, points, certificateUrl, reportUrl } = req.body;

        const newActivity = new Activity({
            eventName,
            date: new Date(date),
            points: Number(points),
            status: 'pending',
            certificateUrl,
            reportUrl,
            user: req.user._id,
        });

        const savedActivity = await newActivity.save();

        await User.findByIdAndUpdate(req.user._id, {
            $push: { activities: savedActivity._id }
        });
        
        await syncUserPoints(req.user._id);

        res.status(201).json(savedActivity);
    } catch (error) {
        console.error("Add Activity Error:", error);
        res.status(500).json({ message: "Failed to add activity" });
    }
});

router.delete('/delete/:id', isAuthenticated, async (req, res) => {
    try {
        const activityId = req.params.id;

        await Activity.findByIdAndDelete(activityId);

        await User.findByIdAndUpdate(req.user._id, {
            $pull: {activities: activityId}
        });
        await syncUserPoints(req.user._id);

        res.status(200).json({ message: "Activity deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: "Failed to delete activity" });
    }
})

export default router;