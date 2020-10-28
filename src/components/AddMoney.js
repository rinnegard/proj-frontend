import React, { useState, useEffect } from 'react';
import Header from "../components/Header.js";
import { useParams } from "react-router-dom";
import axios from "axios";

function AddMoney(props) {
    const [money, setMoney] = useState("");

    const authAxios = axios.create({
        baseURL: "http://localhost:1338",
        headers: {
            Authorization: `Bearer ${props.auth.token}`
        }
    });

    const body = {
        email: props.auth.email,
        money: money
    }

    function formSubmit(e) {
        e.preventDefault();
        authAxios.post("/updateMoney", body)
        .then(function(res) {
            console.log(res);
            props.setBalance(props.user.money + money)
            setMoney("");
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    function onChange(e) {
        setMoney(e.target.value);
    }

    return (
        <>
            <div className="user-balance-form">
                <form onSubmit={formSubmit}>
                    <label htmlFor="user-balance">Add balance</label>
                    <input type="number" name="user-balance" required onChange={onChange} value={money}/>
                    <input className="button" type="submit" value="Submit" />
                </form>
            </div>
        </>
    )
}

export default AddMoney;
