import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reviewsMovieSearch } from "../components/API/API";
import ApiError from "../components/ApiError";
import s from "../styles/Reviews.module.css";

function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    reviewsMovieSearch(movieId)
      .then((review) => {
        setReviews(review.results);
      })
      .catch((error) => {
        setError(error);
      });
  }, [movieId]);

  if (reviews) {
    return reviews.length > 0 ? (
      <ul className={s.list}>
        {reviews.map((el) => (
          <li key={el.id} className={s.item}>
            <h2 className={s.title}>Author: {el.author}</h2>
            <p className={s.text}>{el.content}</p>
          </li>
        ))}
      </ul>
    ) : (
      <ApiError onError={`no reviews found`} />
    );
  } else {
    return <ApiError onError={`No cast found ${error}`} />;
  }
}

export default Reviews;
