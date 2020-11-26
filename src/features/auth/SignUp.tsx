import React, { useState } from 'react';
import styles from "./Auth.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import {
    toggleMode,
    fetchAsyncLogin,
    fetchAsyncRegister,
} from "./authSlice";


const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(3),
    },
}));


const SignUp: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signUp = async () => {
        const result = await dispatch(fetchAsyncRegister(credential));
        if (fetchAsyncRegister.fulfilled.match(result)) {
            await dispatch(fetchAsyncLogin(credential));
        }
    };

    return (
        <div className={styles.auth__root}>
            <h1>SignUp</h1>
            <br/>
            <TextField
                InputLabelProps={{
                    shrink: true,
                }}
                label="Email"
                type="text"
                name="email"
                value={credential.email}
                onChange={handleInputChange}
            />
            <br/>
            <TextField
                InputLabelProps={{
                    shrink: true,
                }}
                label="Password"
                type="password"
                name="password"
                value={credential.password}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={signUp}
            >
                登録
            </Button>
            <span onClick={() => dispatch(toggleMode())}>
                ログインする
            </span>
        </div>
    );
};

export default SignUp
