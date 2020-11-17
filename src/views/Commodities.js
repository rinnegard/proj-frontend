import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import { Link } from "react-router-dom";

import io from 'socket.io-client';
const socket = io('ws://localhost:1338');

function Commodities(props) {
    const [goldPrice, setGoldPrice] = useState(0);
    const [silverPrice, setSilverPrice] = useState(0);

    useEffect(() => {
        socket.on("connect", function() {
            console.log("Connected");
        })

        socket.on("gold", function(item) {
            console.log(item.price);

            setGoldPrice(item.price)
        })

        socket.on("silver", function(item) {
            console.log(item.price);

            setSilverPrice(item.price)
        })

        socket.on('connect_error', (error) => {
            console.log(error);
        });

        socket.on('disconnect', function() {
            console.info("Disconnected");
        });

        return () => {
            socket.off();
        }
    }, []);

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>Commodities</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>Price</td>
                        </tr>
                        <tr>
                            <td><Link to="/commodities/gold">Gold</Link></td>
                            <td className="value price-value">
                                {Math.round(goldPrice * 100) / 100}
                            </td>
                        </tr>
                        <tr>
                            <td><Link to="/commodities/silver">Silver</Link></td>
                            <td className="value price-value">
                                {Math.round(silverPrice * 100) / 100}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Commodities;
