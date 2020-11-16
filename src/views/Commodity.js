import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Header.js";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function Commodity(props) {
    const { id } = useParams();
    const [amount, setAmount] = useState("");
    const [price, setPrice] = useState(32);
    const [owned, setOwned] = useState(0);
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


    function formSubmit(e) {
        e.preventDefault();
        console.log(e.nativeEvent.submitter);
        if (e.nativeEvent.submitter.value === "Buy") {
            console.log("Buying");
            setOwned(owned + amount);
        } else if (e.nativeEvent.submitter.value === "Sell") {
            console.log("Selling");
            setOwned(owned - amount);
        }
        console.log(owned);
    }

    function onChange(e) {
        setAmount(parseInt(e.target.value))
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
                                <td className="value">
                                    {price}
                                </td>

                            </tr>
                            <tr>
                                <td className="name">
                                    Amount Owned
                                </td>
                                <td className="value">
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
                        <input type="number" name="buysell-stock" required onChange={onChange} value={amount}/>
                        <p>Cost: {!Number.isNaN(price*amount) && price*amount}</p>
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
