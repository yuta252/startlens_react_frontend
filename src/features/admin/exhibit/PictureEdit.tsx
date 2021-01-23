import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    CircularProgress,
    Grid,
    Snackbar
} from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import { AppDispatch } from '../../../app/store';
import {
    changeDisplay,
    fetchAsyncUpdatePicture,
    selectSelectedPicture,
} from './exhibitSlice';
import customStyles from './Exhibit.module.css';
import commonStyles from '../../../assets/Style.module.css';
import { POST_PICTURE } from '../../types';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles( (theme: Theme) => ({
    preview: {
        padding: '12px',
    },
    uploadedPictureAvatar: {
        backgroundColor: theme.palette.grey[500],
        width: '100%',
        height: '250px'
    },
    uploadPictureButton: {
        width: "140px",
        color: "white",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
    cancelExhibitButton: {
        width: "120px",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
    saveExhibitButton: {
        width: "120px",
        color: "white",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold
    }
}));

const PictureEdit: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const selectedPicture = useSelector(selectSelectedPicture);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);
    const [message, setMessage] = useState<{type: "success" | "error", message: string}>({type: "success", message: ""});
    const [images, setImages] = useState<string[]>([]);

    const isDisabled: boolean = (images.length === 0);

    const handleMessageClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackOpen(false);
    }

    const uploadPictureAction = () => {
        const fileInput = document.getElementById("exhibitImageInput")
        fileInput?.click();
    };

    const handleUploadPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        const THUMBNAIL_WIDTH = 500;
        const THUMBNAIL_HEIGHT = 500;

        const fileList: FileList = e.target.files!;
        // convert from fileList to Array list
        const files: File[] = Array.from(fileList);
        files.map( (file: File) => {
            // validation: jpg and png format is permitted to upload as an image
            if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
                console.log("validation failed")
                return false;
            }
            // resize a image
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                const image = new Image();
                image.onload = () => {
                    let width = image.width;
                    let height = image.height;
                    if (width > height) {
                        // the length of width is longer than the one of height, adjust to the length of height
                        width = THUMBNAIL_WIDTH;
                        height = Math.round(THUMBNAIL_WIDTH * height / width);
                    } else {
                        width = Math.round(THUMBNAIL_HEIGHT * width / height );
                        height = THUMBNAIL_HEIGHT;
                    }
                    let canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    let ctx = canvas.getContext('2d');
                    ctx?.drawImage(image, 0, 0, width, height);
                    const encodedImage = ctx?.canvas.toDataURL(file.type) as string;
                    // hold the previous data and push a new data
                    setImages((prevState => [...prevState, encodedImage]))
                }
                image.src = e.target?.result as string;
            }
            reader.onerror = (error) => {
                console.log("error: cannot read any files");
            }
            return false;
        })
    }

    const savePictureAction = async () => {
        const updateData: POST_PICTURE = {exhibitId: selectedPicture.id, imageFile: images}
        setLoading(true);
        setDisabled(true);
        const result = await dispatch(fetchAsyncUpdatePicture(updateData));
        if (fetchAsyncUpdatePicture.rejected.match(result)) {
            setLoading(false);
            setDisabled(false);
            setMessage({type: "error", message: "投稿に失敗しました" });
            setSnackOpen(true);
            return false
        }
        if (fetchAsyncUpdatePicture.fulfilled.match(result)) {
            setLoading(false);
            setDisabled(false);
            setMessage({type: "success", message: "投稿に成功しました" });
            setSnackOpen(true);
            setImages([]);
        }
    }

    return (
        <>
            {loading && (
                <div className={customStyles.thumbnail_loading}>
                    <CircularProgress />
                </div>
            )}
            <Grid container>
                {images.length > 0 && (
                    images.map( (image: string, index: number) => (
                        <Grid key={index} item xs={12} lg={3} md={4} className={classes.preview}>
                            <Avatar variant="rounded" src={image} className={classes.uploadedPictureAvatar} alt="picture" />
                        </Grid>
                        )
                    )
                )}
            </Grid>
            <input
                type="file"
                id="exhibitImageInput"
                hidden={true}
                multiple
                onChange={handleUploadPicture}
            />
            <div className={commonStyles.spacer__small} />
            <div className={customStyles.exhibit_edit_btn_wrapper}>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.cancelExhibitButton}
                    onClick={() => dispatch(changeDisplay(true))}
                    disableElevation
                >
                    キャンセル
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={uploadPictureAction}
                    className={classes.uploadPictureButton}
                    size="small"
                    disableElevation
                >
                    画像アップロード
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.saveExhibitButton}
                    onClick={
                        () => savePictureAction()
                    }
                    disabled={isDisabled || disabled}
                    disableElevation
                >
                    保存
                </Button>
                <Snackbar open={snackOpen} autoHideDuration={6000} onClose={handleMessageClose}>
                    <Alert onClose={handleMessageClose} severity={message.type}>
                        {message.message}
                    </Alert>
                </Snackbar>
            </div>
        </>
    )
}

export default PictureEdit