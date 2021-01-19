import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import CountUp from 'react-countup';

import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    ListItemText,
    MenuItem,
    Paper,
    Typography
} from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';

import Visitors from './components/Visitors';
import SexChart from './components/Sex';
import BirthChart from './components/Birth';
import CountryChart from './components/Country';
import {
    fetchAsyncGetStatistics,
    selectDuration,
    selectVisitors
} from './dashboardSlice';
import { AppDispatch } from '../../../app/store';
import commonStyles from '../../../assets/Style.module.css';
import customStyles from './Dashboard.module.css';
import { durationCategory } from '../../../app/constant';


const useStyles = makeStyles( (theme: Theme) => ({
    changeDurationButton: {
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
    barContent: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(0)
    },
    doughnutContent: {
        padding: theme.spacing(0, 1),
        margin: theme.spacing(1, 0)
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const Dashboard: React.FC = () => {
    const classes = useStyles();
    const dispatch: AppDispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const duration: number = useSelector(selectDuration);
    const visitors = useSelector(selectVisitors);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const fetchStatisticsData = async (duration: number) => {
        const result = await dispatch(fetchAsyncGetStatistics(duration));
        if (fetchAsyncGetStatistics.rejected.match(result)) {
            console.log("fetchStaticData error happened.")
            handleClose();
            return false
        }
        if (fetchAsyncGetStatistics.fulfilled.match(result)) {
            console.log("fetchStaticData success.")
            handleClose();
        }

    }

    const sumVisitors = () => {
        return Object.values(visitors).reduce( (prev, current) => prev + current, 0);
    }

    const getDateToday = () => {
        const today = new Date();
        const month = ("0" + (today.getMonth() + 1)).slice(-2)
        const date = ("0" + (today.getDate())).slice(-2)
        const formattedDate = today.getFullYear() + "-" + month + "-" + date
        return String(formattedDate)
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <div className={customStyles.dashboard_title_wrapper}>
                    <Typography variant="h6">ダッシュボード</Typography>
                    <Button
                        aria-controls="customized-menu"
                        aria-haspopup="true"
                        variant="contained"
                        color="primary"
                        className={classes.changeDurationButton}
                        onClick={handleClick}
                        disableElevation
                    >
                        {durationCategory[duration]}
                    </Button>
                    <StyledMenu
                        id="customized-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => fetchStatisticsData(1)}>
                            <ListItemText primary="今日" />
                        </MenuItem>
                        <MenuItem onClick={() => fetchStatisticsData(2)}>
                            <ListItemText primary="過去1週間" />
                        </MenuItem>
                        <MenuItem onClick={() => fetchStatisticsData(3)}>
                            <ListItemText primary="過去1ヶ月" />
                        </MenuItem>
                        <MenuItem onClick={() => fetchStatisticsData(4)}>
                            <ListItemText primary="過去1年" />
                        </MenuItem>
                    </StyledMenu>
                </div>
                <Divider className={classes.divider}/>
            </Grid>
            <Grid container item>
                <Grid item xs={12} md={3} component={Card} className={customStyles.all_visitors_content}>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" gutterBottom>{durationCategory[duration]}の来場者数（人）</Typography>
                        <Typography variant="h5">
                            <CountUp
                                start={0}
                                end={sumVisitors()}
                                duration={1.5}
                                separator=","
                            />
                        </Typography>
                    </CardContent>
                </Grid>
                {visitors[getDateToday()] && duration !== 1 && (
                    <Grid item xs={12} md={3} component={Card} className={customStyles.today_visitors_content}>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" gutterBottom>今日の来場者数（人）</Typography>
                            <Typography variant="h5">
                                <CountUp
                                    start={0}
                                    end={visitors[getDateToday()]}
                                    duration={1.5}
                                    separator=","
                                />
                            </Typography>
                        </CardContent>
                    </Grid>
                )}
            </Grid>
            <Grid container item className={classes.barContent}>
                <Grid item xs={8} component={Card}>
                    <Visitors />
                </Grid>
            </Grid>
            <Grid container item className={classes.barContent}>
                <Grid item xs={12} md={4} className={classes.doughnutContent}>
                    <Paper>
                        <SexChart/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} className={classes.doughnutContent}>
                    <Paper>
                        <BirthChart/>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} className={classes.doughnutContent}>
                    <Paper>
                        <CountryChart/>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default Dashboard;