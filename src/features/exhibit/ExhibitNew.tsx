import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Avatar, TextField, InputLabel, MenuItem, FormControl, Select, Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../app/store';
import { Typography } from '@material-ui/core';

import { fetchAsyncCreateExhibit } from './exhibitSlice';
import customStyles from './Exhibit.module.css';
import commonStyles from '../../assets/Style.module.css';
import { POST_EXHIBIT } from '../types';
import { langCategoryObj } from '../../app/constant';


function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles( (theme: Theme) => ({
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2)
    },
    uploadPictureButton: {
        width: "140px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    preview: {
        padding: '12px',
    },
    uploadedPictureAvatar: {
        backgroundColor: theme.palette.grey[500],
        width: '100%',
        height: '250px'
    },
    formControl: {
        minWidth: "180px",
    },
    saveExhibitButton: {
        width: "120px",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    cancelExhibitButton: {
        width: "120px",
        padding: theme.spacing(1),
        margin: theme.spacing(2),
        fontWeight: theme.typography.fontWeightBold,
    },
}));


const ExhibitNew: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const handleLink = (path: string) => history.push(path);
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [images, setImages] = useState<string[]>([]);
    const [inputPost, setInputPost] = useState({lang: "", name: "", description: ""})

    const isDisabled: boolean = (inputPost.lang.length === 0 || inputPost.name.length === 0 || 
                                inputPost.description.length === 0 || images.length === 0);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;
        setInputPost({...inputPost, [name]: value});
    };

    const handleSelectLangChange = (e: React.ChangeEvent< {value: unknown} >) => {
        const value = e.target.value as string;
        setInputPost({...inputPost, lang: value});
    };

    let langOptions = Object.keys(langCategoryObj).map( (key) => (
        <MenuItem key={key} value={key}>
            {langCategoryObj[key]}
        </MenuItem>
    ));

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
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
            console.log(file);
            console.log(file.name);
            console.log(file.type);
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
                    console.log("hight: ", height)
                    console.log("width: ", width)
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
        })
    }

    const createExhibitAction = async () => {
        const postData: POST_EXHIBIT = {...inputPost, imageFile: images}
        const result = await dispatch(fetchAsyncCreateExhibit(postData));
        if (fetchAsyncCreateExhibit.rejected.match(result)) {
            setOpen(true);
            return false
        }
        if (fetchAsyncCreateExhibit.fulfilled.match(result)) {
            handleLink('/exhibit');
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid container item>
                <Grid item md={12}>
                    <div>
                        <Typography variant="h6">新規投稿</Typography>
                    </div>
                    <Divider className={classes.divider}/>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        <Grid container>
                            {images.length > 0 && (
                                images.map( (image: string) => (
                                    <Grid item xs={12} lg={3} md={4} className={classes.preview}>
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
                        <div className={commonStyles.spacer__medium} />
                        <FormControl className={classes.formControl}>
                            <InputLabel id="category-select-label">カテゴリー名</InputLabel>
                            <Select
                                labelId="category-select-label"
                                name="lang"
                                onChange={handleSelectLangChange}
                            >
                                {langOptions}
                            </Select>
                        </FormControl>
                        <div className={commonStyles.spacer__medium} />
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="画像の名称"
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                        />
                        <div className={commonStyles.spacer__medium} />
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="画像の紹介文"
                            type="text"
                            name="description"
                            multiline
                            rows={5}
                            onChange={handleInputChange}
                        />
                        <div className={commonStyles.spacer__medium} />
                        <div className={customStyles.exhibit_edit_btn_wrapper}>
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.cancelExhibitButton}
                                component={Link}
                                to="/exhibit"
                                disableElevation
                            >
                                キャンセル
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.saveExhibitButton}
                                onClick={
                                    () => createExhibitAction()
                                }
                                disabled={isDisabled}
                                disableElevation
                            >
                                保存
                            </Button>
                            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                <Alert onClose={handleClose} severity="error">
                                    画像の投稿が失敗しました
                                </Alert>
                            </Snackbar>
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ExhibitNew
