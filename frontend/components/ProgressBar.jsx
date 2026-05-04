import React from "react";

function ProgressBar ({ confirmed = 0, pending = 0, total = 100 }) {

    const confirmedWidth = (confirmed / total) * 100;
    const pendingWidth = (pending / total) * 100;
    const remainingWidth = ((total - pending - confirmed) / total) * 100

    return (
    <div className='w-full mx-auto px-4'>
        <div className="h-16 flex items-center bg-white px-1 relative">
        
        <div 
          style={{ width: `${confirmedWidth}%` }} 
          className={`group/segment relative h-6 bg-[#4ade80] hover:h-7 hover:bg-[#22c55e] hover:shadow-md 
          rounded-l-full transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center
          ${confirmed === total ? 'rounded-r-full' : ''}`}
        >
          <div className="absolute min-w-xl bottom-full mb-3 hidden group-hover/segment:flex flex-col items-center">
            <span className="bg-gray-800 text-white text-sm py-1.5 px-3 rounded shadow-lg">
              Confirmed: {confirmed} 
            </span>
            <div className="w-4 h-4 bg-gray-800 rotate-45 -mt-2 shadow-lg"></div>
          </div>
        </div>

        <div 
          style={{ width: `${pendingWidth}%` }} 
          className={`group/segment relative h-6 bg-[#fbbf24] hover:h-7 hover:bg-[#f59e0b] transition-all 
          duration-300 ease-in-out cursor-pointer flex items-center justify-center
          ${confirmed === 0 ? 'rounded-l-full' : ''}
          ${confirmed + pending === total ? 'rounded-r-full' : ''}`}
        >
          <div className="absolute min-w-xl bottom-full mb-3 hidden group-hover/segment:flex flex-col items-center">
            <span className="bg-gray-800 text-white text-sm py-1.5 px-3 rounded shadow-lg">
              Pending: {pending}
            </span>
            <div className="w-4 h-4 bg-gray-800 rotate-45 -mt-2 shadow-lg"></div>
          </div>
        </div>

        <div 
          style={{ width: `${remainingWidth}%` }} 
          className={`group/segment relative h-6 bg-gray-300 hover:h-7 hover:bg-gray-400 transition-all 
          rounded-r-full duration-300 ease-in-out cursor-pointer flex items-center justify-center
          ${confirmed + pending === 0 ? 'rounded-l-full' : ''}`}
        >
          <div className="absolute min-w-xl bottom-full mb-3 hidden group-hover/segment:flex flex-col items-center">
            <span className="bg-gray-800 text-white text-sm py-1.5 px-3 rounded shadow-lg">
              Still need to earn: {total - pending - confirmed}
            </span>
            <div className="w-4 h-4 bg-gray-800 rotate-45 -mt-2 shadow-lg"></div>
          </div>
        </div>

      </div>
    </div>
    );
};

export default ProgressBar;