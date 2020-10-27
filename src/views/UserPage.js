import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import User from "../components/User.js";

function UserPage(props) {
    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <User auth={props.auth}/>
            </div>
        </>

    )
}

export default UserPage;
