import React from "react";
import { Route, Redirect } from "react-router-dom";

import {isAuthenticated} from './func'

export const Protected = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                const auth = isAuthenticated()
                if (auth) {
                    return <Component {...props}/>
                } else {
                    return <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}