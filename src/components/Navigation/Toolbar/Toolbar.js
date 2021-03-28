import React from "react";
import styles from "./Toolbar.module.css";
import movieLogo from "../../../assets/images/movieLogo.svg";

const toolbar = (props) => {
  return (
    <div className={styles.Toolbar}>
      <h1 style={{ marginTop: "0" }}>Movie Senpai</h1>
      <img className={styles.Logo} src={movieLogo} />
    </div>
  );
};

export default toolbar;
