import React, {useCallback, useEffect, useState} from 'react';
import Link from 'next/link';
/*
    material - ui
 */
import clsx from 'clsx';
import {createMuiTheme, makeStyles, useTheme, fade, withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
/*
    material - ui
 */

import {useDispatch, useSelector} from "react-redux";
import {CHANGE_CURRENTPAGE_REQUEST, LOAD_USERS_REQUEST, LOG_OUT_REQUEST} from "../reducers/user";
import Main from "./Main";
import {useRouter} from "next/router";
import {Button, Grid, MenuItem, NativeSelect, Select, TextField} from "@material-ui/core";
import {LOAD_DIARY_REQUEST} from "../reducers/diary";
import editPage from "../pages/editDiary";
import Autocomplete from "@material-ui/lab/Autocomplete";

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
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));



const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 13,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const AppLayout = ({ children }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {currentPage, defaultPage, users} = useSelector(state => state.user);
    const [pageName, setPageName] = useState('');
    //사용자가 어느 페이지에서 접속할지 모르기 때문에 공통 레이아웃으로 뺌
    const {loginUser, isLoggingOut} = useSelector(state => state.user);
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [searchOption, setSearchOption] = useState('');
    const [autocompleteText, setAutocompleteText] = useState('');


    useEffect(() => {
        if(defaultPage.includes(currentPage)){
            setPageName('');
        }
        if(currentPage === 'Main Page'){
            setValue(0);
        } else if(currentPage === 'Write Page'){
            setValue(1);
        } else if(currentPage === 'User Page'){
            setValue(2);
        } else{
            setValue(3);
            setPageName(currentPage);
        }
    }, [currentPage]);

    const nameFilterOptions = createFilterOptions({
        matchFrom: 'start',
        startAfter: 1,
    });
    const emailFilterOptions = createFilterOptions({
        matchFrom: 'start',
        startAfter: 2,
    });
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
    const onClickUserPage = () => {
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
    const onChangeSearchOption = (e) => {
        dispatch({
            type: LOAD_USERS_REQUEST,
        });
        if(parseInt(e.target.value) == 1){
            setSearchOption('email');
        } else if(parseInt(e.target.value) === 2){
            setSearchOption('name');
        } else if(parseInt(e.target.value) === 3){
            setSearchOption('hash');
        } else{
            setSearchOption('');
        }
    };

    const onSelect = () => {
        console.log('onSelect');
    }
    const onClose = () => {
        if(!users.map(v => v.userName).includes(autocompleteText) || autocompleteText.trim() === ''){
            return;
        }
        console.log('하하');
    }
    const onChangeAutocompleteText = (e) => {
        console.log(e.target.value);
        setAutocompleteText(e.target.value);
    }
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
                            <IconButton variant="h6" onClick={onClickMainPage} style={{}}>
                                Card Diary
                            </IconButton>
                            <Tabs value={value} onChange={handleChange} aria-label="Menu">
                                <Tab label="Main" onClick={onClickMainPage}/>
                                <Tab label="Write" onClick={onClickWritePage}/>
                                <Tab label="User Page" onClick={onClickUserPage}/>
                                {pageName && <Tab label={pageName} />}
                                <Tab label="Log Out" onClick={onLogOut}/>
                            </Tabs>
                            <NativeSelect
                                id="demo-customized-select-native"
                                // value={age}
                                onChange={onChangeSearchOption}
                                input={<BootstrapInput />}
                                style={{marginLeft:'10px', marginRight:'10px' }}
                            >
                                <option>검색조건</option>
                                <option value={1}>이메일검색</option>
                                <option value={2}>이름검색</option>
                                <option value={3}>해시태그검색</option>
                            </NativeSelect>
                            {
                                searchOption === 'name'
                                    ?
                                    <Autocomplete
                                        // onClose={onClose}
                                        // onOpen={onSelect}
                                        blurOnSelect={true}
                                        filterOptions={nameFilterOptions}
                                        id="free-solo-2-demo"
                                        style={{height:'30px'}}
                                        disableClearable
                                        options={users.map((option) => option.userName)}
                                        renderInput={(params) => (
                                            <TextField
                                                onChange={onChangeAutocompleteText}
                                                value={autocompleteText}
                                                {...params}
                                                label="Search"
                                                InputProps={{ ...params.InputProps, type: 'search'}}
                                                style={{width:'200px', height:'30px', marginTop:'-15px'}}
                                            />
                                        )}
                                    />
                                    :
                                    searchOption === 'email'
                                        ?
                                        <Autocomplete

                                            freeSolo
                                            filterOptions={emailFilterOptions}
                                            id="free-solo-2-demo"
                                            style={{height:'30px'}}
                                            disableClearable
                                            options={users.map((option, i) => option.email)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Search"
                                                    InputProps={{ ...params.InputProps, type: 'search' }}
                                                    style={{width:'200px', height:'30px', marginTop:'-15px'}}

                                                />
                                            )}
                                        />
                                        :
                                        searchOption === 'hash'
                                            ?
                                            <TextField
                                                label="Search"
                                                style={{width:'200px', height:'30px', marginTop:'-30px'}}

                                            />
                                            :
                                            <TextField
                                                label="Search"
                                                style={{width:'200px', height:'30px', marginTop:'-30px'}}
                                            />
                            }

                        </Toolbar>
                    </AppBar>
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

AppLayout.getInitialProps = async (context) => {

}

export default AppLayout;
