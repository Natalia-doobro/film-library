import { Link, useLocation } from "react-router-dom";
import ApiError from "../components/ApiError";
import Button from "../components/Button";

import shortid from "shortid";
import s from "../styles/ListFilm.module.css";

function ListFilm({ itemFilm, onClick, url }) {
  const location = useLocation();

  return (
    <>
      {itemFilm.length > 0 ? (
        <ul className={s.list}>
          {itemFilm.map((elem) => (
            <li key={shortid.generate()} className={s.item}>
              <Link
                to={{
                  pathname: `${url}/${elem.id}`,
                  state: { from: location },
                }}
                className={s.link}
              >
                {elem.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${elem.poster_path}`}
                    alt={elem.title}
                    className={s.img}
                  />
                ) : (
                  <img
                    src="https://cs12.pikabu.ru/post_img/big/2021/08/01/9/162783343012505546.jpg"
                    alt={elem.title}
                    className={s.img}
                  />
                )}
                <h2 className={s.title}>{elem.original_title}</h2>
                <p className={s.text}>{elem.release_date}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ApiError onError="movie not found"></ApiError>
      )}

      {itemFilm.length > 0 && onClick && (
        <>
          <Button onClick={onClick}></Button>{" "}
        </>
      )}
    </>
  );
}

export default ListFilm;
