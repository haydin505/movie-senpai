import React, { Component } from "react";
import styles from "./Result.module.css";
import Spinner from "../Spinner/Spinner";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { BsStopwatchFill, BsStopwatch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Result extends Component {
  state = {};

  favoriteClickedHandler = (movieId) => {
    if (!this.props.loggedIn) {
      alert("Please Login or Sign-up to add this movie to your favorite list.");
      return;
    }
    let favoriteMovies = this.props.favoriteMovies;
    let favoriteMoviesIds = [];
    for (let key in favoriteMovies) {
      favoriteMoviesIds.push(key);
    }

    let isInFavorites = false;

    isInFavorites = favoriteMoviesIds.some((id) => {
      // console.log(id);
      // console.log(this.props.id);

      return id === String(movieId);
    });

    if (isInFavorites) {
      this.props.deleteMovieFromFavorites(
        this.props.userCredential.uid,
        this.props.id
      );
    }
    if (!isInFavorites) {
      // console.log(this.props);
      // console.log(
      //   this.props.userCredential.uid,
      //   this.props.id,
      //   this.props.fetchedMovies
      // );
      this.props.postMovieToFavorites(
        this.props.userCredential.uid,
        this.props.id,
        this.props.fetchedMovies
      );
    }
  };

  watchlaterClickedHandler = (movieId) => {
    if (!this.props.loggedIn) {
      alert(
        "Please Login or Sign-up to add this movie to your watch later list."
      );
      return;
    }

    let watchLaterMovies = this.props.watchLaterMovies;
    let watchLaterMoviesIds = [];

    for (let key in watchLaterMovies) {
      watchLaterMoviesIds.push(key);
    }

    let isInWatchLater = false;

    isInWatchLater = watchLaterMoviesIds.some((id) => {
      // console.log(id);
      // console.log(this.props.id);

      return id === String(movieId);
    });

    if (isInWatchLater) {
      this.props.deleteMovieFromWatchlater(
        this.props.userCredential.uid,
        this.props.id
      );
    }

    if (!isInWatchLater) {
      // console.log(this.props);
      // console.log(
      //   this.props.userCredential.uid,
      //   this.props.id,
      //   this.props.fetchedMovies
      // );
      this.props.postMovieToWatchlater(
        this.props.userCredential.uid,
        this.props.id,
        this.props.fetchedMovies
      );
    }
  };
  render() {
    let favoriteMovies = this.props.favoriteMovies;
    let watchLaterMovies = this.props.watchLaterMovies;
    // console.log(favoriteMovies);
    let favoriteMoviesIds = [];
    let watchLaterMoviesIds = [];
    for (let key in favoriteMovies) {
      favoriteMoviesIds.push(key);
    }
    for (let key in watchLaterMovies) {
      watchLaterMoviesIds.push(key);
    }
    // console.log(favoriteMoviesIds);
    // console.log(watchLaterMovies);
    // console.log(this.props);
    const dateChangeHandler = () => {
      // console.log(this.props.release_date);
      if (
        this.props.release_date === "" ||
        this.props.release_date === undefined
      ) {
        return "";
      }
      let output = this.props.release_date.slice(0, 4);
      // console.log(output);
      return output;
    };

    let releaseYear = dateChangeHandler();
    // console.log(this.props);
    // console.log(this.props.imgLoading);
    // poster path null gelince exception yapılacak
    // console.log(this.props.poster_path);

    const imgError = (
      <div className={styles.ImageError}>
        <h1>Image not available</h1>
      </div>
    );
    let isInFavorites = false;

    isInFavorites = favoriteMoviesIds.some((id) => {
      // console.log(id);
      // console.log(this.props.id);

      return id === String(this.props.id);
    });

    // console.log(isInFavorites);

    let isInWatchLater = false;

    isInWatchLater = watchLaterMoviesIds.some((id) => {
      // console.log(id);
      // console.log(this.props.id);

      return id === String(this.props.id);
    });

    // console.log(isInWatchLater);

    return (
      <div className={styles.Result}>
        <div className={styles.ResultInner}>
          <div className={styles.ImageWrapper}>
            {this.props.imgLoading ? <Spinner /> : null}
            {/* {this.this.props.imageLoading ? spinner : ""} */}
            {this.props.poster_path !== null ? (
              <img
                onClick={() =>
                  this.props.clicked([this.props.title, this.props.overview])
                }
                style={{ display: this.props.imgLoading ? "none" : "block" }}
                onLoad={this.props.imageLoadHandler}
                src={"https://image.tmdb.org/t/p/w500" + this.props.poster_path}
                alt={this.props.title}
              />
            ) : (
              imgError
            )}
          </div>
          <div className={styles.TitleWrapper}>
            {/* {this.props.imgErrorReturn ? this.props.imageLoadHandler : null} */}
            <ul
              onClick={() =>
                this.props.clicked([this.props.title, this.props.overview])
              }
            >
              <li>
                <span>{this.props.title}</span>
              </li>
              {/* <p>{this.props.director}</p> */}
              <li>
                <span>
                  {releaseYear ? releaseYear : <p>Year is not available</p>}
                </span>
              </li>
            </ul>
            <IconContext.Provider value={{ className: `${styles.Icons}` }}>
              <div>
                <ul className={styles.IconsTable}>
                  <li
                    className={styles.IconsBox}
                    title="Click to add favorites"
                    onClick={() => this.favoriteClickedHandler(this.props.id)}
                  >
                    {isInFavorites ? <MdFavorite /> : <MdFavoriteBorder />}
                  </li>
                  <li
                    className={styles.IconsBox}
                    title="Click to add watch later"
                    onClick={() => this.watchlaterClickedHandler(this.props.id)}
                  >
                    {isInWatchLater ? <BsStopwatchFill /> : <BsStopwatch />}
                  </li>
                </ul>
              </div>
            </IconContext.Provider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticationReducer.userCredential !== null,
    userCredential: state.authenticationReducer.userCredential,
    favoriteMovies: state.userDataReducer.favoriteMovies,
    watchLaterMovies: state.userDataReducer.watchLaterMovies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMovieToFavorites: (userId, movieId, movie) =>
      dispatch(actions.postFavoriteMovieAttempt(userId, movieId, movie)),
    postMovieToWatchlater: (userId, movieId, movie) =>
      dispatch(actions.postWatchlaterMovieAttempt(userId, movieId, movie)),
    deleteMovieFromFavorites: (userId, movieId) =>
      dispatch(actions.deleteMovieFromFavorites(userId, movieId)),
    deleteMovieFromWatchlater: (userId, movieId) =>
      dispatch(actions.deleteMovieFromWatchlater(userId, movieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Result);
