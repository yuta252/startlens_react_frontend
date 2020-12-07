import React from 'react';
import styles from '../../App.module.css';
import { Avatar } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';

import { toggleSignIn } from "../../features/auth/authSlice";
import { AppDispatch } from '../../app/store';


const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginTop: theme.spacing(3),
        cursor: "none",
    },
    avatar: {
        marginLeft: theme.spacing(1),
    },
}));

const HeaderMenus: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const Logout = () => {
        localStorage.removeItem("localJWT");
        dispatch(toggleSignIn());
        window.location.href = "/";
    };

    return (
        <>
            <button className={styles.app__iconLogout} onClick={Logout}>
                <ExitToAppIcon fontSize="large" />
            </button>
            <button className={styles.app__btn}>
                <Avatar
                    className={classes.avatar}
                    alt="avatar"
                    src={
                        `${process.env.PUBLIC_URL}/assets/logo.png`
                    }
                />
            </button>
        </>
    )
}

export default HeaderMenus
