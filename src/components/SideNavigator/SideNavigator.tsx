import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import { Link, NavLink } from 'react-router-dom';



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
                <NavLink exact to="/dashboard" className={classes.link}>
                    <ListItem
                        button
                        selected={selectedIndex === 0}
                        key={'Dashboard'}
                        onClick={() => handleListItemClick(0)}
                    >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={'ダッシュボード'} />
                    </ListItem>
                </NavLink>
                <NavLink exact to="/exhibit" className={classes.link}>
                    <ListItem 
                        button
                        selected={selectedIndex === 1}
                        key={'Image'}
                        onClick={() => handleListItemClick(1)}
                    >
                        <ListItemIcon><CropOriginalIcon /></ListItemIcon>
                        <ListItemText primary={'画像アップロード'} />
                    </ListItem>
                </NavLink>
                <NavLink exact to="/profile" className={classes.link}>
                    <ListItem
                        button
                        selected={selectedIndex === 2}
                        key={'Profile'}
                        onClick={() => handleListItemClick(2)}
                    >
                        <ListItemIcon><PersonIcon /></ListItemIcon>
                        <ListItemText primary={'プロフィール'} />
                    </ListItem>
                </NavLink>
            </List>

        </Drawer>
    )
}

export default SideNavigator;
