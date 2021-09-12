import React, { useState, useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Product from './components/Product';
import F0 from './components/F0';
import Menu from './components/Menu';
import Doctor from './components/Doctor';
import Exam from "./components/Exam";
import Volunteer from "./components/Volunteer";
import User from "./components/User";
import Church from "./components/Church";
import Lecture from "./components/Lecture";
import Login from "./components/Login";
import Signup from "./components/Signup";
function App() {

  useEffect(() => {
    document.title = "Home-base Care Program"
  }, []);

  return (
    <div class="container">

      <Menu />
      {sessionStorage.getItem('token') === null || sessionStorage.getItem('token') === "" ? <Login /> :
        <Router>

          <div>
            {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
            <Switch>
              <Route exact path="/">
              </Route>
              <Route path="/about">
              </Route>
              <Route path="/f0">
                <F0 />
              </Route>
              <Route path="/product">
                <Product />
              </Route>
              <Route path="/doctor">
                <Doctor />
              </Route>
              <Route path="/exam/:f0">
                <Exam />
              </Route>
              <Route path="/volunteer">
                <Volunteer />
              </Route>
              <Route path="/user">
                <User />
              </Route>
              <Route path="/church">
                <Church />
              </Route>
              <Route path="/lecture">
                <Lecture />
              </Route >
            </Switch>
          </div>
        </Router>
      }
      <div>
        <Router>
        <Route path="/login">
                <Login />
              </Route >
          <Route path="/signup">
            <Signup />
          </Route>
        </Router>
      </div>
    </div>


  );
}

export default App;

