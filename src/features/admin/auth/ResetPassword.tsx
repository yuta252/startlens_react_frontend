import React, { useState } from 'react';
import { makeStyles, Theme } from "@material-ui/core/styles";
import {
    Button,
    TextField
} from "@material-ui/core";

import commonStyles from "../../../assets/Style.module.css";

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        margin: theme.spacing(3),
    },
}));


const ResetPassword: React.FC = () => {
    const classes = useStyles();
    const [credential, setCredential] = useState({ email: "" });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setCredential({ ...credential, [name]: value });
    };

    const signIn = async () => {
        // Validation
        if (credential.email === "") {
            alert("必須項目が未入力です")
            return false
        }
        // TODO: パスワードリセットDispatchにおいてサーバーに送信
    };

    return (
        <div className={commonStyles.auth__root}>
            <h1>パスワードリセット</h1>
            <br/>
            <TextField
                InputLabelProps={{
                    shrink: true,
                }}
                label="メールアドレス"
                type="text"
                name="email"
                value={credential.email}
                onChange={handleInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={signIn}
            >
                送信
            </Button>
        </div>
    );
};

export default ResetPassword