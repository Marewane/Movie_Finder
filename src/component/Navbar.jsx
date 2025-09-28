import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full px-6 py-4 flex justify-center">
      <div className="w-full max-w-6xl bg-gray-800/70 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="./src/assets/MovieLogo.png"
            alt="Website Logo"
            className="h-9 w-auto"
          />
          <Link to="/" className="text-base font-semibold text-white hover:text-sky-200">
            Movie Finder
          </Link>
        </div>

        {/* Right: Categories + Subscribe */}
        <div className="flex items-center gap-6 relative">
          {/* Navigation Links */}
          <Link 
            to="/movies" 
            className={`hover:text-sky-200 transition-colors ${
              isActive('/movies') ? 'text-sky-200' : 'text-white'
            }`}
          >
            Movies
          </Link>
          <Link 
            to="/tv-shows" 
            className={`hover:text-sky-200 transition-colors ${
              isActive('/tv-shows') ? 'text-sky-200' : 'text-white'
            }`}
          >
            TV Shows
          </Link>
          <Link 
            to="/about" 
            className={`hover:text-sky-200 transition-colors ${
              isActive('/about') ? 'text-sky-200' : 'text-white'
            }`}
          >
            About
          </Link>

          {/* Subscribe button */}
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Subscribe
          </button>
        </div>
      </div>
    </header>
  );
}