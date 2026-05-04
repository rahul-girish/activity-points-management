import React from 'react'

function Login() {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  return (
    <div className="flex min-h-[calc(100vh-5rem)] justify-center items-center bg-gray-100">
      <div className="min-w-md text-center items-center px-10 py-10 bg-white shadow-md border-transparent rounded-xl">
        <h1 className="text-5xl py-3 px-8">Login</h1>
        <hr className="border-gray-600 pb-4"/>
        <div className="text-semibold text-md text-gray-700 pb-4">Use your college mail ID</div>

        <button 
          className="bg-white hover:bg-gray-50 text-lg text-gray-500 text-left border-2 
         border-gray-300 hover:border-blue-100 rounded-2xl pl-8 py-5 mx-5 w-xs flex
          shadow-md active:shadow-none active:translate-y-0.5 active:scale-[0.99]"
          onClick={() => window.open(`${apiUrl}/api/auth/google`, "_self")}
        >
          <span className="mr-2">
            Login with Google
          </span>
          <img 
            src="/assets/images/google_logo.png"
            alt="Google Logo"
            className="h-6 w-6 ml-20"
          />
        </button>

        <div className="text-semibold text-md text-gray-700 pt-8">Having trouble logging in?</div>
        <div className="text-semibold text-md text-gray-700">Contact _____________</div>
      </div>
    </div>
  )
}

export default Login;