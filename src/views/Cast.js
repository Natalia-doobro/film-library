import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { actorsMovieSearch } from "../components/API/API";
import ApiError from "../components/ApiError";
import s from "../styles/Cast.module.css";

function Cast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    actorsMovieSearch(movieId)
      .then((actor) => {
        setActors(actor.cast);
      })
      .catch((error) => {
        setError(error);
      });
  }, [movieId]);

  if (actors) {
    return actors.length > 0 ? (
      <ul className={s.list}>
        {actors.map((el) => (
          <li key={el.id} className={s.item}>
            {el.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
                alt={el.name}
                className={s.img}
              />
            ) : (
              <img
                src="https://cs12.pikabu.ru/post_img/big/2021/08/01/9/162783343012505546.jpg"
                alt=""
                className={s.img}
              />
            )}
            <h2 className={s.title}>{el.original_name}</h2>
            <p className={s.text}>Role in the film : {el.character}</p>
            <p className={s.text}>Rating : {el.popularity}</p>
          </li>
        ))}
      </ul>
    ) : (
      <ApiError onError={`no actors`} />
    );
  } else {
    return <ApiError onError={`No cast found ${error}`} />;
  }
}

export default Cast;
