import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from "../features/admin/auth/SignIn";
import SignUp from "../features/admin/auth/SignUp";
import Profile from '../features/admin/profile/Profile';
import Dashboard from '../features/admin/dashboard/Dashboard';
import Exhibit from '../features/admin/exhibit/Exhibit';
import ExhibitNew from '../features/admin/exhibit/ExhibitNew';
import ExhibitDetail from '../features/admin/exhibit/ExhibitDetail';
import UserSignIn from '../features/user/auth/SignIn';
import UserSignUp from '../features/user/auth/SignUp';
import Top from '../features/user/spot/Top';
import SpotDetail from '../features/user/spot/SpotDetail';
import SpotSearch from '../features/user/spot/SpotSearch';

import PrivateRouteUser from './PrivateRouteUser';
import PrivateRouteAdmin from './PrivateRouteAdmin';
import NotFound from "../templates/NotFound";

const Router = () => {
    return (
        <Switch>
            <Route exact path={"/"} component={Top} />
            <Route exact path={"/spots/search"} component={SpotSearch} />
            <Route exact path={"/spots/detail"} component={SpotDetail} />
            <Route exact path={"/signin"} component={UserSignIn} />
            <Route exact path={"/signup"} component={UserSignUp} />
            <Route exact path={"/admin/signin"} component={SignIn} />
            <Route exact path={"/admin/signup"} component={SignUp} />
            <PrivateRouteAdmin exact path={"/admin/profile"} component={Profile} />
            <PrivateRouteAdmin exact path={"/admin/dashboard"} component={Dashboard} />
            <PrivateRouteAdmin exact path={"/admin/exhibit"} component={Exhibit} />
            <PrivateRouteAdmin exact path={"/admin/exhibit/new"} component={ExhibitNew} />
            <PrivateRouteAdmin exact path={"/admin/exhibit/detail"} component={ExhibitDetail} />
            <Route component={NotFound} />
        </Switch>
    )
}

export default Router;