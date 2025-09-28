import './App.css';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import Movies from './component/TrendMovies';
import HeroSec from './component/HeroSec';
import TVShows from './component/TVShows';
import TopRated from './component/topRated';
import TopRatedTV from './component/TopRatedTV';



function App() {
  return (
    <>
      <Navbar/>
      <HeroSec/>
      <Movies/>
      <TVShows />
      <TopRated/>
      <TopRatedTV/>
      <Footer/>
    </>
  )
}

export default App
