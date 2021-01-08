import React from 'react';
import { Switch, Route } from 'react-router-dom';
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";

import Profile from './features/profile/Profile';
import Dashboard from './features/dashboard/Dashboard';
import Exhibit from './features/exhibit/Exhibit';
import ExhibitNew from './features/exhibit/ExhibitNew';
import ExhibitDetail from './features/exhibit/ExhibitDetail';

import PrivateRoute from './PrivateRoute';
import NotFound from "./templates/NotFound";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/signin"} component={SignIn} />
            <Route exact path={"/signup"} component={SignUp} />
            <PrivateRoute exact path={"/profile"} component={Profile} />
            <PrivateRoute exact path={"/dashboard"} component={Dashboard} />
            <PrivateRoute exact path={"/exhibit"} component={Exhibit} />
            <PrivateRoute exact path={"/exhibit/new"} component={ExhibitNew} />
            <PrivateRoute exact path={"/exhibit/detail"} component={ExhibitDetail} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Router;