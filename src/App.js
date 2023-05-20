import React , {useState} from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {

  const[movies,setMovies]=useState([])
  const FetchmoveiHandler=async()=>{
    const response= await fetch('https://swapi.dev/api/films');
    const data=await response.json();
    const updateMoveis= data.results.map(moveidata=>{
      return {
        id:moveidata.episode_id,
        title:moveidata.title,
        releaseDate:moveidata.release_date,
        openingText:moveidata.opening_crawl,
      }
    })
    setMovies(updateMoveis);
      
  };
  return (
    <React.Fragment>
      <section>
        <button onClick={FetchmoveiHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
