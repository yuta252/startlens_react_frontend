import React, { useEffect } from 'react';
import styles from './App.module.css';
import { Grid, Avatar } from "@material-ui/core";
import {
    makeStyles,
    Theme,
} from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";

import { useSelector, useDispatch } from "react-redux";
import { selectLoginUser, toggleSignIn, selectIsSignedIn } from "./features/auth/authSlice";
import { AppDispatch } from './app/store';
import Router from './Router';

import Header from './components/Header/Header';



const App: React.FC = () => {
    const isSignedIn = useSelector(selectIsSignedIn)
    // const editedTask = useSelector(selectEditedTask);
    // const loginUser = useSelector(selectLoginUser);
    // const profiles = useSelector(selectProfiles);

    // const loginProfile = profiles.filter(
    //     (prof) => prof.user_profile === loginUser.id
    // )[0];

    // const handlerEditPicture = () => {
    //     const fileInput = document.getElementById("imageInput")
    //     fileInput?.click();
    // };

    // useEffect( () => {
    //     const fetchBootLoader = async () => {
    //         await dispatch(fetchAsyncGetTasks());
    //         await dispatch(fetchAsyncGetMyProf());
    //         await dispatch(fetchAsyncGetUsers());
    //         await dispatch(fetchAsyncGetCategory());
    //         await dispatch(fetchAsyncGetProfs());
    //     };
    //     fetchBootLoader();
    // }, [dispatch]);

    return (
        <>
            {isSignedIn && <Header />}
            <main>
                <Router />
            </main>
        </>
    );
}

export default App;
