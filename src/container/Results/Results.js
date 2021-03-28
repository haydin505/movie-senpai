import React, { Component } from "react";
import styles from "./Results.module.css";
import Result from "../../components/Result/Result";
import { API_KEY, fetchURL } from "../../config/config";
import { withRouter } from "react-router-dom";

class Results extends Component {
  state = {
    films: null,
    // {    //   film1: {
    //     id: 1,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film2: {
    //     id: 2,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film3: {
    //     id: 3,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film4: {
    //     id: 4,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film5: {
    //     id: 5,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film6: {
    //     id: 6,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film7: {
    //     id: 7,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    //   film8: {
    //     id: 8,
    //     imageUrl:
    //       "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    //     title: "Pulp Fiction",
    //     director: "Quentin Tarantino",
    //     year: "1994",
    //   },
    // },
  };
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.films);
    console.log(prevState);
    console.log(prevProps);
    if (this.props.location !== prevProps.location) this.fetchFilms();

    // this.fetchFilms();
  }

  componentDidMount() {
    this.fetchFilms();
  }
  fetchFilms = () => {
    console.log(API_KEY);
    console.log(window.location.href);
    const url = new URL(window.location.href);
    console.log(url.pathname.slice(1));
    let searchQuery = url.pathname.slice(1).split("&");
    let finalUrl = "";

    if (searchQuery[0] !== "*" && searchQuery[1] !== "*") {
      finalUrl =
        fetchURL +
        "/search/movie?api_key=" +
        API_KEY +
        "&query=" +
        searchQuery[0] +
        "&include_adult=true" +
        "&year=" +
        searchQuery[1];
    }

    if (searchQuery[0] !== "*" && searchQuery[1] === "*") {
      finalUrl =
        fetchURL +
        "/search/movie?api_key=" +
        API_KEY +
        "&query=" +
        searchQuery[0] +
        "&include_adult=true";
    }

    console.log(finalUrl);

    if (finalUrl === "") return;
    fetch(finalUrl)
      .then((result) => {
        console.log(result);
        return result.json();
      })
      .then((data) => {
        console.log(data.results.length === 0);
        if (data.results.length === 0) {
          data.results = 0;
        }
        this.setState({ films: data.results });
      })
      .catch((err) => console.log(err));
  };

  render() {
    console.log(this.state);
    // console.log(Object.keys(this.state.films));
    let renderFilms = null;
    if (this.state.films != null) {
      console.log(this.state.films);
      const renderArray = Object.keys(this.state.films);
      console.log(renderArray);
      renderFilms = renderArray.map((arr) => {
        //   console.log(this.state.films[arr]);
        return (
          <Result key={this.state.films[arr].id} {...this.state.films[arr]} />
        );
      });
    }
    if (this.state.films == null)
      renderFilms = <h2>You can search for the films above</h2>;

    if (this.state.films === 0) renderFilms = <h2>Not Found!</h2>;
    return (
      <div className={styles.Results}>
        <h1>Results</h1>

        {renderFilms}
      </div>
    );
  }
}

export default withRouter(Results);
