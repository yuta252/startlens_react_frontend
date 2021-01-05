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
import IconButton from '@material-ui/core/IconButton';

import { langCategoryObj } from '../../app/constant';
import { selectMultiProfiles,
    selectEditedMultiProfile,
    selectSelectedMultiProfile,
    editMultiProfile,
    selectMultiProfile,
    initialState,
    fetchAsyncDeleteMultiProfile,
    handleDisplayStatus,
    selectIsDisplayed
} from './profileSlice';
import styles from './Profile.module.css';
import commonStyles from '../../assets/Style.module.css';
import { AppDispatch } from '../../app/store';
import { READ_MULTI_PROFILE } from '../types';


const useStyles = makeStyles( (theme: Theme) => ({
    addMultiProfileButton: {
        width: "110px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    langColumn: {
        width: '80px',
    },
    editColumn: {
        width: '80px',
    }
}));



const MultiProfileList: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const multiProfiles = useSelector(selectMultiProfiles)
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const showMultiProfile = (row: READ_MULTI_PROFILE) => {
        dispatch(handleDisplayStatus(true));
        dispatch(selectMultiProfile(row));
        dispatch(editMultiProfile(initialState.editedMultiProfile));
    }

    const createMultiProfile = () => {
        dispatch(handleDisplayStatus(false));
        dispatch(editMultiProfile(initialState.editedMultiProfile));
        dispatch(selectMultiProfile(initialState.selectedMultiProfile));
    }

    return (
        <div className={styles.multi_profile_list_wrapper}>
            <div className={styles.multi_profile_list_header}>
                <Typography variant="subtitle1">言語別プロフィール一覧</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    size="small"
                    className={classes.addMultiProfileButton}
                    onClick={
                        () => createMultiProfile()
                    }
                    disableElevation
                >
                    新規登録
                </Button>
            </div>
            <div className={commonStyles.spacer__small} />
            {multiProfiles[0]?.id ? (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.langColumn}>
                                <strong>言語</strong>
                            </TableCell>
                            <TableCell>
                                <strong>ユーザー名</strong>
                            </TableCell>
                            <TableCell className={classes.editColumn}></TableCell>
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
                                        className={styles.multi_profile_icon}
                                        onClick={() => {
                                            dispatch(editMultiProfile(row))
                                            dispatch(handleDisplayStatus(false))
                                        }}
                                    >
                                        <EditIcon />
                                    </button>
                                    <button
                                        className={styles.multi_profile_icon}
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
                <div className={styles.multi_profile_no_content}>
                    <span>登録情報はありません。</span>
                </div>
            )}
        </div>
    )
}

export default MultiProfileList
