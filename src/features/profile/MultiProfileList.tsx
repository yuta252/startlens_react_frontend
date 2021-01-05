import React, { useState } from 'react'

import { Typography } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { langCategoryObj } from '../../app/constant';
import { selectMultiProfiles, selectEditedMultiProfile, selectSelectedMultiProfile, editMultiProfile, selectedMultiProfile, initialState, fetchAsyncDeleteMultiProfile } from './profileSlice';
import { AppDispatch } from '../../app/store';
import { READ_MULTI_PROFILE } from '../types';


const useStyles = makeStyles( (theme: Theme) => ({
    addMultiProfileButton: {
        width: "80px",
        padding: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
}));



const MultiProfileList: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const multiProfiles = useSelector(selectMultiProfiles)
    const columns = multiProfiles[0] && Object.keys(multiProfiles[0]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const showMultiProfile = (row: READ_MULTI_PROFILE) => {
        dispatch(selectedMultiProfile(row));
        dispatch(editMultiProfile(initialState.editedMultiProfile));
    }

    return (
        <>
            <div>
                <Typography variant="h5">言語別プロフィール一覧</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    className={classes.addMultiProfileButton}
                    disableElevation
                >
                    登録
                </Button>
            </div>
            {multiProfiles[0]?.id ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>言語</strong>
                            </TableCell>
                            <TableCell>
                                <strong>ユーザー名</strong>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {multiProfiles.map( (row, rowIndex) =>
                            <TableRow hover key={rowIndex}>
                                <TableCell
                                    align="left"
                                    key={`${rowIndex}+${row.lang}`}
                                    onClick={() => showMultiProfile(row)}
                                >
                                    <span>{langCategoryObj[row.lang] ? langCategoryObj[row.lang] : "該当なし"}</span>
                                </TableCell>
                                <TableCell
                                    align="left"
                                    key={`${rowIndex}+${row.username}`}
                                    onClick={() => showMultiProfile(row)}
                                >
                                    <span>{row.username}</span>
                                </TableCell>
                                <TableCell align="center">
                                    <button
                                        onClick={() => dispatch(editMultiProfile(row))}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        onClick={() => handleOpen()}
                                    >
                                        <DeleteIcon />
                                    </button>
                                    <Dialog
                                        open={open}
                                        onClose={handleClose}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">{"登録情報を本当に削除しますか？"}</DialogTitle>
                                        <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            登録情報を削除する場合は削除ボタンを押してください。
                                        </DialogContentText>
                                        </DialogContent>
                                        <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            キャンセル
                                        </Button>
                                        <Button onClick={() => dispatch(fetchAsyncDeleteMultiProfile(row.id))} color="primary" autoFocus>
                                            削除
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            ) : (
                <div>
                    <span>登録情報はありません。</span>
                </div>
            )}

        </>
    )
}

export default MultiProfileList
