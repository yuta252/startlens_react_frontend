import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import MuiPagination from '@material-ui/lab/Pagination';

import { AppDispatch } from '../../../app/store';
import {
    fetchAsyncDeleteExhibit,
    fetchAsyncGetExhibits,
    selectExhibits,
    selectMultiExhibit,
    selectParams,
    selectPicture
} from './exhibitSlice';
import { READ_EXHIBIT } from '../../types';
import styles from './Exhibit.module.css';


const useStyles = makeStyles( (theme: Theme) => ({
    addExhibitButton: {
        width: "110px",
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2)
    },
    card: {
        padding: '12px'
    },
    media: {
        height: 250,
    },
    cardButton: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    pagination: {
        display: 'inline-block',
    }
}));

const Pagination = withStyles({
    root: {
        display: 'inline-block',
    },
})(MuiPagination);


const Exhibit: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    const dispatch: AppDispatch = useDispatch();
    const exhibits = useSelector(selectExhibits);
    const params = useSelector(selectParams);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [page, setPage] = useState(1);

    const handleOpenConfirm = () => {
        setOpenConfirm(true);
    }

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    }

    const displayExhibitAction = (exhibit: READ_EXHIBIT) => {
        dispatch(selectPicture({id: exhibit.id, pictures: exhibit.pictures}));
        dispatch(selectMultiExhibit(exhibit.multiExhibits));
        handleLink('/admin/exhibit/detail');
    }

    const deleteExhibitActin = async (exhibitId: number) => {
        await dispatch(fetchAsyncDeleteExhibit(exhibitId))
        handleCloseConfirm()
    }

    const getExhibitsPaginated = async (page: number) => {
        await dispatch(fetchAsyncGetExhibits(page));
        setPage(page);
    }

    return (
        <Grid container spacing={1}>
            <Grid container item>
                <Grid item md={12}>
                    <div className={styles.exhibit_list_header}>
                        <Typography variant="h6">アップロード画像</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            size="small"
                            className={classes.addExhibitButton}
                            component={Link}
                            to="/exhibit/new"
                            disableElevation
                        >
                            新規登録
                        </Button>
                    </div>
                    <Divider className={classes.divider}/>
                </Grid>
            </Grid>
            {exhibits[0]?.id ? (
                    <Grid container item>
                        {exhibits.map( (exhibit) => (
                            <Grid key={exhibit.id} item xs={12} lg={3} md={4} className={classes.card}>
                                <Card>
                                    <CardActionArea
                                        onClick={() => displayExhibitAction(exhibit)}
                                    >
                                        <CardMedia
                                            className={classes.media}
                                            image={exhibit.pictures[0]?.url}
                                            title="画像"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="subtitle1" component="h2" noWrap={true}>
                                                {exhibit.multiExhibits[0].name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p" noWrap={true}>
                                                {exhibit.multiExhibits[0].description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions className={classes.cardButton}>
                                        <Button size="small" color="primary" onClick={() => handleOpenConfirm()}>
                                            削除
                                        </Button>
                                    </CardActions>
                                </Card>
                                <Dialog
                                    open={openConfirm}
                                    onClose={handleCloseConfirm}
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
                                    <Button onClick={handleCloseConfirm} color="primary">
                                        キャンセル
                                    </Button>
                                    <Button onClick={() => deleteExhibitActin(exhibit.id)} color="primary" autoFocus>
                                        削除
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                         ) )}
                    </Grid>
            ) : (
                <div className={styles.exhibit_no_content}>
                    <span>投稿画像がありません</span><br/>
                    <span>新規登録から画像登録をお願いします</span>
                </div>
            )}
            <div className={styles.exhibit_pagination_wrapper}>
                <Pagination
                    className={classes.pagination}
                    count={params.last}
                    color="primary"
                    onChange={(e, page) => getExhibitsPaginated(page)}
                    page={page}
                />
            </div>
        </Grid>
    )
}

export default Exhibit
