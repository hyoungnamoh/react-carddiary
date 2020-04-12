import React, {useCallback, useEffect, useState} from 'react';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { ThemeProvider } from '@material-ui/core/styles';
/*
    material - ui
 */

import {useDispatch, useSelector} from "react-redux";
import {CHANGE_CURRENTPAGE_REQUEST, LOG_OUT_REQUEST} from "../reducers/user";
import Main from "./Main";
import {useRouter} from "next/router";
import {Button, Grid} from "@material-ui/core";
import {LOAD_DIARY_REQUEST} from "../reducers/diary";
import editPage from "../pages/editDiary";

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
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
}));

const AppLayout = ({ children }) => {


    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const {currentPage, defaultPage} = useSelector(state => state.user);
    const [pageName, setPageName] = useState('');
    console.log('currentPage',currentPage);
    
    //사용자가 어느 페이지에서 접속할지 모르기 때문에 공통 레이아웃으로 뺌
    const {loginUser, isLoggingOut} = useSelector(state => state.user);
    const router = useRouter();
    useEffect(() => {
        if(defaultPage.includes(currentPage)){
            setPageName('');
        }
        if(currentPage === 'Main Page'){
            setValue(0);
        } else if(currentPage === 'Diary Writing Page'){
            setValue(1);
        } else if(currentPage === 'My Page'){
            setValue(2);
        } else{
            setValue(3);
            setPageName(currentPage);
        }
    }, [currentPage]);

    //로그아웃 버튼
    const onLogOut = useCallback(() => {
        dispatch({
            type:LOG_OUT_REQUEST,
        });
    }, [loginUser]);

    //작성페이지 이동
    const onClickWritePage = () => {
        dispatch({
            type: CHANGE_CURRENTPAGE_REQUEST,
            data: '',
        });
        router.push("/write");
    }
    //글목록 이동
    const onClickMyPage = () => {
        dispatch({
            type: CHANGE_CURRENTPAGE_REQUEST,
            data: '',
        });
        router.push(`/user`);
    }

    //로고, 메인화면 이동
    const onClickMainPage = () => {
        dispatch({
            type: CHANGE_CURRENTPAGE_REQUEST,
            data: '',
        });
        router.push("/main");
    }

    const onClick1 = () => {
        router.push("/cardDiaryDetails");
    }
    const onClick2 = () => {
        router.push("/practice");
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {

        setValue(newValue);
    };
    return (
        <>
            {loginUser ?
                <div className={classes.root}>
                    <CssBaseline />
                        <AppBar
                            position="fixed"
                            className={clsx(classes.appBar, {
                                [classes.appBarShift]: open,
                            })}
                            color="default"
                            style={{alignItems:"center"}}
                        >
                            <Toolbar >
                                {/*<IconButton*/}
                                {/*    color="inherit"*/}
                                {/*    aria-label="open drawer"*/}
                                {/*    onClick={handleDrawerOpen}*/}
                                {/*    edge="start"*/}
                                {/*    className={clsx(classes.menuButton, {*/}
                                {/*        [classes.hide]: open,*/}
                                {/*    })}*/}
                                {/*>*/}
                                {/*    <MenuIcon />*/}
                                {/*</IconButton>*/}
                                <IconButton variant="h6" onClick={onClickMainPage} style={{marginLeft:'-50%', marginRight:'50%'}}>
                                    Card Diary
                                </IconButton>

                                <Tabs value={value} onChange={handleChange} aria-label="Menu">
                                    <Tab label="Main" onClick={onClickMainPage}/>
                                    <Tab label="Diary Writing" onClick={onClickWritePage}/>
                                    <Tab label="My Page" onClick={onClickMyPage}/>
                                    <Tab label={pageName} />
                                </Tabs>
                                <Button style={{float:"right"}} color="inherit" type="button"  onClick={onLogOut}>로그아웃</Button>
                            </Toolbar>
                        </AppBar>
                        {/*<TabPanel value={value} index={0}>*/}
                        {/*    Item One*/}
                        {/*</TabPanel>*/}
                        {/*<TabPanel value={value} index={1}>*/}
                        {/*    Item Two*/}
                        {/*</TabPanel>*/}
                        {/*<TabPanel value={value} index={2}>*/}
                        {/*    Item Three*/}
                        {/*</TabPanel>*/}
                    <Grid container>
                            <main className={classes.content}>
                                <div className={classes.toolbar} />
                                {children}
                            </main>
                    </Grid>
                </div>
            :
                <div>
                  {children}
                </div>
           }
        </>
    );
};

AppLayout.getInitialProps = async (context) => {

}

export default AppLayout;