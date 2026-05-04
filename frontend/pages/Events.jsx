import React, { useState, useEffect, useMemo } from 'react';
import API from '../api/axios.js';
import { getData } from '../context/userContext.jsx';

const StudentEvents = () => {
    const { user, loading: authLoading } = getData();
    const [events, setEvents] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [showArchive, setShowArchive] = useState(false);

    const formatPosterUrl = (url) => {
        if (!url || !url.includes('drive.google.com')) return url;
        const match = url.match(/\/d\/(.+?)\/(view|edit)?/);
        if (match) {
            const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            return `${backendUrl}/api/events/proxy-poster/${match[1]}`;
        }
        return url;
    };

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await API.get('/api/events');
                setEvents(res.data);
            } catch (err) {
                console.error("Error fetching events", err);
            } finally {
                setFetching(false);
            }
        };
        fetchEvents();
    }, []);

    const { activeEvents, archivedEvents } = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return {
            activeEvents: events.filter(e => new Date(e.date) >= today),
            archivedEvents: events.filter(e => new Date(e.date) < today)
        };
    }, [events]);

    const displayedEvents = showArchive ? archivedEvents : activeEvents;

    if (authLoading || fetching) {
        return <div className="flex items-center justify-center min-h-[60vh] text-gray-500 font-medium">Loading Events...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">College Events</h1>
                <p className="text-gray-500">Participate in events and earn activity points</p>
            </header>

            <div className="flex justify-center mb-10">
                <div className="bg-gray-100 p-1 rounded-xl flex gap-1 border border-gray-200">
                    <button
                        onClick={() => setShowArchive(false)}
                        className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            !showArchive ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Active ({activeEvents.length})
                    </button>
                    <button
                        onClick={() => setShowArchive(true)}
                        className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all ${
                            showArchive ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Archived ({archivedEvents.length})
                    </button>
                </div>
            </div>

            {displayedEvents.length === 0 ? (
                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-20 text-center">
                    <p className="text-gray-400 text-lg">
                        {showArchive ? 'No history of events found.' : 'No upcoming events at the moment.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayedEvents.map((event) => (
                        <div key={event._id} className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
                            <div className="relative h-52 overflow-hidden">
                                <img 
                                    src={formatPosterUrl(event.posterUrl)} 
                                    alt={event.eventName} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    onError={(e) => { e.target.src = 'https://placehold.co/600x400?text=Event+Poster'; }}
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-blue-700 font-bold text-sm shadow-sm">
                                    {event.points} Pts
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{event.eventName}</h3>
                                <div className="flex items-center text-gray-500 text-sm mb-6">
                                    <span className="mr-2">📅</span>
                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </div>

                                {event.registrationUrl && !showArchive ? (
                                    <a 
                                        href={event.registrationUrl} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="w-full inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-100"
                                    >
                                        Register Now
                                    </a>
                                ) : (
                                    <div className="w-full py-3 text-center text-gray-400 font-medium bg-gray-50 rounded-xl">
                                        {showArchive ? 'Event Concluded' : 'Registration Closed'}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentEvents;