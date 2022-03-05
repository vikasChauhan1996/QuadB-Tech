import logo from './logo.svg';
import './App.css';
import ListOfMovies from './Components/MoviesList/MoviesList';
import {Routes,Route} from 'react-router-dom'
import MovieBookingDetails from './Components/MoviesList/MovieDetails';
import BookingForm from './Components/MoviesList/BookingForm';

function App() {
  return (
    <div className='App' >
      <Routes>
      
        <Route exact path='/' element={<ListOfMovies />} />
        <Route path='movie/:id/:movie_name' element={<MovieBookingDetails />} />
        <Route path='/booking/:id/:name' element={<BookingForm />} />
      </Routes>
      {/* <BookingForm /> */}
  
    </div>
  );
}

export default App;
