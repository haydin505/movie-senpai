import React from "react";
import styles from "./Result.module.css";

const result = (props) => {
  const dateChangeHandler = () => {
    console.log(props.release_date);
    let output = props.release_date.slice(0, 4);
    console.log(output);
    return output;
  };
  let value2 = dateChangeHandler();
  //   console.log(props);
  return (
    <div className={styles.Result}>
      <div className={styles.ResultInner}>
        <img
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
