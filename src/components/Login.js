import React, {useState, useEffect} from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    let next = "";
    if (props.location.state) {
        next = props.location.state.from.pathname;
    } else {
        next = "/";
    }

    console.log("From", next);


    function formSubmit(e) {
        e.preventDefault();
        console.log(email);
        console.log(password);
        axios.post("http://localhost:1338/login", {
            email: email,
            password: password
        })
        .then(function(res) {
            console.log(res);
            props.auth.authenticate(res.data.data.token);
            props.auth.setId(res.data.data.user.id);
            props.auth.setEmail(res.data.data.user.email);
            setToken(res.data.data.token);
        })
        .catch(function(error) {
            console.log(error.response);
            setErrorMessage(error.response.data.errors.detail)
        })
    }

    function inputChange(e) {
        if (e.target.type === "email") {
            setEmail(e.target.value);
        } else if (e.target.type === "password") {
            setPassword(e.target.value);
        }
    }

    return (
        <>
            {token !== "" &&
                <Redirect to={{ pathname: next }} />
            }
            <div className="register-form">
                <h1>Log in</h1>
                <form onSubmit={formSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required placeholder="john.doe@gmail.com" onChange={inputChange}/>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required onChange={inputChange}/>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    <input className="blue-button button" type="submit" value="Submit" />
                    <Link
                        to="/register"
                    >
                        Click here to register!
                    </Link>
                </form>
            </div>
        </>

    )
}

export default withRouter(Login);
