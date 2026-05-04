import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import ProgressGraph from '../components/ProgressGraph';
import { getData } from '../context/userContext.jsx';

function StudentHome() {
  const { user, loading } = getData();
  const navigate = useNavigate();

  if (loading) return <div></div>;

  return (
    <div className='bg-gray-100 min-h-[calc(100vh-5rem)] py-8 px-4 md:px-8'>
      <div className='bg-white rounded-2xl max-w-6xl mx-auto px-6 md:px-10 lg:px-16 py-8 shadow-sm border border-gray-200'>
        <div className='mb-8'>
          <h1 className='text-heading-xl text-gray-900'>Your Progress</h1>
          <p className='text-small-secondary mt-2'>Track your confirmed points and pending activities</p>
        </div>

        <div className='divider'></div>
        
        <div className='my-8 bg-gray-50 border border-gray-200 rounded-xl p-6'>
          <h2 className='text-heading-sm text-gray-900 mb-4'>Progress Breakdown</h2>
          <ProgressBar
            confirmed={user?.confirmedPoints || 0}
            pending={user?.pendingPoints || 0}
          />
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-green-500 rounded-full"></div>
              <span className="text-small text-gray-600">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-amber-500 rounded-full"></div>
              <span className="text-small text-gray-600">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-gray-300 rounded-full"></div>
              <span className="text-small text-gray-600">Remaining</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">

        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-full transition-all duration-300 hover:shadow-md card-accent-blue">
          <div className='mb-6'>
            <h2 className='text-heading-md text-gray-900'>Activity Analytics</h2>
            <p className='text-small-secondary mt-1'>Your activity history and trends</p>
          </div>
          <div className='h-[300px]'>
            <ProgressGraph activities={user?.activities} />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl px-8 shadow-sm flex flex-col py-8 text-center h-full transition-all duration-300 hover:shadow-md card-accent-green">
          <div className="mb-8">
            <p className='text-small-secondary mb-4'>Your Points</p>
            <div>
              <span className="text-4xl font-bold text-green-600">{user?.confirmedPoints || 0}</span>
              <p className='text-small text-gray-500 mt-2'>Confirmed Points</p>
            </div>
            <div className='divider-subtle my-6'></div>
            <div>
              <span className="text-4xl font-bold text-amber-500">{user?.pendingPoints || 0}</span>
              <p className='text-small text-gray-500 mt-2'>Pending Points</p>
            </div>
          </div>

          <div className='divider-subtle'></div>

          <div className='mt-8 space-y-3'>
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                navigate("/activities");
              }}
            >
              View Activities
            </button>
            <button
              className="btn btn-secondary w-full"
              onClick={() => navigate("/events")}
            >
              Upcoming Events
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default StudentHome;