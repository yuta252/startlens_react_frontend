import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Button,
    CircularProgress,
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
    fetchAsyncGetTranslation,
    fetchAsyncUpdateMultiProfile,
    handleDisplayStatus,
    initialState,
    selectEditedMultiProfile,
    selectMultiProfile,
    selectMultiProfiles,
} from './profileSlice';
import { 
    fetchAsyncGetGeocodingInfo,
    fetchAsyncUpdateProfile,
    selectLoginUser
} from '../auth/authSlice';
import GoogleMapComponent from './GoogleMapComponent';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Profile.module.css';
import { langCategoryObj } from '../../../app/constant';
import {
    TRANSLATION_PROFILE_PARAMS,
    TRANSLATION_REQ_PARAMS
} from '../../types'


type PAYLOAD = {
    key: string,
    text: string
}

const useStyles = makeStyles( (theme: Theme) => ({
    getGeocodingButton: {
        width: "180px",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
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
    spanError: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#d8135b",
        marginTop: 10,
        fontSize: "14px"
    },
    translationError: {
        display: "flex",
        justifyContent: "flex-start",
        color: "#d8135b",
        marginTop: 10,
        fontSize: "14px"
    },
    translationButton: {
        marginLeft: theme.spacing(2)
    },
}));

const MultiProfileEdit: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const editedMultiProfile = useSelector(selectEditedMultiProfile);
    const loginUser = useSelector(selectLoginUser);
    const multiProfiles = useSelector(selectMultiProfiles);

    const [error, setError] = useState("");
    const [translationError, setTranslationError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    let isDisabled: boolean = (editedMultiProfile.lang.length === 0 || editedMultiProfile.username.length === 0 || editedMultiProfile.selfIntro.length === 0 ||
                                editedMultiProfile.addressPrefecture.length === 0 || editedMultiProfile.addressCity.length === 0 || editedMultiProfile.addressStreet.length === 0 ||
                                editedMultiProfile.entranceFee.length === 0 || editedMultiProfile.businessHours.length === 0 || editedMultiProfile.holiday.length === 0);
    let isDisabledFetchGeo: boolean = false;

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
            return false
        }
        if (fetchAsyncUpdateMultiProfile.fulfilled.match(result)) {
            dispatch(handleDisplayStatus(true));
        }
    };

    const getGeocodingAction = async () => {
        isDisabledFetchGeo = true;
        setIsLoading(true);

        const address: string = editedMultiProfile.addressPrefecture + editedMultiProfile.addressCity + editedMultiProfile.addressStreet
        const result = await dispatch(fetchAsyncGetGeocodingInfo(address));
        if (fetchAsyncGetGeocodingInfo.rejected.match(result)) {
            setIsLoading(false);
            setError("位置情報の取得に失敗しました。もう一度お試しください。")
            console.log("Geocoding API error happened.")
            return false
        }
        if (fetchAsyncGetGeocodingInfo.fulfilled.match(result)) {
            // update database with latitude and longitude
            setIsLoading(false);
            setError("")
            isDisabledFetchGeo = false;
            const location = result.payload.results[0].geometry.location
            await dispatch(fetchAsyncUpdateProfile({latitude: Number(location.lat), longitude: Number(location.lng)}))
        }
    }

    const unescapeHtml = (target: string) => {
        if (typeof target !== 'string') return target;
        const patterns: {[key:string]: string} = {
            '&lt;'   : '<',
            '&gt;'   : '>',
            '&amp;'  : '&',
            '&quot;' : '"',
            '&#x27;' : '\'',
            '&#x60;' : '`'
        }
        return target.replace(/&(lt|gt|amp|quot|#x27|#x60);/g, function(match) {
            return patterns[match];
        });
    }

    const getTranslationAction = async () => {
        // translate description from ja to target language
        const targetText = multiProfiles.filter( (multiProfile) => (
            multiProfile.lang === 'ja'
        ))
        if (targetText[0] && editedMultiProfile.lang !== 'ja'){
            const targetTextObj: {[key: string]: string} = {
                "username": targetText[0].username,
                "selfIntro": targetText[0].selfIntro,
                "addressPrefecture": targetText[0].addressPrefecture,
                "addressCity": targetText[0].addressCity,
                "addressStreet": targetText[0].addressStreet,
                "entranceFee": targetText[0].entranceFee,
                "businessHours": targetText[0].businessHours,
                "holiday": targetText[0].holiday,
            }
            let results: TRANSLATION_PROFILE_PARAMS[] = [];

            Object.keys(targetTextObj).map( (key) => {
                const translationParams: TRANSLATION_PROFILE_PARAMS = {key: key,target: editedMultiProfile.lang, text: targetTextObj[key]}
                results.push(translationParams)
                return false
            });
            let resultAll = await Promise.all(results.map( (result) => dispatch(fetchAsyncGetTranslation(result))));
            let editMultiProfileParams: {[key: string]: string} = {}
            resultAll.map( (result) => {
                const payload = result.payload as PAYLOAD;
                editMultiProfileParams[payload.key] = unescapeHtml(payload.text);
                return false;
            })
            dispatch(editMultiProfile({ ...editedMultiProfile, ...editMultiProfileParams}));
            setError("")
        } else {
            setTranslationError("翻訳対象となる言語が指定されていないか、翻訳される日本語の説明文が登録されていません。");
        }
    }

    return (
        <div className={customStyles.multi_profile_display_wrapper}>
            <Typography variant="subtitle1">言語プロフィール編集</Typography>
            <div className={commonStyles.spacer__small} />
            <div className={customStyles.multi_profile_edit_translation_wrapper}>
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
                <Button onClick={getTranslationAction} color="primary" className={classes.translationButton}>
                    翻訳
                </Button>
            </div>
            {translationError.length !== 0 &&
                (<span className={classes.translationError}> {translationError} </span>)
            }
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
            { isLoading && <CircularProgress /> }
            {loginUser.profile.latitude && loginUser.profile.longitude && (<GoogleMapComponent />)}
            { error.length !== 0 && (<span className={classes.spanError}> {error} </span>) }
            <Button
                variant="contained"
                color="primary"
                className={classes.getGeocodingButton}
                onClick={() => getGeocodingAction()}
                disabled={isDisabledFetchGeo}
                disableElevation
            >
                位置情報を取得
            </Button>
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
