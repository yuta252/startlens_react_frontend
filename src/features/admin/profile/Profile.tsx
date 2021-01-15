import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { makeStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Button,
    createStyles,
    Dialog,
    Divider,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { AppDispatch } from '../../../app/store';
import {
    editThumbnailImage,
    fetchAsyncUpdateThumbnail,
    selectEditedThumbnailImage,
    selectLoginUser,
    selectIsProfileEdited,
} from '../auth/authSlice';
import {
    selectIsDisplayed
} from './profileSlice';
import MultiProfileEdit from './MultiProfileEdit';
import MultiProfileDisplay from './MultiProfileDisplay';
import MultiProfileList from './MultiProfileList';
import ProfileEdit from './ProfileEdit';
import ProfileDisplay from './ProfileDisplay';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Profile.module.css';


const useStyles = makeStyles( (theme: Theme) => ({
    title: {
        fontWeight: theme.typography.fontWeightBold,
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2)
    },
    avatarContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        width: '200px',
        height: '200px',
    },
    editPictureButton: {
        width: "80px",
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
    uploadedAvatar: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.grey[500],
        width: '300px',
        height: '300px',
    },
}));

const styles = (theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        }
    });

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)( (props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


const Profile: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const editedThumbnailImage = useSelector(selectEditedThumbnailImage);
    const loginUser = useSelector(selectLoginUser);
    const isDisplayed = useSelector(selectIsDisplayed);
    const isProfileEdited = useSelector(selectIsProfileEdited);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleEditThumbnail = () => {
        const fileInput = document.getElementById("imageInput")
        fileInput?.click();
    };

    const handleUploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const THUMBNAIL_WIDTH = 500;
        const THUMBNAIL_HEIGHT = 500;

        const file: File = e.target.files![0];
        // validation: jpg and png format is permitted to upload as an image
        if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
            console.log("validation failed")
            return false;
        }
        // resize a image
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            console.log("reader onload")
            const image = new Image();
            image.onload = () => {
                console.log("image onload")
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
                console.log("encodedImage: ", encodedImage)
                dispatch(editThumbnailImage({ imageFile: encodedImage }))
            }
            image.src = e.target?.result as string;
        }
        reader.onerror = (error) => {
            console.log("error: cannot read any files");
        }
    };

    const handleSaveThumbnail = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const result = await dispatch(fetchAsyncUpdateThumbnail(editedThumbnailImage));
        if (fetchAsyncUpdateThumbnail.rejected.match(result)) {
            // TODO: エラーハンドリング
            console.log(result)
            return false
        }
        if (fetchAsyncUpdateThumbnail.fulfilled.match(result)) {
            // TODO: editedThumbnailImageを空にする
            console.log("thumbnail url: ", result)
            handleClose();
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid container item>
                <Grid item md={12}>
                    <div>
                        <Typography variant="h6">プロフィール情報</Typography>
                    </div>
                    <Divider className={classes.divider}/>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        <div>
                            <Typography>基本情報</Typography>
                        </div>
                        <div className={commonStyles.spacer__small} />
                        <Grid container item>
                            <Grid item md={4} className={classes.avatarContainer}>
                                { loginUser.profile.thumbnail.url ?
                                    (<Avatar variant="rounded" src={loginUser.profile.thumbnail.url} className={classes.avatar} alt="logo" />)
                                    : (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />) 
                                }
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpen}
                                    className={classes.editPictureButton}
                                    size="small"
                                    disableElevation
                                >
                                    編集
                                </Button>
                                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                        画像を編集する
                                    </DialogTitle>
                                    <DialogContent dividers>
                                        <Typography gutterBottom>
                                            ファイルのサイズが1Mより小さいjpg/jpeg, png画像ファイルを選び、アップロードしてください。
                                        </Typography>
                                        <div className={customStyles.thumbnail_edit_wrapper}>
                                            {editedThumbnailImage.imageFile ?
                                                <Avatar variant="rounded" src={editedThumbnailImage.imageFile} className={classes.uploadedAvatar} alt="logo" /> :
                                                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.uploadedAvatar} alt="logo" />
                                            }
                                        </div>
                                        <input
                                            type="file"
                                            id="imageInput"
                                            hidden={true}
                                            onChange={handleUploadThumbnail}
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button autoFocus onClick={handleEditThumbnail} color="primary">
                                            アップロード
                                        </Button>
                                        <Button onClick={handleSaveThumbnail} color="primary">
                                            保存
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </Grid>
                            <Grid item md={8}>
                                {isProfileEdited ? <ProfileEdit /> : <ProfileDisplay />}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container item>
                <Grid item md={12}>
                    <Paper className={classes.paper}>
                        <div>
                            <Typography>多言語情報</Typography>
                        </div>
                        <div className={commonStyles.spacer__small} />
                        <Grid container item>
                            <Grid item md={6}>
                                <MultiProfileList />
                            </Grid>
                            <Grid item md={6}>
                                { isDisplayed ? <MultiProfileDisplay /> : <MultiProfileEdit /> }
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Profile;