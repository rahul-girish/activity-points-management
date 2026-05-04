import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../context/userContext.jsx';
import API from '../api/axios.js';

function NavigationBar() {
  const navigate = useNavigate();
  const { user, setUser } = getData();

  const handleHomeClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    else {
      navigate("/");
    }
    
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    try {
      await API.post("/api/auth/logout", {}, { withCredentials: true });
      setUser(null);
      setDropdownOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="h-20 bg-blue-900 text-white flex sticky top-0 z-10 justify-between px-5 shadow-md">

      <button onClick={handleHomeClick}
        className="text-3xl py-3 font-semibold hover:text-blue-100 transition-colors duration-300"
      >Activity Points Tracker (Beta)
      </button>

      <div className="flex">
        <button onClick={handleHomeClick}
          className="px-5 text-lg hover:bg-blue-800 transition duration-300 flex items-center font-medium"
        >
          Home
        </button>

        <button onClick={() => {
          navigate("/about");
        }
        }
          className="px-5 text-lg hover:bg-blue-800 transition duration-300 flex items-center font-medium"
        >
          About
        </button>

        {
          user ? (
            <div className="relative flex" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="px-5 text-lg hover:bg-blue-800 transition duration-300 flex items-center"
              >
                <img
                  src={user.profilePic}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 min-w-60 top-20 text-base text-gray-700 bg-white shadow-lg border border-gray-200 rounded-lg overflow-hidden z-20 transform origin-top transition-all">
                  
                  {user.role === 'student' && (
                    <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      navigate("/profile");
                      setDropdownOpen(false);
                    }}
                  >
                    Profile
                  </div>
                  )}                  
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}>
                    Logout
                  </div>
                </div>)}
            </div>
          ) : (
            <button onClick={() => {
              navigate("/login");
            }
            }
              className="px-5 text-xl hover:bg-[#474747] transition duration-300 flex items-center"
            >Login</button>
          )
        }
      </div>
    </div>
  )
}

export default NavigationBar;