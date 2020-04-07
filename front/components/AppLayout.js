import React, {useCallback, useEffect} from 'react';
import Link from 'next/link';
/*
    material - ui
 */
import clsx from 'clsx';
import {createMuiTheme, makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { ThemeProvider } from '@material-ui/core/styles';
/*
    material - ui
 */

import {useDispatch, useSelector} from "react-redux";
import {LOG_OUT_REQUEST} from "../reducers/user";
import Main from "./main";
import {useRouter} from "next/router";
import {Button} from "@material-ui/core";

const drawerWidth = 240;

//AppBar 색 변경
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#bbdefb',
        },
        secondary: {
            main: '#f8bbd0',
        },
    },
});

//메인 스타일
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const AppLayout = ({ children }) => {


    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    //사용자가 어느 페이지에서 접속할지 모르기 때문에 공통 레이아웃으로 뺌
    const { loginUser } = useSelector(state => state.user);
    const router = useRouter();

    // //
    // if(!loginUser){
    //     router.push("/");
    // }

    //디스패치
    const dispatch = useDispatch();

    //로그아웃 버튼
    const onLogOut = useCallback(() => {
        //로그아웃 하시겠습니까? 추가
        dispatch({
            type:LOG_OUT_REQUEST,
        });
        router.push('/');
    }, []);

    //작성페이지 이동
    const onClickWritePage = () => {
        router.push("/write");
    }
    //글목록 이동
    const onClickDiaryListPage = () => {
        router.push(`/user`);
    }

    //로고, 메인화면 이동
    const onClickLogo = () => {
        router.push("/");
    }

    const onClick1 = () => {
        router.push("/cardDiaryDetails");
    }
    const onClick2 = () => {
        router.push("/practice");
    }
    return (
        <>
            {loginUser ?
                <div className={classes.root}>
                    <CssBaseline />
                    <ThemeProvider theme={theme}>
                        <AppBar
                            position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}
                        >
                            <Toolbar>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <IconButton variant="h6" onClick={onClickLogo}>
                                    Card Diary
                                </IconButton>
                                {/*<input type="button" onClick={onLogOut} value="로그아웃"/>*/}
                                <Button style={{float:"right"}} color="inherit" type="button"  onClick={onLogOut}>로그아웃</Button>
                            </Toolbar>
                        </AppBar>
                    </ThemeProvider>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                            </IconButton>
                        </div>
                        <Divider />
                        <List>
                            <ListItem button key="write" onClick={onClickWritePage}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="작성하기" />
                            </ListItem>
                            <ListItem button key="diaryList" onClick={onClickDiaryListPage}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="글 목록" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            <ListItem button key="onClick1" onClick={onClick1}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="글 목록" />
                            </ListItem>
                            <ListItem button key="onClick2" onClick={onClick2}>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary="글 목록" />
                            </ListItem>
                        </List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes.toolbar} />
                        {children}
                    </main>
                </div>
            :
                <div>
                  {children}
                </div>
           }
        </>
    );
};

export default AppLayout;