import * as actionTypes from "./actionTypes";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firebase-database";

// function writeUserData(userId, name, email, imageUrl) {
//   firebase
//     .database()
//     .ref("users/" + userId)
//     .set({
//       name: name,
//       email: email,
//     });
// }

// export const postFavoriteMovieSuccess = () => {
//   return {
//     type: actionTypes.POST_FAVORITE_MOVIE_SUCCESS,
//   };
// };

export const deleteMovieFromFavorites = (userId, movieId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + userId + "/favorites/" + movieId)
      .set(null, (error) => {
        if (error) {
          console.log(error);
        } else {
          dispatch(fetchFavoriteMovies(userId));
        }
      });
  };
};

export const deleteMovieFromWatchlater = (userId, movieId) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("/users/" + userId + "/watchlater/" + movieId)
      .set(null, (error) => {
        if (error) {
          console.log(error);
        } else {
          dispatch(fetchWatchlaterMovies(userId));
        }
      });
  };
};

export const fetchFavoriteMoviesSuccess = (movies) => {
  // console.log(movies);

  return {
    type: actionTypes.UPDATE_FAVORITE_MOVIES_SUCCESS,
    movies: movies,
  };
};

export const fetchWatchlaterMoviesSuccess = (movies) => {
  // console.log(movies);
  return {
    type: actionTypes.UPDATE_WATCHLATER_MOVIES_SUCCESS,
    movies: movies,
  };
};

export const fetchFavoriteMovies = (userId) => {
  return (dispatch) => {
    var starCountRef = firebase
      .database()
      .ref("/users/" + userId + "/favorites");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      dispatch(fetchFavoriteMoviesSuccess(data));
    });
  };
};

export const fetchWatchlaterMovies = (userId) => {
  // console.log(userId);
  return (dispatch) => {
    var starCountRef = firebase
      .database()
      .ref("/users/" + userId + "/watchlater");
    starCountRef.on("value", (snapshot) => {
      const data = snapshot.val();
      // console.log(data);
      dispatch(fetchWatchlaterMoviesSuccess(data));
    });
  };
};

export const writeUserDataFavoriteMovie = (userId, movieId, movie) => {
  firebase
    .database()
    .ref("users/" + userId + "/favorites/" + movieId)
    .set(movie);
  // .then(() => postFavoriteMovieSuccess());
};

export const writeUserDataWatchlaterMovie = (userId, movieId, movie) => {
  // console.log("write");
  firebase
    .database()
    .ref("users/" + userId + "/watchlater/" + movieId)
    .set(movie);
  // .then(() => postFavoriteMovieSuccess());
};

export const postWatchlaterMovieAttempt = (userId, movieId, movie) => {
  return (dispatch) => {
    // console.log("post");
    writeUserDataWatchlaterMovie(userId, movieId, movie);
    dispatch(fetchWatchlaterMovies(userId));
  };
};

export const postFavoriteMovieAttempt = (userId, movieId, movie) => {
  return (dispatch) => {
    writeUserDataFavoriteMovie(userId, movieId, movie);
    dispatch(fetchFavoriteMovies(userId));
  };
};

export const fetchMoviesAttempt = (finalUrl) => {
  // console.log(finalUrl);
  return (dispatch) => {
    fetch(finalUrl)
      .then((result) => {
        // console.log(result);
        return result.json();
      })
      .then((data) => {
        // console.log(data.results);
        // console.log(data.results.length === 0);
        if (data.results === undefined) return;
        if (data.results.length === 0) {
          data.results = 0;
          // console.log("sss");
        }
        // console.log(this.state.films);
        // console.log(data.results);
        dispatch(fetchMoviesSuccess(data.results));
      })
      .catch((err) => {
        dispatch(fetchMovieFail(err));
        console.log(err);
      });
  };
};

export const fetchMoviesSuccess = (fetchedMovies) => {
  // console.log(fetchedMovies);
  return {
    type: actionTypes.FETCH_MOVIES_SUCCESS,
    fetchedMovies: fetchedMovies,
  };
};

export const fetchMovieFail = (error) => {
  return {
    type: actionTypes.FETCH_MOVIES_FAIL,
    error: error,
  };
};
