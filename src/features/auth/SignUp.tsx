import React, { useState } from 'react';
import styles from "./Auth.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, Button, Avatar, Link } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { fetchAsyncLogin, fetchAsyncRegister, showError, toggleLoading, selectError, selectIsLoading } from "./authSlice";


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


const SignUp: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);
    const [credential, setCredential] = useState({ email: "", password: "", confirmPassword: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signUp = async () => {
        // Validation
        if (credential.email === "" || credential.password === "") {
            dispatch(showError({ isError: true, message: "メールアドレスまたはパスワードが未入力です" }))
            return false
        }

        if (credential.password !== credential.confirmPassword) {
            dispatch(showError({ isError: true, message: "入力された確認パスワードが一致しません。" }))
            return false
        }

        // TODO: バリデーションの追加（Emailの形式、パスワードの長さ）
        // TODO: バリデーションエラーを画面に表示追加
        dispatch(toggleLoading());
        const result = await dispatch(fetchAsyncRegister({ email: credential.email, password: credential.password }));
        // TODO: サーバーのバリデーションハンドリング
        if (fetchAsyncRegister.rejected.match(result)) {
            console.log(result)
            dispatch(toggleLoading());
            return false
        }
        if (fetchAsyncRegister.fulfilled.match(result)) {
            dispatch(toggleLoading());
            await dispatch(fetchAsyncLogin({ email: credential.email, password: credential.password }));
            // TODO:　ホーム画面への直接遷移させるか検討
            window.location.href = "/dashboard";
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                { isLoading && <CircularProgress /> }
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />
                <Typography variant="h5" className={classes.title} >
                    新規登録
                </Typography>
                <div className={styles.spacer__medium}></div>
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
                <div className={styles.spacer__small} />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="パスワード"
                    type="password"
                    name="password"
                    value={credential.password}
                    onChange={handleInputChange}
                    autoFocus
                />
                <div className={styles.spacer__small} />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="確認用パスワード"
                    type="password"
                    name="confirmPassword"
                    value={credential.confirmPassword}
                    onChange={handleInputChange}
                    autoFocus
                />
                { error.isError && (<span className={classes.spanError}> {error.message} </span>) }
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
                    className={classes.submit}
                    onClick={signUp}
                >
                    新規登録
                </Button>
                <div className={styles.divider__small} />
                <Link href="./signin" variant="body2" color="secondary">
                    ログイン画面へ
                </Link>
            </Paper>
        </Container>
    );
};

export default SignUp
