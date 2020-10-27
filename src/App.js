import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

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
                <Home name="Home"/>
            </Route>
            <Route path="/login">
                <Login auth={auth} />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </Switch>
        </Router>
    </div>
  );
}
export default App;
