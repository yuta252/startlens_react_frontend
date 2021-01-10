import React from 'react';
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
import {
    editMultiProfile,
    fetchAsyncCreateMultiProfile,
    fetchAsyncUpdateMultiProfile,
    handleDisplayStatus,
    initialState,
    selectEditedMultiProfile,
    selectMultiProfile,
} from './profileSlice';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Profile.module.css';
import { langCategoryObj } from '../../../app/constant';


const useStyles = makeStyles( (theme: Theme) => ({
    saveMultiProfileButton: {
        width: "120px",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    cancelMultiProfileButton: {
        width: "120px",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
    formControl: {
        minWidth: "180px",
    },
}));

const MultiProfileEdit: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const editedMultiProfile = useSelector(selectEditedMultiProfile);

    const isDisabled: boolean = (editedMultiProfile.lang.length === 0 || editedMultiProfile.username.length === 0 || editedMultiProfile.selfIntro.length === 0 ||
                                editedMultiProfile.addressPrefecture.length === 0 || editedMultiProfile.addressCity.length === 0 || editedMultiProfile.addressStreet.length === 0 ||
                                editedMultiProfile.entranceFee.length === 0 || editedMultiProfile.businessHours.length === 0 || editedMultiProfile.holiday.length === 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        dispatch(editMultiProfile({ ...editedMultiProfile, [name]: value }));
    };

    const handleSelectLangChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as string;
        dispatch(editMultiProfile({...editedMultiProfile, lang: value}));
    };

    let langOptions = Object.keys(langCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {langCategoryObj[key]}
        </MenuItem>
    ));

    const createMultiProfileAction = async () => {
        const result = await dispatch(fetchAsyncCreateMultiProfile(editedMultiProfile));
        if (fetchAsyncCreateMultiProfile.rejected.match(result)) {
            console.log(result)
            return false
        }
        if (fetchAsyncCreateMultiProfile.fulfilled.match(result)) {
            // Initialize edit profile state
            dispatch(handleDisplayStatus(true));
            dispatch(editMultiProfile(initialState.editedMultiProfile));
            dispatch(editMultiProfile(initialState.selectedMultiProfile));
        }
    };

    const updateMultiProfileAction = async () => {
        const result = await dispatch(fetchAsyncUpdateMultiProfile(editedMultiProfile));
        if (fetchAsyncUpdateMultiProfile.rejected.match(result)) {
            console.log(result)
            return false
        }
        if (fetchAsyncUpdateMultiProfile.fulfilled.match(result)) {
            dispatch(handleDisplayStatus(true));
        }
    };

    return (
        <div className={customStyles.multi_profile_display_wrapper}>
            <Typography variant="subtitle1">言語プロフィール編集</Typography>
            <div className={commonStyles.spacer__small} />
            <FormControl className={classes.formControl}>
                <InputLabel id="category-select-label">カテゴリー名</InputLabel>
                <Select
                    labelId="category-select-label"
                    name="lang"
                    value={editedMultiProfile.lang}
                    onChange={handleSelectLangChange}
                >
                    {langOptions}
                </Select>
            </FormControl>
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="ユーザー名"
                type="text"
                name="username"
                value={editedMultiProfile.username}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="都道府県"
                type="text"
                name="addressPrefecture"
                value={editedMultiProfile.addressPrefecture}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="市区町村"
                type="text"
                name="addressCity"
                value={editedMultiProfile.addressCity}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="番地・建物名"
                type="text"
                name="addressStreet"
                value={editedMultiProfile.addressStreet}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="料金"
                type="text"
                name="entranceFee"
                value={editedMultiProfile.entranceFee}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="営業時間"
                type="text"
                name="businessHours"
                value={editedMultiProfile.businessHours}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="休日"
                type="text"
                name="holiday"
                value={editedMultiProfile.holiday}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <TextField
                variant="outlined"
                fullWidth
                label="紹介文"
                type="text"
                name="selfIntro"
                multiline
                value={editedMultiProfile.selfIntro}
                size="small"
                onChange={handleInputChange}
            />
            <div className={commonStyles.spacer__medium} />
            <div className={customStyles.basic_edit_btn_wrapper}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.cancelMultiProfileButton}
                    onClick={
                        () => {
                            dispatch(handleDisplayStatus(true));
                            dispatch(editMultiProfile(initialState.editedMultiProfile));
                            dispatch(selectMultiProfile(initialState.selectedMultiProfile));
                        }
                    }
                    disableElevation
                >
                    キャンセル
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveMultiProfileButton}
                    onClick={
                        editedMultiProfile.id === 0 ?
                            () => createMultiProfileAction() :
                            () => updateMultiProfileAction()
                    }
                    disabled={isDisabled}
                    disableElevation
                >
                    保存
                </Button>
            </div>
        </div>
    )
}

export default MultiProfileEdit
