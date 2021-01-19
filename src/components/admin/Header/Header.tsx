import React, { useState } from 'react';

import { makeStyles, Theme, withStyles } from '@material-ui/core/styles';
import {
    Avatar,
    AppBar,
    Badge,
    Button,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Toolbar
} from '@material-ui/core';
import Menu, { MenuProps } from '@material-ui/core/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        backgroundColor: "#fff",
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    toolBar: {
        paddingRight: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconButtons: {
        margin: '0 0 0 auto'
    }
}));

const StyleBadge = withStyles( (theme) => ({
    badge: {
        backgroundColor: "#44b700",
        color: "#44b700",
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation: "$ripple 1.2s infinite ease-in-out",
            border: "1px solid currentColor",
            content: '""',
        },
    },
    "@keyframes ripple": {
        "0%": {
            transform: "scale(.8)",
            opacity: 1,
        },
        "100%": {
            transform: "scale(2.4)",
            opacity: 0,
        },
    },
}))(Badge);

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


const Header: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const classes = useStyles();
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const logout = () => {
        localStorage.removeItem("startlensAdminJWT");
        window.location.href = "/admin/signin";
    }

    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <Button
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <StyleBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}
                        variant="dot"
                    >
                        <Avatar alt="user" src={`${process.env.PUBLIC_URL}/assets/meijijingu.png`} /> {" "}
                    </StyleBadge>
                </Button>
                <StyledMenu
                    id="customized-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={logout}>
                        <ListItemIcon>
                            <ExitToAppIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </MenuItem>

                </StyledMenu>
            </Toolbar>
        </AppBar>
    )
}

export default Header
