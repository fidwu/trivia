import "./styles.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuestionPage from "./pages/QuestionPages";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/results">
          <Results />
        </Route>
        <Route path="/question">
          <QuestionPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
