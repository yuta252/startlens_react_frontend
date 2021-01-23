import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";

import { AppDispatch } from '../../../app/store';
import customStyles from './Profile.module.css';
import commonStyles from '../../../assets/Style.module.css';
import { majorCategoryObj } from '../../../app/constant';
import {
    editProfile,
    fetchAsyncUpdateProfile,
    initialState,
    selectEditedProfile,
    toggleProfileEdit,
} from "../auth/authSlice";


const useStyles = makeStyles( (theme: Theme) => ({
    formControl: {
        minWidth: "200px",
    },
    editButton: {
        width: "150px",
        padding: theme.spacing(1),
        marginLeft: theme.spacing(2),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    cancelButton: {
        width: "150px",
        padding: theme.spacing(1),
        fontWeight: theme.typography.fontWeightBold,
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

const ProfileEdit: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const editedProfile = useSelector(selectEditedProfile);

    const [error, setError] = useState("");

    const isDisabled: boolean = !!( editedProfile.majorCategory === 0 || editedProfile.companySite.length === 0 || editedProfile.telephone.length === 0 )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        dispatch(editProfile({ ...editedProfile, [name]: value }));
    };

    // Selectのみ直接storeデータを編集
    const handleSelectCategoryChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as number;
        dispatch(editProfile({...editedProfile, majorCategory: value}));
    };

    let categoryOptions = Object.keys(majorCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {majorCategoryObj[Number(key)]}
        </MenuItem>
    ));

    const cancelProfileAction = () => {
        dispatch(editProfile({ ...initialState.editedProfile}));
        dispatch(toggleProfileEdit());
    }

    const saveProfileAction = async () => {
        if (Number(editedProfile.majorCategory) === 0) {
            setError("カテゴリーを選択してください")
            return false
        }
        const reg = /^\d{10,11}$/;
        if (!reg.test(editedProfile.telephone)) {
            setError("電話番号はハイフンなしの数字を入力してください")
            return false
        }
        const hpReg = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!hpReg.test(editedProfile.companySite)) {
            setError("正しいURLフォーマットを入力してください")
            return false
        }
        const result = await dispatch(fetchAsyncUpdateProfile(editedProfile));
        if (fetchAsyncUpdateProfile.rejected.match(result)) {
            return false
        }
        if (fetchAsyncUpdateProfile.fulfilled.match(result)) {
            dispatch(editProfile({ ...initialState.editedProfile}));
            dispatch(toggleProfileEdit());
        }
    };

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="category-select-label">カテゴリー名</InputLabel>
                <Select
                    labelId="category-select-label"
                    name="majorCategory"
                    value={editedProfile.majorCategory}
                    onChange={handleSelectCategoryChange}
                >
                    {categoryOptions}
                </Select>
            </FormControl>
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="電話番号"
                type="text"
                name="telephone"
                value={editedProfile.telephone}
                onChange={handleInputChange}
            />
            <Typography variant="body2" color="textSecondary">※ハイフンなしで入力してください</Typography>
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="ホームページURL"
                type="text"
                name="companySite"
                value={editedProfile.companySite}
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__small} />
            { error.length !== 0 && (<span className={classes.spanError}> {error} </span>) }
            <div className={customStyles.basic_edit_btn_wrapper}>
                <Button
                    variant="outlined"
                    type="submit"
                    color="primary"
                    className={classes.cancelButton}
                    onClick={cancelProfileAction}
                    disableElevation
                >
                    キャンセル
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
                    className={classes.editButton}
                    onClick={saveProfileAction}
                    disabled={isDisabled}
                    disableElevation
                >
                    保存
                </Button>
            </div>
        </div>
    )
}

export default ProfileEdit
