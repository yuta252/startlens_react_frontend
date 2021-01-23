import React, { useState } from 'react';
import { useDispatch } from "react-redux";

import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    Container,
    CircularProgress,
    Link,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import { Alert, AlertTitle } from '@material-ui/lab';

import { AppDispatch } from "../../../app/store";
import {
    fetchAsyncLogin,
} from "./authSlice";
import commonStyles from "../../../assets/Style.module.css";


const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        padding: theme.spacing(4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
    },
    submit: {
        margin: theme.spacing(3),
        padding: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    snackbar: {
        width: "93%"
    },
    span: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "teal",
    },
    spanError: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#d8135b",
        marginTop: 10,
        fontSize: "14px"
    },
}));


const SignIn: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [credential, setCredential] = useState({ email: "", password: "" });

    const isDisabled = (credential.email.length === 0 || credential.password.length === 0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signIn = async () => {
        // Validation
        if (credential.email === "" || credential.password === "") {
            setError("メールアドレスまたはパスワードが未入力です");
            return false
        }

        setLoading(true);
        const result = await dispatch(fetchAsyncLogin(credential));;
        if (fetchAsyncLogin.rejected.match(result)) {
            console.log(result)
            setLoading(false);
            setError("メールアドレスまたはパスワードに誤りがあります");
            return false
        }
        if (fetchAsyncLogin.fulfilled.match(result)) {
            setLoading(false);
            window.location.href = "/admin/dashboard";
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                { loading && <CircularProgress /> }
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />
                <Typography variant="h5" className={classes.title} >
                    ログイン
                </Typography>
                <div className={commonStyles.spacer__medium}></div>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="メールアドレス"
                    type="text"
                    name="email"
                    value={credential.email}
                    onChange={handleInputChange}
                    autoFocus
                />
                <div className={commonStyles.spacer__small} />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="パスワード"
                    type="password"
                    name="password"
                    value={credential.password}
                    onChange={handleInputChange}
                />
                { error.length !== 0 && (<span className={classes.spanError}> {error} </span>) }
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
                    className={classes.submit}
                    onClick={signIn}
                    disabled={isDisabled}
                >
                    ログイン
                </Button>
                <Alert severity="info" className={classes.snackbar}>
                    <AlertTitle>デモアカウント</AlertTitle>
                    Email:<strong>info@startlens.com</strong>, Password: <strong>startlens</strong>
                </Alert>
                <div className={commonStyles.divider__small} />
                <Link href="./signup" variant="body2" color="secondary">
                    アカウントを新規で登録する
                </Link>
            </Paper>
        </Container>
    );
};

export default SignIn