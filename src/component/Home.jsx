import HeroSec from '../component/HeroSec';
import TrendingMovies from '../component/TrendMovies';
import TVShows from '../component/TVShows';
import TopRated from '../component/TopRated';
import TopRatedTV from '../component/TopRatedTV';

export default function Home() {
  return (
    <>
      <HeroSec />
      <div className="container mx-auto px-4 space-y-8">
        <TrendingMovies />
        <TVShows />
        <TopRated />
        <TopRatedTV />
      </div>
    </>
  );
}