import React, { Component } from "react";
import { render } from "react-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import Profile from "./Profile";
import Post from "./Post";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Header />

        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/profile" component={Profile} />
            <Route path="/post/:postID" component={Post} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
