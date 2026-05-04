import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronDown } from 'lucide-react';
import API from '../api/axios.js';

function StudentsList() {
    const [students, setStudents] = useState([]);
    const [filters, setFilters] = useState({ search: "", branch: "", year: "" });
    const [loading, setLoading] = useState(false);
    const [showBranchDropdown, setShowBranchDropdown] = useState(false);
    const [showYearDropdown, setShowYearDropdown] = useState(false);
    
    const navigate = useNavigate();

    const branches = ["AI", "AS", "BT", "CD", "CH", "CI", "CS", "CV", "CY", "EC", "EE", "ET", "IM", "IS", "ME"];
    const years = [1, 2, 3, 4];

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const { data } = await API.get("/api/admin/students", { params: filters, withCredentials: true});
            setStudents(data.students || []);
        } catch (error) {
            console.error("Error fetching students: ", error);   
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(fetchStudents, 400);
        return () => clearTimeout(timeoutId);
    }, [filters]);

    return (
        <div className="bg-gray-100 min-h-[calc(100vh-5rem)] py-8">
            <div className='bg-white rounded-2xl max-w-6xl mx-auto px-10 py-8 shadow-md'>
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-gray-800 transition-colors mb-4"
                >
                    <ChevronLeft className="w-5 h-5" /> <span>Back to Dashboard</span>
                </button>
                <h1 className='text-3xl font-bold text-gray-700'>Students</h1>
                <hr className='border-gray-200 my-4'></hr>
                
                <div className="flex flex-wrap gap-3 mb-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                            className="pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                            placeholder="Search by name or USN"
                            value={filters.search}
                            onChange={(e) => setFilters({...filters, search: e.target.value})}
                        />
                    </div>

                    <div className="relative w-32">
                        <button
                            type="button"
                            onClick={() => setShowBranchDropdown(!showBranchDropdown)}
                            onBlur={() => setTimeout(() => setShowBranchDropdown(false), 200)}
                            className="w-full px-3 py-2 bg-gray-100 text-left focus:ring-2 focus:ring-blue-500 text-sm rounded-lg outline-none flex justify-between items-center"
                        >
                            <span className="text-gray-700">{filters.branch || "Dept"}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showBranchDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showBranchDropdown && (
                            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                                <button onClick={() => setFilters({...filters, branch: ""})} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">All</button>
                                {branches.map(b => (
                                    <button key={b} onClick={() => setFilters({...filters, branch: b})} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">{b}</button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="relative w-32">
                        <button
                            type="button"
                            onClick={() => setShowYearDropdown(!showYearDropdown)}
                            onBlur={() => setTimeout(() => setShowYearDropdown(false), 200)}
                            className="w-full px-3 py-2 bg-gray-100 text-left focus:ring-2 focus:ring-blue-500 text-sm rounded-lg outline-none flex justify-between items-center"
                        >
                            <span className="text-gray-700">{filters.year ? `Year ${filters.year}` : "Year"}</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showYearDropdown ? 'rotate-180' : ''}`} />
                        </button>
                        {showYearDropdown && (
                            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl">
                                <button onClick={() => setFilters({...filters, year: ""})} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">All</button>
                                {years.map(y => (
                                    <button key={y} onClick={() => setFilters({...filters, year: y.toString()})} className="w-full px-4 py-2 text-left hover:bg-gray-100 text-sm">{y}</button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div>
                    <table className="w-full text-left text-sm border-collapse border-gray-200 border-2">
                        <thead className="bg-gray-100 border-b border-gray-200 text-lg font-semibold text-gray-600">
                            <tr>
                                <th className="px-6 py-4">Name</th>
                                <th className="px-6 py-4">USN</th>
                                <th className="px-6 py-4">Department</th>
                                <th className="px-6 py-4 text-center">Activity Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-500">Loading students...</td>
                                </tr>
                            ) : students.length > 0 ? (
                                students.map((student) => (
                                    <tr 
                                        key={student._id} 
                                        className="hover:bg-gray-100 transition text-gray-600 cursor-pointer"
                                        onClick={() => navigate(`/admin/students/${student._id}`)}
                                    >
                                        <td className="px-6 py-4">{student.username}</td>
                                        <td className="px-6 py-4">{student.usn || "N/A"}</td>
                                        <td className="px-6 py-4">{student.branch || "N/A"}</td>
                                        <td className="px-6 py-4 text-center">{student.confirmedPoints || 0}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-10 text-gray-400">
                                        No students found matching your criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>               
            </div>
        </div>
    );
}

export default StudentsList;