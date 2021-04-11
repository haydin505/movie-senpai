import React, { Component } from "react";
import { connect } from "react-redux";
import Result from "../../components/Result/Result";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/Spinner/Spinner";
import styles from "./Favorites.module.css";

class Favorites extends Component {
  state = {
    imageError: false,
    loading: false,
    imageLoading: true,
  };

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.fetchFavoriteMovies(this.props.userCredential.uid);
      this.props.fetchWatchlaterMovies(this.props.userCredential.uid);
    }
  }

  imageLoadHandler = () => {
    // console.log(this.state.imageLoading);
    // console.log("imageLoadHandler fired");
    this.setState({ imageLoading: false });
    // console.log(this.state.imageLoading);
  };

  render() {
    //
    let renderFilms = null;
    if (this.state.loading) {
      renderFilms = <Spinner />;
    }
    // console.log(this.state);
    // console.log(Object.keys(this.props.fetchedMovies));

    if (this.props.favoriteMovies != null) {
      // console.log(this.props.favoriteMovies);

      // console.log(Object.keys(this.props.favoriteMovies));
      // console.log(this.props.fetchedMovies);
      const renderArray = Object.keys(this.props.favoriteMovies);
      // console.log(renderArray);
      renderFilms = renderArray.map((arr) => {
        // console.log(this.props.favoriteMovies[arr]);
        return (
          <Result
            key={this.props.favoriteMovies[arr].id}
            {...this.props.favoriteMovies[arr]}
            fetchedMovies={this.props.favoriteMovies[arr]}
            imgLoading={this.state.imageLoading}
            imageLoadHandler={this.imageLoadHandler}
            clicked={this.props.clicked}
          />
        );
      });
    }

    if (this.props.favoriteMovies === null) renderFilms = null;

    if (this.props.favoriteMovies === 0)
      renderFilms = <h2>Senpai couldn't find any results.</h2>;
    return (
      <div className={styles.Favorites}>
        {/* <Spinner /> */}
        {renderFilms}
      </div>
    );
  }
}
//

// return (
//   <div>
//     <h1>Favorites</h1>
//     <h2>Harry Potter Philosopher's Stone</h2>
//   </div>
// );

const mapStateToProps = (state) => {
  return {
    favoriteMovies: state.userDataReducer.favoriteMovies,
    fetchedMovies: state.userDataReducer.fetchedMovies,
    fetchMoviesError: state.userDataReducer.fetchMoviesError,
    loggedIn: state.authenticationReducer.userCredential !== null,
    userCredential: state.authenticationReducer.userCredential,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFavoriteMovies: (userId) =>
      dispatch(actions.fetchFavoriteMovies(userId)),
    fetchWatchlaterMovies: (userId) =>
      dispatch(actions.fetchWatchlaterMovies(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
