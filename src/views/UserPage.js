import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header.js";
import User from "../components/User.js";
import AddMoney from "../components/AddMoney.js";

function UserPage(props) {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [balance, setBalance] = useState("");

    const authAxios = axios.create({
        baseURL: "http://localhost:1338",
        headers: {
            Authorization: `Bearer ${props.auth.token}`
        }
    });

    useEffect(() => {
        authAxios.get("/user/" + id)
        .then(function(res) {
            console.log(res.data.doc);
            setUser(res.data.doc)
            setBalance(res.data.doc.money)
        })
        .catch(function(error) {
            console.log(error);
        })
    }, [balance]);

    return (
        <>
            <Header auth={props.auth} />
            <div className="content">
                <User auth={props.auth} user={user} balance={balance}/>
                <AddMoney auth={props.auth} user={user} setBalance={setBalance}/>
            </div>
        </>

    )
}

export default UserPage;
