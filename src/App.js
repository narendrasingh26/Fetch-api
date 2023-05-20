import React, { useState, useEffect, useMemo, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <React.Fragment>
      <section>
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
