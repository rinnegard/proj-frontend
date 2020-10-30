import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import { Link } from "react-router-dom";

function Commodities(props) {

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>Commodities</h1>
                <table>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                    </tr>
                    <tr>
                        <td><Link to="/commodities/gold">Gold</Link></td>
                        <td>59.12</td>
                    </tr>
                    <tr>
                        <td><Link to="/commodities/silver">Silver</Link></td>
                        <td>23.72</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Commodities;
