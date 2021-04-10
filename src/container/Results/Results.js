import React, { Component } from "react";
import styles from "./Results.module.css";
import Result from "../../components/Result/Result";
import { API_KEY, fetchURL } from "../../config/config";
import { withRouter } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";

class Results extends Component {
  state = {
    imageError: false,
    loading: false,
    imageLoading: true,
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
    // console.log(this.props.location.search);
    // console.log(prevProps.location.search);
    // console.log(this.props.location.search.replaceAll(" ", ""));
    // console.log(prevProps.location.search.replaceAll(" ", ""));
    // console.log(prevState);
    if (this.props.location.search === "?title=&year=all") {
      this.props.history.push("/");
    }
    if (
      this.props.location.search.replaceAll(" ", "") !==
      prevProps.location.search.replaceAll(" ", "")
    ) {
      this.setState({ loading: true, imageLoading: true });
      if (this.props.location.pathname === "/")
        this.setState({ loading: false, imageLoading: true, films: null });
      this.fetchFilms();
    }

    // this.fetchFilms();
  }

  componentDidMount() {
    this.fetchFilms();
  }

  fetchFilms = () => {
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
        this.setState({ films: data.results });
      })
      .catch((err) => console.log(err));
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
    // console.log(Object.keys(this.state.films));

    if (this.state.films != null) {
      // console.log(this.state.films);
      const renderArray = Object.keys(this.state.films);
      // console.log(renderArray);
      renderFilms = renderArray.map((arr) => {
        //   console.log(this.state.films[arr]);
        return (
          <Result
            key={this.state.films[arr].id}
            {...this.state.films[arr]}
            imgLoading={this.state.imageLoading}
            imageLoadHandler={this.imageLoadHandler}
            clicked={this.props.clicked}
          />
        );
      });
    }

    if (this.state.films === null) renderFilms = null;

    if (this.state.films === 0)
      renderFilms = <h2>Senpai couldn't find any results.</h2>;
    return (
      <div className={styles.Results}>
        {/* <Spinner /> */}
        {renderFilms}
      </div>
    );
  }
}

export default withRouter(Results);
