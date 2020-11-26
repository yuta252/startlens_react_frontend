import React from 'react';
import styles from "./Auth.module.css";

import { useSelector } from "react-redux";
import {
    selectIsLoginView,
} from "./authSlice";

import SignUpView from "./SignUp";
import SignInView from "./SignIn";



const Auth: React.FC = () => {
    const isLoginView = useSelector(selectIsLoginView);

    return (
        <div className={styles.auth__root}>
            {isLoginView ? <SignInView /> : <SignUpView /> }
        </div>
    );
};

export default Auth
