import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  withRouter,
} from "react-router-dom";

// components
import Header from "./components/Header";
import Table from "./components/Table";
import PlayerDetails from "./components/PlayerDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/player-details/:sid">
            <Header />
            {/* <Header /> */}
            <PlayerDetails />
          </Route>
          <Route path="/">
            <Header />
            <Table />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
