import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import History from "../pages/History";
import { Home } from "../pages/Home";
import { Preferences } from "../pages/Preferences";
import { history } from "../services/history";

export const Routes: React.FC = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/preferences" component={Preferences} />
        <Route path="/history" component={History} />
      </Switch>
    </Router>
  );
};
