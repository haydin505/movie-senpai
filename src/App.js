import "./App.css";
// import styles from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import SearchContainer from "./container/SearchContainer/SearchContainer";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Results from "./container/Results/Results";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./container/Sidebar/Sidebar";
import Favorites from "./container/Favorites/Favorites";
import Login from "./Login/Login";
import { connect } from "react-redux";
import Logout from "./Logout/Logout";
import Signup from "./Signup/Signup";
import Watchlater from "./container/Watchlater/Watchlater";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBovpZ-7fYGF-3ew3XCMkVSz9vrTBKjH5w",
  authDomain: "movie-senpai.firebaseapp.com",
  databaseURL: "https://movie-senpai-default-rtdb.firebaseio.com",
  projectId: "movie-senpai",
  storageBucket: "movie-senpai.appspot.com",
  messagingSenderId: "948348789552",
  appId: "1:948348789552:web:7476474a081d0627255ef5",
  measurementId: "G-QKWJ89T1GZ",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
function App(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [targetTitle, setTargetTitle] = useState("");

  const resultClicked = (event) => {
    // console.log(event);
    setShowSidebar(true);
    setTargetTitle(event);
  };

  const closeButtonClicked = () => {
    setShowSidebar(false);
  };

  return (
    <BrowserRouter>
      <div>
        {showSidebar ? (
          <Sidebar title={targetTitle} clicked={closeButtonClicked} />
        ) : null}
        <Layout>
          <Toolbar />

          <Switch>
            <Route path="/login" component={Login}>
              {props.loggedIn ? <Redirect to="/search" /> : null}
            </Route>
            {/* <SearchContainer /> */}
            <Route path="/favorites" component={Favorites} />
            <Route path="/watchlater" component={Watchlater} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={Signup}>
              {props.loggedIn ? <Redirect to="/search" /> : null}
            </Route>
            <Redirect exact from="/" to="/search" />
          </Switch>

          <Route path="/search" component={SearchContainer} />
          <Route
            path="/search"
            render={(routeProps) => (
              <Results clicked={resultClicked} {...routeProps} />
            )}
          />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.authenticationReducer.userCredential !== null,
  };
};

export default connect(mapStateToProps)(App);
