import React from "react";
import styles from "./Toolbar.module.css";
// import movieLogo from "../../../assets/images/movieLogo.svg";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const toolbar = (props) => {
  const clicked = (event) => {
    event.preventDefault();
    props.history.push("/");
  };

  let navigationBar = (
    <div className={styles.Toolbar}>
      <section className={styles.ToolbarSection}>
        <h1 onClick={clicked}>Movie Senpai</h1>
        <ul className={styles.NavigationItems}>
          <li className={styles.NavigationItem}>
            <NavLink activeClassName={styles.NavigationItemActive} to="/login">
              Login
            </NavLink>
          </li>
          <li className={styles.NavigationItem}>
            <NavLink activeClassName={styles.NavigationItemActive} to="/signup">
              Sign-up
            </NavLink>
          </li>
        </ul>
        {/* <img className={styles.Logo} src={movieLogo} alt="movielogo" /> */}
      </section>
    </div>
  );
  if (props.loggedIn) {
    navigationBar = (
      <div className={styles.Toolbar}>
        <section className={styles.ToolbarSection}>
          <h1 onClick={clicked}>Movie Senpai</h1>
          <ul className={styles.NavigationItems}>
            <li className={styles.NavigationItem}>
              <NavLink
                activeClassName={styles.NavigationItemActive}
                to="/favorites"
              >
                Favorites
              </NavLink>
            </li>
            <li className={styles.NavigationItem}>
              <NavLink
                activeClassName={styles.NavigationItemActive}
                to="/watchlater"
              >
                Watch Later
              </NavLink>
            </li>
            <li className={styles.NavigationItem}>
              <NavLink
                activeClassName={styles.NavigationItemActive}
                to="/logout"
              >
                Logout
              </NavLink>
            </li>
          </ul>
          {/* <img className={styles.Logo} src={movieLogo} alt="movielogo" /> */}
        </section>
      </div>
    );
  }

  return navigationBar;
};

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticationReducer.userCredential !== null,
  };
};

export default connect(mapStateToProps)(withRouter(toolbar));
