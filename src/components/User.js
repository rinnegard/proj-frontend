import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function UserPage(props) {
    const { id } = useParams();

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
        })
        .catch(function(error) {
            console.log(error);
        })
    });

    return (
        <>
            <div className="user">
                <h1>User</h1>
            </div>
        </>
    )
}

export default UserPage;
