import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchmovieHandler= useCallback(async () => {
    setIsLoading(true); 
    setError(null);
    try{

      const response = await fetch("https://swapi.dev/api/films/");
      
      if(!response.ok) {
         throw new error('Something went wrong ');
      };
  
      const data = await response.json();

        const transFormedMovie = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDae: movieData.release_date,
          };
        });
        setMovies(transFormedMovie);  
        
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); 
  }, []);


  useEffect(() => {
    fetchmovieHandler();
  }, [fetchmovieHandler]);

  let content = <p>Found no movies.</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />;
  };

  if (error){
    content = <p>{error}</p>
  };

  if(isLoading) {
    content = <p>Loading........</p>
  };

  return (
    <React.Fragment> 
      <section> 
        <button onClick={fetchmovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && }
        {!isLoading && movies.length == 0 && !error && <p>Found no movies.</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...... </p>} */}

        {content}
      </section>
    </React.Fragment>
  );
} 

export default App;
