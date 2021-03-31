import "./App.css";
// import styles from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import SearchContainer from "./container/SearchContainer/SearchContainer";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Results from "./container/Results/Results";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./container/Sidebar/Sidebar";
function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [targetTitle, setTargetTitle] = useState("");

  const logClicked = (event) => {
    setShowSidebar(true);
    setTargetTitle(event);
  };

  const buttonCloseClicked = () => {
    setShowSidebar(false);
  };

  return (
    <BrowserRouter>
      <div>
        <Layout>
          {showSidebar ? (
            <Sidebar title={targetTitle} btnClicked={buttonCloseClicked} />
          ) : null}
          <Toolbar />
          <SearchContainer />
          <Results clicked={logClicked} />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
