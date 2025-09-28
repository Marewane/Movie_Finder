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

        

        {/* Right: Categories + Subscribe */}
        <div className="flex items-center gap-6 relative">
         {/* Category Dropdown */}
          <a href="#" className=" hover:text-sky-200 ">Movies</a>
          <a href="#" className="hover:text-sky-200">Tv Shows</a>
          <a href="#" className="hover:text-sky-200">About</a>


        


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
