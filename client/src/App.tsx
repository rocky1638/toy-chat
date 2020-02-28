import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import { Login, Chat } from "./scenes";
import "./App.css";

const App = (): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/chat" component={Chat} />
    </Switch>
  </BrowserRouter>
);

export default App;
