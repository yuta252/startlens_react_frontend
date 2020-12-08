import React from 'react'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../app/store';

const Profile: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    プロフィール
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Profile;