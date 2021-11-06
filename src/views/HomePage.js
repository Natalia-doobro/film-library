import { useEffect, useState } from "react";
import PegeHedging from "../components/PegeHedging";
import ApiError from "../components/ApiError";
import ListFilm from "./ListFilm";
import { trendingMovieSearch } from "../components/API/API";

function HomePage() {
  const [films, setFilms] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    trendingMovieSearch()
      .then((films) => {
        setFilms(films.results);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  return (
    <>
      <PegeHedging title="Trending today" />
      {error && <ApiError onError={error.message}></ApiError>}

      {films && <ListFilm itemFilm={films} url="/movies" />}
    </>
  );
}

export default HomePage;
