import React from 'react';
import { Grid, Avatar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PolymerIcon from '@material-ui/icons/Polymer';
import { useSelector, useDispatch } from 'react-redux';

import styles from '../../../App.module.css';
import { toggleSignIn, selectIsSignedIn } from "../../features/auth/authSlice";
import { AppDispatch } from '../../app/store';
import { push } from 'connected-react-router';

import HeaderMenus from './HeaderMenus';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        backgroundColor: "#fff",
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    toolBar: {
        paddingRight: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
}));


const Header: React.FC = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <IconButton>
                    <ExitToAppIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header
