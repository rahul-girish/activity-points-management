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
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
                <div className='mb-8'>
                  <h1 className="text-heading-xl text-gray-900">Counselor Dashboard</h1>
                  <p className='text-small-secondary mt-2'>Add and manage your assigned students</p>
                </div>

                <form onSubmit={handleAddStudent} className="flex gap-4 items-end mb-8 bg-blue-50 p-6 rounded-xl border border-blue-200">
                    <div className="flex-1">
                        <label className="form-label">Add New Student</label>
                        <div className="relative">
                          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                          <input 
                              type="email" 
                              placeholder="student@college.edu"
                              className="form-input w-full pl-10 bg-white"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              required
                          />
                        </div>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`btn ${loading ? 'bg-blue-400' : 'btn-primary'}`}
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <UserPlus size={18} />
                        )}
                        {loading ? "Adding..." : "Add"}
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