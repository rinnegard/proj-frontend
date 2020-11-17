import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";

function RegisterPage(props) {

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>Welcome</h1>
                <p>
                    Precious Metals is the premier fake trading website. You can use it to trade in all kinds of fake commodities!
                </p>
                <img src="commodities.jpg"/>
            </div>
        </>
    )
}

export default RegisterPage;
