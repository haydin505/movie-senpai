import React, { Component } from "react";
import styles from "./Result.module.css";
import Spinner from "../Spinner/Spinner";

class Result extends Component {
  state = {};

  render() {
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

    const imgError = <h1>Image is not available</h1>;
    return (
      <div
        className={styles.Result}
        onClick={() => this.props.clicked(this.props.title)}
      >
        <div className={styles.ResultInner}>
          {this.props.imgLoading ? <Spinner /> : null}
          {/* {this.this.props.imageLoading ? spinner : ""} */}
          {this.props.poster_path !== null ? (
            <img
              style={{ display: this.props.imgLoading ? "none" : "block" }}
              onLoad={this.props.imageLoadHandler}
              src={"https://image.tmdb.org/t/p/w500" + this.props.poster_path}
              alt={this.props.title}
            />
          ) : (
            imgError
          )}
          {/* {this.props.imgErrorReturn ? this.props.imageLoadHandler : null} */}
          <ul>
            <li> {this.props.title}</li>
            {/* <p>{this.props.director}</p> */}
            <li>{releaseYear ? releaseYear : <p>Year is not available</p>}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Result;
