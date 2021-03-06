import { useState, useEffect, lazy, Suspense } from "react";
import { useRouteMatch, useHistory, useLocation } from "react-router-dom";
import { queryMovieSearch, pageMovieSearch } from "../components/API/API";

import PegeHedging from "../components/PegeHedging";
import MoviesForm from "../components/MoviesForm";
import Loader from "../components/Loader";
import ApiError from "../components/ApiError";

const ListFilm = lazy(() =>
  import("./ListFilm" /*webpackChunkName: "list-film" */)
);

function MoviesPage() {
  const [name, setName] = useState("");
  const [films, setFilms] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const location = useLocation();

  const { url } = useRouteMatch();

  const dataProcessingForm = (data) => {
    history.push({ ...location, search: `inquiry=${data.name.toLowerCase()}` });
  };

  useEffect(() => {
    const searchInquiry =
      new URLSearchParams(location.search).get("inquiry") ?? "";
    if (!searchInquiry) {
      return;
    }

    queryMovieSearch(searchInquiry)
      .then((film) => {
        setFilms(film.results);
      })
      .catch((error) => {
        setError(error);
      });

    setName(searchInquiry);
  }, [location.search]);

  useEffect(() => {
    if (!name) {
      return;
    }

    pageMovieSearch(name, page)
      .then((film) => {
        const filmPhoto = film.results;

        setFilms((prevState) => {
          const filmElem = [...prevState, ...filmPhoto];
          return filmElem;
        });

        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, [page]);

  const scrollLandMore = () => {
    setPage((prevState) => prevState + 1);
  };

  return (
    <>
      <PegeHedging title="Enter the title of the movie" />
      <MoviesForm onSubmit={dataProcessingForm} />

      <Suspense fallback={<Loader />}>
        {films && (
          <ListFilm itemFilm={films} onClick={scrollLandMore} url={url} />
        )}
      </Suspense>
      {error && <ApiError onError="movie not found"></ApiError>}
    </>
  );
}

export default MoviesPage;
