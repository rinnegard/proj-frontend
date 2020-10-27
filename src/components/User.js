import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserPage(props) {
    const { id } = useParams();
    const [user, setUser] = useState({});

    const authAxios = axios.create({
        baseURL: "http://localhost:1338",
        headers: {
            Authorization: `Bearer ${props.auth.token}`
        }
    });

    useEffect(() => {
        authAxios.get("/user/" + id)
        .then(function(res) {
            // res.data.data.result.week
            console.log(res.data.doc);
            setUser(res.data.doc)
        })
        .catch(function(error) {
            console.log(error);
        })
    }, []);

    return (
        <>
            <div className="user-info">
                <h1>User</h1>
                <p>Email: {user.email}</p>
                <p>Account Balance: {typeof user.money === "number" ? user.money : 0}</p>
                <p>Gold:  {typeof user.gold === "number" ? user.gold : 0}</p>
                <p>Silver:  {typeof user.silver === "number" ? user.silver : 0}</p>
            </div>
        </>
    )
}

export default UserPage;
