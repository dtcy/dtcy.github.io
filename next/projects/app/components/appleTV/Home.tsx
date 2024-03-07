import { useEffect, useState, useRef, useCallback } from "react";
import Axios from "./api/axios";

export default function Home() {
  const [movieData, setMovieData] = useState([]);
  const baseURL = "https://image.tmdb.org/t/p/original";
  useEffect(() => {
    fetchDataByAxios();
  }, []);

  const fetchDataByAxios = () => {
    Axios.get("https://api.themoviedb.org/3/movie/popular")
      .then((res) => {
        const movies = res.data.results;
        setMovieData(movies);
        console.log(movies);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const observer = useRef();
  const lastPoster = useCallback((node) => console.log(node));
  return (
    <div>
      {movieData.map((movie, index) => (
        <div key={index} style={{ margin: "1rem" }}>
          <h2>{movie.title}</h2>
          <hr />
          <p>{movie.overview}</p>
          <img
            style={{ width: "100vw", height: "100%" }}
            src={baseURL + movie.backdrop_path}
            alt=""
          />
          <img
            ref={movie.length === index + 1 ? lastPoster : null}
            style={{ width: "100vw", height: "100%" }}
            src={baseURL + movie.poster_path}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}
