import React from 'react'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../app/store';
import Button from '@material-ui/core/Button';


const Dashboard: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();

    const getSiginIn = () => {
        window.location.href = '/signin';
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    ダッシュボード
                    <Button onClick={getSiginIn}>
                        サインインへ
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Dashboard;