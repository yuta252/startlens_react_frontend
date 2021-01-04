import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

import styles from './Profile.module.css';
import commonStyles from '../../assets/Style.module.css';
import { majorCategoryObj } from '../../app/constant';
import { AppDispatch } from '../../app/store';
import { selectedEditedProfile } from '../auth/authSlice';
import { editProfile, toggleProfileEdit, fetchAsyncUpdateProfile } from "../auth/authSlice";
import { POST_PROFILE } from '../types';


const useStyles = makeStyles( (theme: Theme) => ({
    formControl: {
        minWidth: "120px",
    },
    editButton: {
        width: "150px",
        padding: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const ProfileEdit: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const editedProfile = useSelector(selectedEditedProfile);

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

    const saveProfileAction = async () => {
        const result = await dispatch(fetchAsyncUpdateProfile(editedProfile));
        if (fetchAsyncUpdateProfile.rejected.match(result)) {
            console.log(result)
            return false
        }
        if (fetchAsyncUpdateProfile.fulfilled.match(result)) {
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
                label="ホームページURL"
                type="text"
                name="companySite"
                value={editedProfile.companySite}
                onChange={handleInputChange}
                autoFocus
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="電話番号"
                type="text"
                name="telephone"
                value={editedProfile.telephone}
                onChange={handleInputChange}
                autoFocus
            />
            <div className={styles.basic_edit_btn_wrapper}>
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
                    className={classes.editButton}
                    onClick={saveProfileAction}
                >
                    保存
                </Button>
            </div>
        </div>
    )
}

export default ProfileEdit
