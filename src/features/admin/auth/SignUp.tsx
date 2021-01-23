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

import { AppDispatch } from "../../../app/store";
import {
    fetchAsyncLogin,
    fetchAsyncRegister,
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


const SignUp: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [credential, setCredential] = useState({ email: "", password: "", confirmPassword: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signUp = async () => {
        // Validation
        if (credential.email === "" || credential.password === "") {
            setError("メールアドレスまたはパスワードが未入力です");
            return false
        }

        if (credential.password !== credential.confirmPassword) {
            setError("入力された確認パスワードが一致しません");
            return false
        }

        if (credential.password.length < 6) {
            setError("パスワードは6文字以上で設定してください");
            return false
        }

        const reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        if (!reg.test(credential.email)) {
            setError("正しいメールアドレスのフォーマットではありません");
            return false
        }

        setLoading(true);
        const result = await dispatch(fetchAsyncRegister({ email: credential.email, password: credential.password }));
        if (fetchAsyncRegister.rejected.match(result)) {
            setError("登録できませんでした。既に登録されている可能性があります。別のメールアドレスでお試しください");
            setLoading(false);
            return false
        }
        if (fetchAsyncRegister.fulfilled.match(result)) {
            setLoading(false);
            await dispatch(fetchAsyncLogin({ email: credential.email, password: credential.password }));
            window.location.href = "/admin/dashboard";
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper className={classes.paper}>
                { loading && <CircularProgress /> }
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />
                <Typography variant="h5" className={classes.title} >
                    新規登録
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
                <div className={commonStyles.spacer__small} />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="確認用パスワード"
                    type="password"
                    name="confirmPassword"
                    value={credential.confirmPassword}
                    onChange={handleInputChange}
                />
                { error.length !== 0 && (<span className={classes.spanError}> {error} </span>) }
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
                <div className={commonStyles.divider__small} />
                <Link href="./signin" variant="body2" color="secondary">
                    ログイン画面へ
                </Link>
            </Paper>
        </Container>
    );
};

export default SignUp
