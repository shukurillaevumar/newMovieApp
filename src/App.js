import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from './Components/card';



function App() {
  const [searchText, setSearchText] = useState("");
  const [receivedData, setReceivedData] = useState(null);
  const [banner, setBanner] = useState("");

  async function findMovie(e) {
    e.preventDefault();
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=7553ef4c42d4e9fa752f1280a0cc08de&query=${searchText}`
    );
    setReceivedData(res.data.results);
  }

  const findMovieForBanner = async() => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=7553ef4c42d4e9fa752f1280a0cc08de&query=Avatar the way of water`
    );

    setBanner(response.data.results[0])
  }

  useEffect(() => {
    findMovieForBanner()
  }, [])



  return (
    <div className="App">
        <div className="container">
          <form onSubmit={findMovie}>
            <input required type='text' placeholder="Search" className="inputSearch" onChange={(e) => setSearchText(e.target.value)} />
            <button type='submit' className='btnSubmit'>Search</button>
          </form>
          <div className='banner'>
            {banner && <img className='bannerImg' alt='img' src={`https://image.tmdb.org/t/p/w500${banner.poster_path}`} />}
            <div className='bannerMovieInformation'>
              {banner && <span className='bannerMovieName'>The movie name: {banner.original_title}</span>}
              {banner && <span className='bannerMovieRelease'>The movie release date: {banner.release_date}</span>}
              {banner && <span className='bannerMovieRating'>The average vote: {banner.vote_average}</span>}
            </div>
          </div>
        </div>
        <div className='result'>
            {receivedData && receivedData.map((movie) => (
              <Card poster_path={movie.poster_path} original_title={movie.original_title} overview={movie.overview} original_language={movie.original_language} release_date={movie.release_date} vote_average={movie.vote_average}/>
            ))}
        </div>

        <div className='footer'>
          <span>Made by Muhammadumar Shukurullaev</span>
        </div>
    </div>
  );
}

export default App;