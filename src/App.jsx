import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './component/Navbar';
import HeroSec from './component/HeroSec';
import TrendMovies from './component/TrendMovies';
import TVShows from './component/TVShows';
import TopRated from './component/TopRated';
import TopRatedTV from './component/TopRatedTV';
import SearchResults from './component/SearchResults';
import Footer from './component/Footer';
import MovieSearchPage from './component/MovieSearchPage';

// Home page component
function HomePage() {
  return (
    <>
      <HeroSec />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <TrendMovies />
        <TVShows />
        <TopRated />
        <TopRatedTV />
      </div>
    </>
  );
}

// Movies page component
function MoviesPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <TrendMovies />
      <TopRated />
    </div>
  );
}

// TV Shows page component
function TVShowsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <TVShows />
      <TopRatedTV />
    </div>
  );
}

// About page component
function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About Movie Finder</h1>
      <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
        <p>
          Welcome to Movie Finder, your ultimate destination for discovering amazing movies and TV shows. 
          Our platform helps you explore trending content, find top-rated films, and discover your next favorite watch.
        </p>
        <p>
          We use The Movie Database (TMDB) API to bring you the most up-to-date information about movies and TV shows, 
          including ratings, release dates, and detailed descriptions.
        </p>
        <p>
          Whether you're looking for the latest blockbusters, critically acclaimed series, or hidden gems, 
          Movie Finder makes it easy to browse and search through thousands of titles.
        </p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className='flex-1'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/tv-shows" element={<TVShowsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie-search" element={<MovieSearchPage/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;