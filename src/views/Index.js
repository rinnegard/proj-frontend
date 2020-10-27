import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";

function RegisterPage(props) {

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>Welcome</h1>
            </div>
        </>
    )
}

export default RegisterPage;
