import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import AppBar from "./components/AppBar";
import Loader from "./components/Loader";
import s from "./App.module.css";

const HomePage = lazy(() =>
  import("./views/HomePage" /*webpackChunkName: "home-page" */)
);
const MoviesPage = lazy(() =>
  import("./views/MoviesPage" /*webpackChunkName: "movies-page" */)
);
const MovieDetailsPage = lazy(() =>
  import("./views/MovieDetailsPage" /*webpackChunkName: "movie-details-page" */)
);
const ApiError = lazy(() =>
  import("./components/ApiError" /*webpackChunkName: "api-error" */)
);

function App() {
  return (
    <div className={s.App}>
      <AppBar />
      <div className={s.line}></div>

      <Suspense fallback={<Loader />}>
        <div className={s.container}>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>

            <Route>
              <ApiError onError="Page not found" />
            </Route>
          </Switch>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
