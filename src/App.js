import "./App.css";
// import styles from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import SearchContainer from "./container/SearchContainer/SearchContainer";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Results from "./container/Results/Results";
import { BrowserRouter, Route } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./container/Sidebar/Sidebar";
import Favorites from "./container/Favorites/Favorites";
import Login from "./container/Login/Login";

function App(props) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [targetTitle, setTargetTitle] = useState("");

  const logClicked = (event) => {
    // console.log(event);
    setShowSidebar(true);
    setTargetTitle(event);
  };

  return (
    <BrowserRouter>
      <div>
        {showSidebar ? <Sidebar title={targetTitle} /> : null}
        <Layout>
          <Toolbar />
          <Route path="/" component={SearchContainer} />
          <Route path="/login" component={Login} />
          {/* <SearchContainer /> */}
          <Route exact path="/favorites" component={Favorites} />
          <Route
            path="/search"
            render={(routeProps) => (
              <Results clicked={logClicked} {...routeProps} />
            )}
          />
          {/* <Results clicked={logClicked} /> */}
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
