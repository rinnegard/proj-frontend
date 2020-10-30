import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Header.js";
import { Link } from "react-router-dom";

function Commodity(props) {
    const { id } = useParams();

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>{id}</h1>
                <table>
                    <tr>
                        <td className="name">
                            Price
                        </td>
                        <td className="value">
                            52.12
                        </td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Commodity;
