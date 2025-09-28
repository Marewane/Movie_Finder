export default function HeroSec() {
  return (
    <section
      className="relative h-[350px] bg-cover bg-center filter filter-[grayscale(80%)] font-sans"
      style={{ backgroundImage: "url('./src/assets/bgimage.jpg')" }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-shadow-sm">Welcome.</h1>
        <p className="text-2xl font-medium mb-6 max-w-xl text-shadow-sm">
          Millions of movies, TV shows and people to discover. Explore now.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-md max-w-xl w-full">
          <input
            type="text"
            placeholder="Search for a movie, TV show, or person..."
            className="w-full px-4 py-3 text-white placeholder-white/70 bg-transparent focus:outline-none"
          />
          <button className="px-4 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Search
          </button>
        </div>
      </div>
    </section>
  );
}
