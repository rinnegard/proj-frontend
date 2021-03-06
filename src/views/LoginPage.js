import React, { useState, useEffect } from 'react';
import Login from "../components/Login.js";
import Header from "../components/Header.js";

function LoginPage(props) {

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <Login auth={props.auth} />
            </div>
        </>

    )
}

export default LoginPage;
