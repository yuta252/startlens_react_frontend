import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import { fetchAsyncGetUserInfo } from './features/admin/auth/authSlice';
import { fetchAsyncGetMultiProfile } from './features/admin/profile/profileSlice';
import { fetchAsyncGetExhibits } from './features/admin/exhibit/exhibitSlice';
import { fetchAsyncGetStatistics } from './features/admin/dashboard/dashboardSlice';

import { AppDispatch } from './app/store';
import Router from './routes/Router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import AdminHeader from './components/admin/Header/Header';
import AdminSideNavigator from './components/admin/SideNavigator/SideNavigator';


const useStyles = makeStyles( (theme) => ({
    root: {
        display: 'flex'
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        padding: theme.spacing(4),
    }
}));

const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation();
    const isDisplayedAdmin: Boolean = !(location.pathname === '/admin/signin' || location.pathname === '/admin/signup');
    const classes = useStyles();

    useEffect( () => {
        const fetchBootLoader = async () => {
            if (localStorage.startlensAdminJWT) {
                const result = await dispatch(fetchAsyncGetUserInfo());
                if (fetchAsyncGetUserInfo.rejected.match(result)) {
                    return null;
                }
                if (fetchAsyncGetUserInfo.fulfilled.match(result)) {
                    // load other data after user login info is loaded once
                    await dispatch(fetchAsyncGetMultiProfile());
                    await dispatch(fetchAsyncGetExhibits(1));
                    await dispatch(fetchAsyncGetStatistics(2));
                }
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <div className={classes.root}>
            {isDisplayedAdmin && <AdminHeader />}
            {isDisplayedAdmin && <AdminSideNavigator />}
            <main className={classes.content}>
                { isDisplayedAdmin &&  <div className={classes.appBarSpacer} /> }
                <Container maxWidth={false} className={classes.container} >
                    <Router />
                </Container>
            </main>
        </div>
    );
}

export default App;
