import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles';
import { TextField, Button, Avatar, Link } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from '../../app/store';
import { Typography } from '@material-ui/core';

import styles from './Profile.module.css';
import { selectLoginUser, selectIsProfileEdited } from '../auth/authSlice';
import ProfileDisplay from './ProfileDisplay';
import ProfileEdit from './ProfileEdit';


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
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
    editButton: {
        width: "150px",
        padding: theme.spacing(1),
        color: "white",
        fontWeight: theme.typography.fontWeightBold,
    },
}));


const Profile: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();
    const loginUser = useSelector(selectLoginUser);
    const isProfileEdited = useSelector(selectIsProfileEdited);

    

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
                        <Grid container item>
                            <Grid item md={4} className={classes.avatarContainer}>
                                { loginUser.profile.thumbnail.url ?
                                    (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />)
                                    : (<Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} className={classes.avatar} alt="logo" />) 
                                }
                            </Grid>
                            <Grid item md={8}>
                                {isProfileEdited ? <ProfileEdit /> : <ProfileDisplay />}
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Profile;