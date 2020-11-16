import React from 'react';
import { Link } from "react-router-dom";

function AccountStatus(props) {
    return (
        <div className="user-status">
            {props.auth.token ? <Link to={"/user/" + props.auth.id}>{props.auth.email}</Link> : <Link to="/login">Login</Link>
            }
        </div>
    );
}

export default AccountStatus;
