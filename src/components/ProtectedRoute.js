import React from 'react';
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ children, ...rest }) {

    return (
        <Route
            {...rest}
            render={
            (props) => {
                console.log(rest);
                if (rest.auth.token) {
                    return children
                } else {
                    return <Redirect to={{
                        pathname: "/login",
                        state: { from: rest.location }
                        }}
                    />
                }
            }
        }/>

    );
}

export default ProtectedRoute;
