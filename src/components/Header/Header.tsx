import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PolymerIcon from '@material-ui/icons/Polymer';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../../../App.module.css';
import { toggleSignIn, selectIsSignedIn } from "../../features/auth/authSlice";
import { AppDispatch } from '../../app/store';
import { push } from 'connected-react-router';

import HeaderMenus from './HeaderMenus';


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    menuBar: {
        backgroundColor: "#fff",
        color: "#444"
    },
    toolBar: {
        margin: '0 auto',
        maxWidth: 1024,
        width: '100%'
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
}));


const Header: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.menuBar}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Logo" width="70px" onClick={ () => dispatch(push('/'))}
                />
                <div className={classes.iconButtons}>
                    <HeaderMenus />
                </div>
            </AppBar>
        </div>
    )
}

export default Header
