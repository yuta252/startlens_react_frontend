import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from "@material-ui/core/styles";

import { fetchAsyncGetUserInfo } from './features/auth/authSlice';

import { AppDispatch } from './app/store';
import Router from './Router';
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";

import Header from './components/Header/Header';
import SideNavigator from './components/SideNavigator/SideNavigator';


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
    const isDisplayed: Boolean = (location.pathname !== '/signin' && location.pathname !== '/signup')
    const classes = useStyles();

    useEffect( () => {
        const fetchBootLoader = async () => {
            if (localStorage.localJWT) {
                const result = await dispatch(fetchAsyncGetUserInfo());
                if (fetchAsyncGetUserInfo.rejected.match(result)) {
                    return null;
                }
                // TODO: ログインユーザー情報を利用した初期読み込み処理
            }
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <div className={classes.root}>
            {isDisplayed && <Header />}
            {isDisplayed && <SideNavigator />}
            <main className={classes.content}>
                { isDisplayed && <div className={classes.appBarSpacer} /> }
                <Container maxWidth={false} className={classes.container} >
                    <Router />
                </Container>
            </main>
        </div>
    );
}

export default App;
