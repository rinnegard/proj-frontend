import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import LoginPage from "./views/LoginPage";

const auth = {
  token: "",
  authenticate(token) {
    auth.token = token;
  },
  signout() {
    auth.token = "";
  }
};

function App() {
    const [token, setToken] = useState("");

    return (
    <div className="container">
        <Router>
        <Switch>
            <Route exact path="/">
                <h1>Welcome</h1>
            </Route>
            <Route path="/login">
                <LoginPage auth={auth} />

            </Route>
            <Route path="/register">
                <h1>Register</h1>

            </Route>
        </Switch>
        </Router>
    </div>
    );
}
export default App;
