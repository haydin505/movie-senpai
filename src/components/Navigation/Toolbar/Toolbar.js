import React from "react";
import styles from "./Toolbar.module.css";
// import movieLogo from "../../../assets/images/movieLogo.svg";
import { withRouter } from "react-router-dom";

const toolbar = (props) => {
  const clicked = (event) => {
    event.preventDefault();
    props.history.push("/");
  };
  return (
    <div className={styles.Toolbar}>
      <section className={styles.ToolbarSection}>
        <h1 onClick={clicked}>Movie Senpai</h1>
        {/* <img className={styles.Logo} src={movieLogo} alt="movielogo" /> */}
      </section>
    </div>
  );
};

export default withRouter(toolbar);
