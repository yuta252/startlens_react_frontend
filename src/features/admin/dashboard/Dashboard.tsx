import React from 'react';

import {
    Button,
    Grid,
    Paper
} from '@material-ui/core';


const Dashboard: React.FC = () => {

    const getSignIn = () => {
        window.location.href = '/admin/signin';
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Paper>
                    ダッシュボード
                    <Button onClick={getSignIn}>
                        サインインへ
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Dashboard;