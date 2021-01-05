import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';

import _ from 'lodash';


const PrivateRoute: React.FC<RouteProps> = props => {
    // ローカルストレージにJWT tokenがある場合のみルートへのアクセスを許可する
    const isSignedIn = Boolean(localStorage.localJWT)
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
                            pathname: '/signin',
                            state: { from: innerProps.location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute;