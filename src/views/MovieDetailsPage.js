import { useEffect, useState, lazy, Suspense } from "react";
import {
  useParams,
  useRouteMatch,
  useHistory,
  useLocation,
  Route,
  Switch,
  NavLink,
} from "react-router-dom";
import { detailsMovieSearch } from "../components/API/API";
import ApiError from "../components/ApiError";
import Loader from "../components/Loader";
import s from "../styles/MovieDetailsPage.module.css";

const Cast = lazy(() => import("./Cast" /*webpackChunkName: "cast" */));
const Reviews = lazy(() =>
  import("./Reviews" /*webpackChunkName: "reviews" */)
);

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const histry = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (!movieId) {
      return;
    }

    detailsMovieSearch(movieId)
      .then((film) => {
        setData(film);
      })
      .catch((error) => {
        setError(error);
      });
  }, [movieId]);

  const onGoBack = () => {
    histry.push(location?.state?.from.location ?? "/");
  };

  if (data) {
    return (
      <div className={s.container}>
        <button className={s.button} onClick={onGoBack}>
          Go back
        </button>
        <div className={s.containerTitle}>
          {data.title ? (
            <h1 className={s.title}>{data.title}</h1>
          ) : (
            <h1 className={s.title}>Title</h1>
          )}
          {data.belongs_to_collection ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${data.belongs_to_collection.poster_path}`}
              alt={data.belongs_to_collection.name}
              className={s.img}
            />
          ) : (
            <img
              src="https://cs12.pikabu.ru/post_img/big/2021/08/01/9/162783343012505546.jpg"
              alt=""
              className={s.img}
            />
          )}
          {data.tagline && <p className={s.subtitle}>{data.tagline}</p>}
        </div>

        <div className={s.containerText}>
          <p className={s.text}>Original title : {data.original_title}</p>
          <p className={s.text}>Date of release : {data.release_date}</p>
          <p className={s.text}>Status Movie : {data.status}</p>
          <p className={s.text}>Movie Rating : {data.popularity}</p>
          <p className={s.text}>
            Genres: {data.genres.map((el) => el.name + " | ")}
          </p>
          <h2 className={s.titleText}>Overview</h2>
          <p className={s.text}>{data.overview}</p>
        </div>

        <div className={s.containerText}>
          <a href={data.homepage} className={s.button}>
            Trailer
          </a>
          <NavLink
            to={{
              pathname: `${url}/cast`,
              state: {
                from: {
                  location: location?.state?.from ?? "/movies",
                },
              },
            }}
            className={s.button}
          >
            Cast
          </NavLink>
          <NavLink
            to={{
              pathname: `${url}/reviews`,
              state: {
                from: {
                  location: location?.state?.from ?? "/movies",
                },
              },
            }}
            className={s.button}
          >
            Reviews
          </NavLink>
        </div>

        <div className={s.containerLoader}>
          <Suspense fallback={<Loader />}>
            <Switch>
              <Route path="/movies/:movieId/cast">
                <Cast />
              </Route>

              <Route path="/movies/:movieId/reviews">
                <Reviews />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <ApiError onError={`movie not found ${error}`}></ApiError>
      </>
    );
  }
}
export default MovieDetailsPage;
