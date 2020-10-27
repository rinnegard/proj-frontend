import React, { useState, useEffect } from 'react';
import Login from "../components/Login.js";

function LoginPage(props) {

    return (
        <>
            <header>
                <h1>--NAVHERE--</h1>
            </header>
            <Login auth={props.auth} />
        </>
    )
}

export default LoginPage;
