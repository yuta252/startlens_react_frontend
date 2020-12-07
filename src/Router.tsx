import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";

import Profile from './features/profile/Profile';

import PrivateRoute from './PrivateRoute';
import NotFound from "./templates/NotFound";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signup"} component={SignUp} />
            <PrivateRoute exact path={"/profile"} component={Profile} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Router;