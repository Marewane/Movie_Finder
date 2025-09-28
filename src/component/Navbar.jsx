import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full px-6 py-4 flex justify-center ">
      <div className="w-full max-w-6xl bg-gray-800/70 backdrop-blur-sm rounded-2xl px-6 py-3 flex items-center justify-between">
        {/* Left: Logo + Name */}
        <div className="flex items-center gap-3">
          <img
            src="./src/assets/MovieLogo.png"
            alt="Website Logo"
            className="h-9 w-auto"
          />
          <a href="#" className="text-base font-semibold text-white">
            Movie Finder
          </a>
        </div>

        {/* Middle: Search bar */}
        <div className="flex-1 flex justify-center px-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-xl"
          />
        </div>

        {/* Right: Categories + Subscribe */}
        <div className="flex items-center gap-6 relative">
         {/* Category Dropdown */}
        <div className="relative group">
          <button className="text-gray-700 hover:text-blue-500">
            Categories
          </button>
          <ul className="absolute left-0 top-full mt-2 w-40 bg-white shadow-lg rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Movies</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Tv-Shows</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Cartoon</li>
          </ul>
        </div>


          {/* Subscribe button */}
          <a href="#subscribe">
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer">
              Subscribe
            </button>
          </a>
        </div>
      </div>
    </header>
  );
}
