import React from "react";
import styles from "./Result.module.css";
import Spinner from "../Spinner/Spinner";

const result = (props) => {
  const dateChangeHandler = () => {
    console.log(props.release_date);
    if (props.release_date === "" || props.release_date === undefined) {
      return "";
    }
    let output = props.release_date.slice(0, 4);
    console.log(output);
    return output;
  };

  let value2 = dateChangeHandler();
  console.log(props);
  console.log(props.imgLoading);
  // poster path null gelince exception yapılacak
  return (
    <div className={styles.Result}>
      <div className={styles.ResultInner}>
        {props.imgLoading ? <Spinner /> : null}
        {/* {this.props.imageLoading ? spinner : ""} */}
        <img
          style={{ display: props.imgLoading ? "none" : "block" }}
          onLoad={props.imageLoadHandler}
          src={"https://image.tmdb.org/t/p/w500" + props.poster_path}
          alt={props.title}
        />
        <ul>
          <li> {props.title}</li>
          {/* <p>{props.director}</p> */}
          <li>{value2}</li>
        </ul>
      </div>
    </div>
  );
};

export default result;
