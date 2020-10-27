import React from 'react';
import { Link } from "react-router-dom";

function AccountStatus(props) {
    console.log(props.auth.token);
    return (
        <div className="user-status">
            {props.auth.token ? <Link to={"/user/" + props.auth.token}>User</Link> : <Link to="/login">Login</Link>
            }
        </div>
    );
}

export default AccountStatus;
