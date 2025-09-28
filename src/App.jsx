import { Routes, Route } from 'react-router-dom';
import './App.css';
import Movies from './component/TrendMovies';
import MainPage from './pages/mainPage';
import MovieDetails from './component/MovieDetails';



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage/>} />
        <Route path='/movies/:movie_id' element={<MovieDetails/>} />
      </Routes>
    </>
  )
}

export default App
