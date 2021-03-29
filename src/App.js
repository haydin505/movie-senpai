import "./App.css";
// import styles from "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import SearchContainer from "./container/SearchContainer/SearchContainer";
import Toolbar from "./components/Navigation/Toolbar/Toolbar";
import Results from "./container/Results/Results";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Toolbar />
          <SearchContainer />
          <Results />
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
