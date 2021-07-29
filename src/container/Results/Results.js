import React, { Component } from "react";
import styles from "./Results.module.css";
import Result from "../../components/Result/Result";
import { API_KEY, fetchURL } from "../../config/config";
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Results extends Component {
  state = {
    imageError: false,
    loading: false,
    imageLoading: true,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search === "?title=&year=all") {
      // console.log(this.props.location.search);
      // console.log(prevProps.location.search);
      // console.log(this.props.location.search.replaceAll(" ", ""));
      // console.log(prevProps.location.search.replaceAll(" ", ""));
      // console.log(prevState);
      this.props.history.push("/");
    }
    if (
      this.props.location.search.replaceAll(" ", "") !==
        prevProps.location.search.replaceAll(" ", "") &&
      this.props.location.search.replaceAll(" ", "") !== ""
    ) {
      this.setState({ loading: true, imageLoading: true });
      if (this.props.location.pathname === "/")
        this.setState({ loading: false, imageLoading: true, films: null });
      this.fetchMovies();
    }

    // this.fetchMovies();
  }

  componentDidMount() {
    this.fetchMovies();
    if (this.props.loggedIn) {
      this.props.fetchFavoriteMovies(this.props.userCredential.uid);
      this.props.fetchWatchlaterMovies(this.props.userCredential.uid);
    }
  }

  fetchMovies = () => {
    // // console.log(API_KEY);
    // // console.log(window.location.href);
    // const url = new URL(window.location.href);
    // // console.log(url.pathname.slice(1));
    // console.log(url.pathname);
    // let searchQuery = url.pathname.slice(1).split("&");
    // let finalUrl = "";
    // console.log(searchQuery);

    // if (searchQuery[0] === "*") {
    //   this.setState({ films: 0 });
    //   return;
    // }
    // if (searchQuery[0] === "" || searchQuery[1].slice(-4) === "") return;
    // if (searchQuery[0] !== "*" && searchQuery[1].slice(-4) !== "=all") {
    //   finalUrl =
    //     fetchURL +
    //     "/search/movie?api_key=" +
    //     API_KEY +
    //     "&query=" +
    //     searchQuery[0] +
    //     "&include_adult=false" +
    //     "&primary_release_year=" +
    //     searchQuery[1].slice(-4);
    // }

    // if (searchQuery[0] !== "*" && searchQuery[1].slice(-4) === "=all") {
    //   finalUrl =
    //     fetchURL +
    //     "/search/movie?api_key=" +
    //     API_KEY +
    //     "&query=" +
    //     searchQuery[0] +
    //     "&include_adult=false";
    // }

    // // console.log(searchQuery.join(""));
    // // console.log(finalUrl);

    // if (searchQuery.join("") === "") {
    //   this.setState({ films: null });
    //   return;
    // }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const title = urlParams.get("title");
    const year = urlParams.get("year");
    if (!title) return;

    // console.log(title);
    // console.log(year);

    let finalUrl = "";
    finalUrl =
      fetchURL +
      "/search/movie?api_key=" +
      API_KEY +
      "&query=" +
      title +
      "&include_adult=false" +
      "&primary_release_year=" +
      year;
    this.props.fetchMovies(finalUrl);

    // Before Redux
    // fetch(finalUrl)
    //   .then((result) => {
    //     // console.log(result);
    //     return result.json();
    //   })
    //   .then((data) => {
    //     // console.log(data.results);
    //     // console.log(data.results.length === 0);
    //     if (data.results === undefined) return;
    //     if (data.results.length === 0) {
    //       data.results = 0;
    //       // console.log("sss");
    //     }
    //     // console.log(this.props.fetchedMovies);
    //     this.setState({ films: data.results });
    //   })
    //   .catch((err) => console.log(err));
  };
  imageLoadHandler = () => {
    // console.log(this.state.imageLoading);
    // console.log("imageLoadHandler fired");
    this.setState({ imageLoading: false });
    // console.log(this.state.imageLoading);
  };

  render() {
    let renderFilms = null;
    if (this.state.loading) {
      renderFilms = <Spinner />;
    }
    // console.log(this.state);
    // console.log(Object.keys(this.props.fetchedMovies));

    if (this.props.fetchedMovies != null) {
      // console.log(this.props.fetchedMovies);
      const renderArray = Object.keys(this.props.fetchedMovies);
      // console.log(renderArray);
      renderFilms = renderArray.map((arr) => {
        //   console.log(this.props.fetchedMovies[arr]);
        return (
          <Result
            key={this.props.fetchedMovies[arr].id}
            {...this.props.fetchedMovies[arr]}
            fetchedMovies={this.props.fetchedMovies[arr]}
            imgLoading={this.state.imageLoading}
            imageLoadHandler={this.imageLoadHandler}
            clicked={this.props.clicked}
          />
        );
      });
    }

    if (this.props.fetchedMovies === null) renderFilms = null;

    if (this.props.fetchedMovies === 0)
      renderFilms = <h2>Senpai couldn't find any results.</h2>;
    return (
      <div className={styles.Results}>
        {/* <Spinner /> */}
        {renderFilms}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    fetchedMovies: state.userDataReducer.fetchedMovies,
    fetchMoviesError: state.userDataReducer.fetchMoviesError,
    loggedIn: state.authenticationReducer.userCredential !== null,
    userCredential: state.authenticationReducer.userCredential,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMovies: (finalUrl) => dispatch(actions.fetchMoviesAttempt(finalUrl)),
    fetchFavoriteMovies: (userId) =>
      dispatch(actions.fetchFavoriteMovies(userId)),
    fetchWatchlaterMovies: (userId) =>
      dispatch(actions.fetchWatchlaterMovies(userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Results));
