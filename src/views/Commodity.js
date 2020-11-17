import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import io from 'socket.io-client';
import useSocket from 'use-socket.io-client';
import Header from "../components/Header.js";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function Commodity(props) {
    const { id } = useParams();
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState(32);
    const [owned, setOwned] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const data = [
        {
            price: 15, time: new Date("2015-03-25T07:00:00Z").getTime()
        },
        {
            price: 18, time: new Date("2015-03-25T11:00:00Z").getTime()
        },
        {
            price: 13, time:  new Date("2015-03-25T14:00:00Z").getTime()
        },
        {
            price: 5, time:  new Date("2015-03-25T17:00:00Z").getTime()
        },
        {
            price: 5, time:  new Date("2015-03-25T21:00:00Z").getTime()
        },
        {
            price: 21, time:  new Date("2015-03-25T23:00:00Z").getTime()
        },
    ]
    const [socket] = useSocket('http://localhost:1338');

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
    }, []);


    useEffect(() => {
        socket.on("connect", function() {
            console.log("Connected");
            socket.on("gold", function(item) {
                console.log(item);
            })
            socket.on("silver", function(item) {
                console.log(item);
            })
        })


    }, [data]);


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
                                    {price}
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
                                     {!Number.isNaN(price*owned) && price*owned}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form">
                    <form onSubmit={formSubmit}>
                        <label htmlFor="buysell-stock">Amount to buy or sell</label>
                        <input type="number" name="buysell-stock" required onChange={onChange} value={amount} min={1} />
                        <p>Cost: {!Number.isNaN(price*amount) && price*amount}</p>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <input className="button half-button buy-button" type="submit" value="Buy" />
                        <input className="button half-button sell-button" type="submit" value="Sell" />
                    </form>
                </div>
                  <LineChart width={600} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="time"
                        type="number"
                        domain={['dataMin', 'dataMax']}
                        scale="time"
                        tickFormatter={(tick) => {return new Date(tick).toTimeString().substring(0, 5);}}
                    />
                    <YAxis />
                    <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 10 }} />
                    <Tooltip />
                  </LineChart>

            </div>
        </>
    )
}

export default Commodity;
