import React, { useState, useEffect } from 'react';
import Register from "../components/Register.js";
import Header from "../components/Header.js";

function RegisterPage(props) {

    return (
        <>
            <Header />
            <div className="content">
                <Register />
            </div>
        </>
    )
}

export default RegisterPage;
