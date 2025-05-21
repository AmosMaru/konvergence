import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../lib/context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="appointment app" className="h-20" />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-900 ${
                isActive ? "text-pink-500" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-900 ${
                isActive ? "text-pink-500" : ""
              }`
            }
          >
            About Us
          </NavLink>
          <NavLink
            to="/consultation"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-900 ${
                isActive ? "text-pink-500" : ""
              }`
            }
          >
            Consultation
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-900 ${
                isActive ? "text-pink-500" : ""
              }`
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-gray-600 hover:text-gray-900 ${
                isActive ? "text-pink-500" : ""
              }`
            }
          >
            Contact Us
          </NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <span className="sr-only">Search</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {user ? (
            <Link
              to="/profile"
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              Profile
            </Link>
          ) : (
            <Link
              to="/auth/signin"
              className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
