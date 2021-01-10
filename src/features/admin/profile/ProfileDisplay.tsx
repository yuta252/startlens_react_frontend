import React from 'react'
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";

import customStyles from './Profile.module.css';
import { AppDispatch } from '../../../app/store';
import {
    editProfile,
    selectLoginUser,
    toggleProfileEdit
} from "../auth/authSlice";
import { POST_PROFILE } from '../../types';
import { majorCategoryObj } from '../../../app/constant';


const useStyles = makeStyles( (theme: Theme) => ({
    editButton: {
        width: "150px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
}));


const ProfileDisplay: React.FC = () => {
    const classes = useStyles();
    const loginUser = useSelector(selectLoginUser);
    const dispatch: AppDispatch = useDispatch();

    const editProfileData: POST_PROFILE = {
        majorCategory: loginUser.profile.majorCategory,
        telephone: loginUser.profile.telephone,
        companySite: loginUser.profile.companySite,
    };

    const editProfileAction = () => {
        dispatch(editProfile(editProfileData));
        dispatch(toggleProfileEdit());
    }

    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th className={customStyles.basic_profile_th}>カテゴリー</th>
                            <td className={customStyles.basic_profile_td}>{majorCategoryObj[loginUser.profile.majorCategory]}</td>
                        </tr>
                        <tr>
                            <th className={customStyles.basic_profile_th}>電話番号</th>
                            <td className={customStyles.basic_profile_td}>{loginUser.profile.telephone ? loginUser.profile.telephone : "登録されていません"}</td>
                        </tr>
                        <tr>
                            <th className={customStyles.basic_profile_th}>ホームページ</th>
                            <td className={customStyles.basic_profile_td}>{loginUser.profile.companySite ? loginUser.profile.companySite : "登録されていません"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={customStyles.basic_edit_btn_wrapper}>
                <Button
                    variant="contained"
                    fullWidth
                    type="submit"
                    color="primary"
                    className={classes.editButton}
                    onClick={editProfileAction}
                    size="small"
                    disableElevation
                >
                    プロフィール編集
                </Button>
            </div>
        </>
    )
}

export default ProfileDisplay
