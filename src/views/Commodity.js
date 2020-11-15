import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Header from "../components/Header.js";
import { Link } from "react-router-dom";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

function Commodity(props) {
    const { id } = useParams();
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
    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <h1>{id}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td className="name">
                                Price
                            </td>
                            <td className="value">
                                52.12
                            </td>
                        </tr>
                    </tbody>
                </table>
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
