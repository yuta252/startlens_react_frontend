import React, { Component } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';
import _ from 'lodash';

import { selectIsSignedIn } from "./features/auth/authSlice";



const PrivateRoute: React.FC<RouteProps> = props => {
    const isSignedIn = useSelector(selectIsSignedIn);
    const rest = _.omit(props, ['component']);

    return (
        <Route
            {...rest}
            render={innerProps =>
                isSignedIn ? (
                    <Route {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/auth',
                            state: { from: innerProps.location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute;