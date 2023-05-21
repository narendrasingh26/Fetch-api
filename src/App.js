import React, { useState, useEffect, useMemo, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const fetchMovies = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("https://swapi.dev/api/films");
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong! Retrying...");
      }

      const updatedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl,
        };
      });

      setMovies(updatedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  };

  const fetchMoviesMemoized = useMemo(() => fetchMovies, []);

  useEffect(() => {
    fetchMoviesMemoized();
  }, [fetchMoviesMemoized]);

  const cancelRetryHandler = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const addMovieHandler = () => {
    console.log(newMovie);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value,
    }));
  };

  return (
    <React.Fragment>
      <section>
        <form className="form">
          <div className="form-control">
            <label htmlFor="title" >Title</label><br></br>
            <input style={{borderRadius:'5px',width:'30rem',height:'2rem'}}
              type="text"
              id="title"
              name="title"
              value={newMovie.title}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="openingText" >Opening Text</label><br></br>
            <textarea style={{borderRadius:'5px',width:'30rem',height:'5rem'}}
              id="openingText"
              name="openingText"
              value={newMovie.openingText}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="releaseDate">Release Date</label>
            <input style={{borderRadius:'5px',width:'30rem',height:'2rem'}}
              type="text"
              id="releaseDate"
              name="releaseDate"
              value={newMovie.releaseDate}
              onChange={handleInputChange}
            />
          </div><br></br>
          <button type="button" onClick={addMovieHandler}>
            Add Movies
          </button>
        </form><br></br>

        {isLoading ? (
          <p>...Loading</p>
        ) : (
          <button onClick={fetchMoviesMemoized}>Fetch Movies</button>
        )}
        {isLoading && (
          <button onClick={cancelRetryHandler}>Cancel Retry</button>
        )}
      </section>

      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Movie Not Found</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
