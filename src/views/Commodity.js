import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.js";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import io from 'socket.io-client';
const socket = io('ws://localhost:1338');

function Commodity(props) {
    const { id } = useParams();
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState(0);
    const [owned, setOwned] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState([]);

    const authAxios = axios.create({
        baseURL: "http://localhost:1338",
        headers: {
            Authorization: `Bearer ${props.auth.token}`
        }
    });

    useEffect(() => {
        authAxios.get("/user/" + props.auth.id)
        .then(function(res) {
            console.log(res.data.doc[id]);
            setOwned(res.data.doc[id])
        })
        .catch(function(error) {
            console.log(error);
        })
    }, [id, socket]);


    useEffect(() => {
        console.log("Effect 2");
        socket.on("connect", function() {
            console.log("Connected");
        })

        socket.on(id, function(item) {
            console.log(item);

            setData(data => [...data, item])
            setPrice(item.price)
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


    function formSubmit(e) {
        setErrorMessage("");
        e.preventDefault();

        let ownedElement = document.getElementsByClassName("owned-value")[0];
        ownedElement.classList.remove("increase", "decrease")

        console.log(e.nativeEvent.submitter);
        console.log("Owned: ", owned);
        console.log("Amount: ", amount);

        const body = {
            email: props.auth.email,
        }

        if (e.nativeEvent.submitter.value === "Buy") {
            console.log("Buying");
            //Update database balance
            body.money = -price*amount;
            authAxios.post("/updateMoney", body)
            .then(function(res) {
                console.log(res);
            })
            .catch(function(error) {
                console.log(error);
            })
            //Update database items
            body.item = id;
            body.amount = amount;
            authAxios.post("/updateItem", body)
            .then(function(res) {
                console.log(res);
            })
            .catch(function(error) {
                console.log(error);
            })
            //Update frontend
            if (typeof owned === 'undefined') {
                setOwned(amount);
            } else {
                setOwned(owned + amount);
            }
            ownedElement.classList.add("increase")
            let showUpdate = setTimeout(function() {
                ownedElement.classList.remove("increase")
            }, 4000)
        } else if (e.nativeEvent.submitter.value === "Sell") {
            console.log("Selling");
            if (amount > owned) {
                setErrorMessage("You don't have that many to sell");
                return;
            }
            //Update database balance
            body.money = price*amount;
            authAxios.post("/updateMoney", body)
            .then(function(res) {
                console.log(res);
            })
            .catch(function(error) {
                console.log(error);
            })
            //Update database items
            body.item = id;
            body.amount = -amount;
            authAxios.post("/updateItem", body)
            .then(function(res) {
                console.log(res);
            })
            .catch(function(error) {
                console.log(error);
            })
            //Update frontend
            setOwned(owned - amount);
            ownedElement.classList.add("decrease")
            let showUpdate = setTimeout(function() {
                ownedElement.classList.remove("decrease")
            }, 4000)
        }
    }

    function onChange(e) {
        setAmount(parseInt(e.target.value))
        console.log(amount);
    }

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>{id}</h1>
                <div className="user-info">
                    <table >
                        <tbody>
                            <tr>
                                <td className="name">
                                    Current Price
                                </td>
                                <td className="value price-value">
                                    {Math.round(price * 100) / 100}
                                </td>

                            </tr>
                            <tr>
                                <td className="name">
                                    Amount Owned
                                </td>
                                <td className="value owned-value">
                                    {owned}
                                </td>
                            </tr>
                            <tr>
                                <td className="name">
                                    Total Value
                                </td>
                                <td className="value">
                                     {!Number.isNaN(price*owned) && Math.round(price*owned * 100) / 100}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form">
                    <form onSubmit={formSubmit}>
                        <label htmlFor="buysell-stock">Amount to buy or sell</label>
                        <input type="number" name="buysell-stock" required onChange={onChange} value={amount} min={1} />
                        <p>Total: {!Number.isNaN(price*amount) &&  Math.round(price*amount * 100) / 100}</p>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <input className="button half-button buy-button" type="submit" value="Buy" />
                        <input className="button half-button sell-button" type="submit" value="Sell" />
                    </form>
                </div>
                <ResponsiveContainer width="95%" height={300}>
                    <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={["dataMin", 'dataMax']}
                        tickFormatter={(tick) => {return new Date(tick).toTimeString().substring(0, 5);}}
                    />
                    <YAxis
                        type="number"
                    />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 10 }} dot={false}/>
                    <Tooltip
                        labelFormatter={(tick) => {
                            return new Date(tick).toTimeString().substring(0, 5);
                        }}
                        formatter={(value) => {
                            return Math.round(value * 100) / 100
                        }}
                    />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </>
    )
}

export default Commodity;
