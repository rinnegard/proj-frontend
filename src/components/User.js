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
                <h1>User</h1>
                <p>Email: {props.user.email}</p>
                <p>Account Balance: {typeof props.balance === "number" ? props.balance : 0}</p>
                <p>Gold:  {typeof props.user.gold === "number" ? props.user.gold : 0}</p>
                <p>Silver:  {typeof props.user.silver === "number" ? props.user.silver : 0}</p>
            </div>
        </>
    )
}

export default UserPage;
