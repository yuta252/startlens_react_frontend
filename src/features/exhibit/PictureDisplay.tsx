import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Avatar } from '@material-ui/core';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../app/store';
import {
    selectSelectedPicture,
    changeDisplay
} from './exhibitSlice';
import customStyles from './Exhibit.module.css';
import commonStyles from '../../assets/Style.module.css';
import { PICTURE } from '../types';

const useStyles = makeStyles( (theme: Theme) => ({
    preview: {
        padding: '12px',
    },
    displayedPictureAvatar: {
        backgroundColor: theme.palette.grey[500],
        width: '100%',
        height: '250px'
    },
    uploadPictureButton: {
        width: "140px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
}));

const PictureDisplay: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const selectedPicture = useSelector(selectSelectedPicture);
    return (
        <>
            <Grid container>
                {selectedPicture.pictures.length > 0 && (
                    selectedPicture.pictures.map( (picture: PICTURE) => (
                        <Grid key={picture.id} item xs={12} lg={3} md={4} className={classes.preview}>
                            <Avatar variant="rounded" src={picture.url} className={classes.displayedPictureAvatar} alt="picture" />
                        </Grid>
                        )
                    )
                )}
            </Grid>
            <div className={commonStyles.spacer__small} />
            <div className={customStyles.exhibit_edit_btn_wrapper}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(changeDisplay(false))}
                    className={classes.uploadPictureButton}
                    size="small"
                    disableElevation
                >
                    画像編集
                </Button>
            </div>
        </>
    )
}

export default PictureDisplay
