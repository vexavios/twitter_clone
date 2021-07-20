import React, { Component } from "react";
import { render } from "react-dom";

import Header from "./Header";
import HomePage from "./HomePage";
import Post from "./Post";
import Profile from "./Profile";
import Login from "./Login";
import Register from "./Register";

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

    this.state = {
      userID: null,
    };

    // this.displayLoginInfo = this.displayLoginInfo.bind(this);
  }

  async componentDidMount() {
    fetch("/api/user-logged-in")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userID: data.id,
        });
      });
  }

  // displayLoginInfo() {
  //   return this.state.userID
  //     ? `Logged in as user ${this.state.userID}!`
  //     : `Not logged in.`;
  // }

  render() {
    return (
      <div>
        <Header userID={this.state.userID} />

        {/* {this.displayLoginInfo()} */}

        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/post/:postID" component={Post} />
            <Route path="/profile/:userID" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </Router>
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);
