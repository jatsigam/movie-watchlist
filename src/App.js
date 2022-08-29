import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import MovieScreen from "./components/MovieScreen";
import Watchlist from "./components/Watchlist";

function App() {
  // Create three pieces of state
  const [movieList, setMovieList] = useState([]);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);

  const getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  // add movie
  const addMovie = (movie) => setList([...list, movie]);

  // remove movie
  const removeMovie = (movie) => {
    const newState = list.filter((mov) => {
      return mov !== movie;
    });
    setList(newState);
  };

  return (
    <div className="App">
        <Header />
         <MovieScreen
          movieList={movieList}
          page={page}
          setPage={setPage}
          list={list}
          addMovie={addMovie}
          removeMovie={removeMovie}
        />
        <Watchlist list={list} removeMovie={removeMovie}/>
    </div>
  );
}

export default App;
