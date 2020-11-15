import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import Index from "./views/Index";
import UserPage from "./views/UserPage";
import Commodities from "./views/Commodities";
import Commodity from "./views/Commodity";

import ProtectedRoute from "./components/ProtectedRoute";

const auth = {
    token: "",
    id: "",
    email: "",
    authenticate(token) {
        auth.token = token;
        },
    setId(id) {
        auth.id = id;
    },
    setEmail(email) {
        auth.email = email;
    },
    signout() {
        auth.token = "";
        auth.id = "";
        auth.email = "";
    }
};

function App() {
    const [token, setToken] = useState("");

    return (
    <div className="container">
        <Router>
        <Switch>
            <Route exact path="/">
                <Index auth={auth}/>
            </Route>
            <Route exact path="/commodities" >
                <Commodities auth={auth}/>
            </Route>
            <ProtectedRoute exact path="/commodities/:id" auth={auth}>
                <Commodity auth={auth}/>
            </ProtectedRoute>
            <Route path="/login">
                <LoginPage auth={auth} />
            </Route>
            <Route path="/register">
                <RegisterPage auth={auth}/>
            </Route>
            <ProtectedRoute path="/user/:id" auth={auth}>
                <UserPage auth={auth} />
            </ProtectedRoute>
        </Switch>
        </Router>
    </div>
    );
}
export default App;
