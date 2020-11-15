import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserPage(props) {
    // const { id } = useParams();
    // const [user, setUser] = useState({});
    //
    // const authAxios = axios.create({
    //     baseURL: "http://localhost:1338",
    //     headers: {
    //         Authorization: `Bearer ${props.auth.token}`
    //     }
    // });
    //
    // useEffect(() => {
    //     authAxios.get("/user/" + id)
    //     .then(function(res) {
    //         console.log(res.data.doc);
    //         setUser(res.data.doc)
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     })
    // }, []);

    return (
        <>
            <div className="user-info">
                <h1>User Information</h1>
                <table>
                    <tbody>
                        <tr>
                            <td className="name">
                                Email
                            </td>
                            <td className="value">
                                {props.user.email}
                            </td>
                        </tr>
                        <tr>
                            <td className="name">
                                Account Balance
                            </td>
                            <td className="value">
                                {typeof props.balance === "number" ? props.balance : 0}
                            </td>
                        </tr>
                        <tr>
                            <td className="name">
                                Gold
                            </td>
                            <td className="value">
                                {typeof props.user.gold === "number" ? props.user.gold : 0}
                            </td>
                        </tr>
                        <tr>
                            <td className="name">
                                Silver
                            </td>
                            <td className="value">
                                {typeof props.user.silver === "number" ? props.user.silver : 0}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default UserPage;
