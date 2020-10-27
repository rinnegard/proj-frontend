import React, { useState, useEffect } from 'react';
import Nav from "./Nav.js";
import AccountStatus from "./AccountStatus.js";

function Header(props) {

    return (
        <header>
            <h1>Precious Metals</h1>
            <Nav />
            <AccountStatus auth={props.auth} />
        </header>
    )
}

export default Header;
