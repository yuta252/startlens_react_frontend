import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Typography,
} from '@material-ui/core';

import customStyles from './Profile.module.css';
import commonStyles from '../../../assets/Style.module.css';
import { langCategoryObj } from '../../../app/constant';
import { selectSelectedMultiProfile } from './profileSlice';


const useStyles = makeStyles( (theme: Theme) => ({
    displayHeadColumn: {
        width: "120px",
    },
}));


const MultiProfileDisplay: React.FC = () => {
    const classes = useStyles();
    const selectedMultiProfile = useSelector(selectSelectedMultiProfile);

    return (
        <div className={customStyles.multi_profile_display_wrapper}>
            <Typography variant="subtitle1">言語プロフィール詳細</Typography>
            <div className={commonStyles.spacer__small} />
            {selectedMultiProfile.id ? (
                <div>
                    <Table>
                        <TableBody>
                            <TableRow key={"lang"}>
                                <TableCell className={classes.displayHeadColumn}>
                                    <strong>言語</strong>
                                </TableCell>
                                <TableCell>
                                    {langCategoryObj[selectedMultiProfile.lang]}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"username"}>
                                <TableCell>
                                    <strong>ユーザー名</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.username}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"addressPrefecture"}>
                                <TableCell>
                                    <strong>都道府県</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.addressPrefecture}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"addressCity"}>
                                <TableCell>
                                    <strong>市区町村</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.addressCity}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"addressStreet"}>
                                <TableCell>
                                    <strong>番地・建物名</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.addressStreet}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"entranceFee"}>
                                <TableCell>
                                    <strong>料金</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.entranceFee}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"businessHours"}>
                                <TableCell>
                                    <strong>営業時間</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.businessHours}
                                </TableCell>
                            </TableRow>
                            <TableRow key={"holiday"}>
                                <TableCell>
                                    <strong>休業日</strong>
                                </TableCell>
                                <TableCell>
                                    {selectedMultiProfile.businessHours}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className={customStyles.multi_profile_intro_wrapper}>
                        <strong>紹介文</strong>
                        <div>
                            <span>{selectedMultiProfile.selfIntro}</span>
                        </div>
                    </div>
                </div>
            ) :
                <div className={customStyles.multi_profile_no_content}>
                    <span>リストから選択してください。</span>
                </div>
            }
        </div>
    )
}

export default MultiProfileDisplay
