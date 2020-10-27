import React from 'react';
import { NavLink } from "react-router-dom";

function Nav(props) {
    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink
                        exact
                        activeClassName="selected"
                        to="/"
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        exact
                        activeClassName="selected"
                        to="/commodities"
                    >
                        Commodities
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;
