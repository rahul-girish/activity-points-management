import React from "react";
import { useNavigate } from 'react-router-dom';
import { Users, UserCheck, Calendar, FileText } from "lucide-react";

function AdminHome() {
    const navigate = useNavigate();

    return (
        <div className='bg-gray-100 min-h-[calc(100vh-5rem)] py-8 px-4 md:px-8'>
            <div className='bg-white rounded-2xl max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-8 shadow-sm border border-gray-200'>
                <div className='mb-8'>
                  <h1 className='text-heading-xl text-gray-900'>Admin Dashboard</h1>
                  <p className='text-small-secondary mt-2'>Manage students, counselors, events, and submissions</p>
                </div>
                <hr className='my-6 border-gray-200'></hr>
                
                <div className='space-y-8'>
                  {/* Management Section */}
                  <div>
                    <h2 className='text-xs font-bold text-gray-600 uppercase tracking-widest mb-4'>Management</h2>
                    <div className='bg-gray-50 border border-gray-200 rounded-xl p-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    
                        {/* Students Card */}
                        <div
                            className="card card-interactive"
                            onClick={() => {
                                navigate("/admin/students");
                            }}
                        >
                            <div className="flex items-center justify-start mb-4 text-blue-600">
                                <Users className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-heading-sm text-gray-900">
                                    Students
                                </h3>
                                <p className="text-small-secondary mt-1">Manage all students</p>
                            </div>
                        </div>

                        {/* Counselors Card */}
                        <div
                            className="card card-interactive"
                        >
                            <div className="flex items-center justify-start mb-4 text-green-600">
                                <UserCheck className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-heading-sm text-gray-900">
                                    Counselors
                                </h3>
                                <p className="text-small-secondary mt-1">Manage all counselors</p>
                            </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Operations Section */}
                  <div>
                    <h2 className='text-xs font-bold text-gray-600 uppercase tracking-widest mb-4'>Operations</h2>
                    <div className='bg-gray-50 border border-gray-200 rounded-xl p-6'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    
                        {/* Events Card*/}
                        <div
                            className="card card-interactive"
                            onClick={() => {
                                navigate("/admin/events");
                            }}
                        >
                            <div className="flex items-center justify-start mb-4 text-purple-600">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-heading-sm text-gray-900">
                                    Events
                                </h3>
                                <p className="text-small-secondary mt-1">Manage all events</p>
                            </div>
                        </div>

                        {/* Submissions Card */}
                        <div
                            className="card card-interactive"
                            onClick={() => {
                                navigate("/admin/submissions");
                            }}
                        >
                            <div className="flex items-center justify-start mb-4 text-orange-600">
                                <FileText className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-heading-sm text-gray-900">
                                    Submissions
                                </h3>
                                <p className="text-small-secondary mt-1">Manage all submissions</p>
                            </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome;