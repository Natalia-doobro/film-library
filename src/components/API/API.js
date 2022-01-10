require('dotenv').config();
const BASE_URL = "https://api.themoviedb.org/3/";
const key = process.env.REACT_APP_API_KEY;

export async function trendingMovieSearch() {
  return fetch(`${BASE_URL}trending/movie/week?api_key=${key}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`uneasy request.`));
  });
}

export async function queryMovieSearch(name) {
  const pg = 1;
  return fetch(
    `${BASE_URL}search/movie?api_key=${key}&language=en-US&query=${name}&page=${pg}&include_adult=false`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`uneasy request. under request ${name} no film found`)
    );
  });
}

export async function pageMovieSearch(name, page) {
  return fetch(
    `${BASE_URL}search/movie?api_key=${key}&language=en-US&query=${name}&page=${page}&include_adult=false`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`uneasy request. under request ${name} no film found`)
    );
  });
}

export async function detailsMovieSearch(movieId) {
  return fetch(`${BASE_URL}movie/${movieId}?api_key=${key}`).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`uneasy request. under request no film found`)
    );
  });
}

export async function actorsMovieSearch(movieId) {
  return fetch(
    `${BASE_URL}movie/${movieId}/credits?api_key=${key}&language=en-US`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`uneasy request. under request no film found`)
    );
  });
}

export async function reviewsMovieSearch(movieId) {
  return fetch(
    `${BASE_URL}movie/${movieId}/reviews?api_key=${key}&language=en-US&page=1`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      new Error(`uneasy request. under request no film found`)
    );
  });
}
