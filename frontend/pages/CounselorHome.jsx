import React, { useState, useEffect } from "react";
import API from '../api/axios.js';
import { useNavigate } from "react-router-dom";
import { UserPlus, Search, ExternalLink } from "lucide-react";

function CounselorHome() {
    const [students, setStudents] = useState([]);
    const [newEmail, setNewEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true); // Added for initial load state
    const navigate = useNavigate();

    const fetchMyStudents = async () => {
        try {
            const res = await API.get("/api/counselor/my-students", { withCredentials: true });
            setStudents(res.data);
        } catch (err) { 
            console.error(err); 
        } finally {
            setFetchLoading(false);
        }
    };

    useEffect(() => { fetchMyStudents(); }, []);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await API.post("/api/counselor/add-student", 
                { studentEmail: newEmail }, 
                { withCredentials: true }
            );
            
            alert(res.data.message || "Student added successfully!");
            setNewEmail("");
            await fetchMyStudents();
        } catch (err) {
            console.error("Add student error:", err);
            alert(err.response?.data?.message || "Error adding student. Check if the email exists.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen py-8 px-10">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-md">
                <h1 className="text-3xl text-gray-700 mb-6 font-bold">Counselor Dashboard</h1>

                {/* Add Student Form */}
                <form onSubmit={handleAddStudent} className="flex gap-4 mb-10 bg-gray-50 p-6 rounded-xl border border-gray-200">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input 
                            type="email" 
                            placeholder="Enter student email to add them..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white px-6 py-3 rounded-lg flex items-center gap-2 transition font-semibold`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                        ) : (
                            <UserPlus size={20} />
                        )}
                        {loading ? "Adding..." : "Add Student"}
                    </button>
                </form>

                {/* Students Table */}
                <table className="w-full text-left border-collapse border-2 border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 font-semibold text-lg">
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">USN</th>
                            <th className="px-6 py-4">Branch</th>
                            <th className="px-6 py-4 text-center">Points</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {fetchLoading ? (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-500">Loading students...</td>
                            </tr>
                        ) : students.length > 0 ? (
                            students.map(student => (
                                <tr 
                                    key={student._id} 
                                    // Make the whole row clickable
                                    onClick={() => navigate(`/admin/students/${student._id}`)}
                                    className="hover:bg-blue-50 transition text-gray-600 text-lg cursor-pointer group"
                                >
                                    <td className="px-6 py-4 font-medium group-hover:text-blue-700">{student.username}</td>
                                    <td className="px-6 py-4 font-mono">{student.usn || "NOT SET"}</td>
                                    <td className="px-6 py-4">{student.branch || "N/A"}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-green-600 font-bold">{student.confirmedPoints || 0}</span>
                                        <span className="mx-1 text-gray-400">/</span>
                                        <span className="text-orange-500">{student.pendingPoints || 0}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="text-blue-600 flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                            View Profile <ExternalLink size={16} />
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-gray-400 italic">No students assigned yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CounselorHome;