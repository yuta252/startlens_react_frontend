import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
    Avatar,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';


const drawerWidth = 240;

const useStyles = makeStyles( (theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    toolbarTitle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: "0 14px",
        ...theme.mixins.toolbar,
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
        color: theme.palette.primary.main,
        paddingLeft: "8px"
    },
    titleLink: {
        textDecoration: 'none',
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.text.secondary
    },
}));

const StyledListItem = withStyles( (theme) => ({
    selected: {
        '& .MuiListItemIcon-root': {
            color: theme.palette.primary.main
        }
    }
}))(ListItem);


const SideNavigator: React.FC = () => {
    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleListItemClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <div className={classes.toolbarTitle}>
                <Avatar variant="rounded" src={`${process.env.PUBLIC_URL}/assets/AppIcon_1024_1024.png`} alt="logo" />
                <Link to="./dashboard" className={classes.titleLink} onClick={() => handleListItemClick(0)}>
                    <Typography variant="h5" className={classes.title}>
                        Startlens
                    </Typography>
                </Link>
            </div>
            <Divider />
            <List>
                <NavLink exact to="/admin/dashboard" className={classes.link}>
                    <StyledListItem
                        button
                        selected={selectedIndex === 0}
                        key={'Dashboard'}
                        onClick={() => handleListItemClick(0)}
                    >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'ダッシュボード'} />
                    </StyledListItem>
                </NavLink>
                <NavLink exact to="/admin/exhibit" className={classes.link}>
                    <StyledListItem
                        button
                        selected={selectedIndex === 1}
                        key={'Image'}
                        onClick={() => handleListItemClick(1)}
                    >
                        <ListItemIcon><CropOriginalIcon /></ListItemIcon>
                        <ListItemText primary={'画像アップロード'} />
                    </StyledListItem>
                </NavLink>
                <NavLink exact to="/admin/profile" className={classes.link}>
                    <StyledListItem
                        button
                        selected={selectedIndex === 2}
                        key={'Profile'}
                        onClick={() => handleListItemClick(2)}
                    >
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary={'プロフィール'} />
                    </StyledListItem>
                </NavLink>
            </List>

        </Drawer>
    )
}

export default SideNavigator;
