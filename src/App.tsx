import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Grid, Avatar } from "@material-ui/core";
import {
    makeStyles,
    createMuiTheme,
    MuiThemeProvider,
    Theme,
} from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";

import { useSelector, useDispatch } from "react-redux";
import {
    selectLoginUser,
} from "./features/auth/authSlice";


import { AppDispatch } from './app/store';


const theme = createMuiTheme({
    palette: {
        secondary: {
            main: "#3cb371",
        },
    },
});

const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        marginTop: theme.spacing(3),
        cursor: "none",
    },
    avatar: {
        marginLeft: theme.spacing(1),
    },
}));


const App: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    // const editedTask = useSelector(selectEditedTask);
    // const loginUser = useSelector(selectLoginUser);
    // const profiles = useSelector(selectProfiles);

    // const loginProfile = profiles.filter(
    //     (prof) => prof.user_profile === loginUser.id
    // )[0];

    // const Logout = () => {
    //     localStorage.removeItem("localJWT")
    //     window.location.href = "/";
    // };

    // const handlerEditPicture = () => {
    //     const fileInput = document.getElementById("imageInput")
    //     fileInput?.click();
    // };

    useEffect( () => {
        const fetchBootLoader = async () => {
            // await dispatch(fetchAsyncGetTasks());
            // await dispatch(fetchAsyncGetMyProf());
            // await dispatch(fetchAsyncGetUsers());
            // await dispatch(fetchAsyncGetCategory());
            // await dispatch(fetchAsyncGetProfs());
        };
        fetchBootLoader();
    }, [dispatch]);

    return (
        <MuiThemeProvider theme={theme}>
            <div className={styles.app__root}>
            
            </div>
        </MuiThemeProvider>
    );
}

export default App;
