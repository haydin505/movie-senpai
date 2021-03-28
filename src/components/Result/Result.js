import React from "react";
import styles from "./Result.module.css";

const result = (props) => {
  //   console.log(props);
  return (
    <div className={styles.Result}>
      <img
        src={"https://image.tmdb.org/t/p/w500" + props.poster_path}
        alt={props.title}
      />
      <p>
        {" "}
        <strong>{props.title}</strong>{" "}
      </p>
      <p>{props.director}</p>
      <p>{props.release_date}</p>
    </div>
  );
};

export default result;
