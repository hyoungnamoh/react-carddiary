import React, {useCallback, useEffect, useRef, useState} from 'react';
import Link from 'next/link';
/*
    material - ui
 */
import clsx from 'clsx';
import {createMuiTheme, makeStyles, useTheme, fade, withStyles } from '@material-ui/core/styles';
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
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
/*
    material - ui
 */

import {useDispatch, useSelector} from "react-redux";
import {
    CHANGE_CURRENTPAGE_REQUEST,
    LOG_OUT_REQUEST,
    SEARCH_EMAIL_REQUEST,
    SEARCH_HASHTAG_REQUEST
} from "../reducers/user";
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            // marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(2, 1, 1, 0),
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
    margin: {
        margin: theme.spacing(1),
        // marginRight:0,
    },
}));


const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        marginTop: 5,
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 14,
        padding: '5px 5px 5px 5px',
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
    const [open, setOpen] = useState(false);
    const {currentPage, defaultPage, isSearching, searchResult, searchError} = useSelector(state => state.user);
    const [pageName, setPageName] = useState('');
    const [value, setValue] = useState(0);
    const [tabMargin, setTabMargin] = useState(['25%', '-25%']); //로고 마진
    const [searchMargin, setSearchMargin] = useState(['15%', '-15%']); //검색바 마진
    const [searchText, setSearchText] = useState('');
    const searchRef = useRef('');
    const [searchOption, setSearchOption] = useState('none');

    //사용자가 어느 페이지에서 접속할지 모르기 때문에 공통 레이아웃으로 뺌
    const {loginUser, isLoggingOut} = useSelector(state => state.user);
    const router = useRouter();
    useEffect(() => {
        if(defaultPage.includes(currentPage)){
            setPageName('');
        }
        if(currentPage){
            if(currentPage === 'Main Page'){
                setTabMargin(['10%', '-10%']);
                setSearchMargin(['15%', '-15%']);
                setValue(0);
            } else if(currentPage === 'Write Page'){
                setTabMargin(['10%', '-10%']);
                setSearchMargin(['15%', '-15%']);
                setValue(1);
            } else if(currentPage === 'User Page'){
                setTabMargin(['10%', '-10%']);
                setSearchMargin(['15%', '-15%']);
                setValue(2);
            } else{
                setTabMargin(['6%', '-6%']);
                setSearchMargin(['5%', '-5%']);
                setValue(3);
                setPageName(currentPage);
            }
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //서치바 핸들링
    const onChangeSearchText = useCallback((e) => {
        setSearchText(e.target.value);
        // if(searchOption === 'email'){
        //     dispatch({
        //         type: SEARCH_EMAIL_REQUEST,
        //         data: e.target.value,
        //     });
        // }else if(searchOption === 'hashtag'){
        //     dispatch({
        //         type: SEARCH_HASHTAG_REQUEST,
        //         data: e.target.value,
        //     });
        // }
    },[searchText,  searchResult]);
    const onClickSearch = useCallback( () => {
        // console.log('searchOption', searchOption);
        if(searchOption === 'email' && !searchText){
            return alert('이메일을 입력해주세요.');
        } else if(searchOption === 'hashtag' && !searchText){
            return alert('해시태그를 입력해주세요.');
        } else if(searchOption === 'none'){
            return alert('옵션을 선택해 주세요.');
        }
        if(searchOption === 'email'){
            dispatch({
                type: SEARCH_EMAIL_REQUEST,
                data: searchText,
            });
        } else if(searchOption === 'hashtag'){
            dispatch({
                type: SEARCH_HASHTAG_REQUEST,
                data: searchText,
            });
        }
        // if(searchOption === 'email'){
        //     if(!searchText){
        //         return alert('검색할 이메일을 입력해주세요.');
        //     }
        //     if(searchResult && searchResult.id){
        //         router.push(`/user/${searchResult.id}`);
        //     } else{
        //         alert('존재하지 않는 이메일입니다.');
        //     }
        // } else if(searchOption === 'hashtag'){
        //     if(!searchText){
        //         return alert('검색할 해시태그명을 입력해주세요.');
        //     }
        //     if(searchResult && searchResult.id){
        //         router.push(`/diary/hashtag/${searchResult.name}`);
        //     } else{
        //         alert('존재하지 않는 해시태그입니다.');
        //     }
        // } else {
        //     alert('옵션을 선택해주세요!')
        // }

    }, [searchText, searchOption, searchResult]);

    useEffect(() => {
        if(searchError){
            return alert('검색 결과가 없습니다.');
        } else{
            console.log(isSearching, searchResult);
            return alert('검색 결과가 있습니다.');
        }

    }, [isSearching === true, searchResult, searchError]);

    const handleChangeSelect = (e) => {
        console.log(e.target.value);
        setSearchOption(e.target.value);
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
                                <IconButton variant="h6" onClick={onClickMainPage} style={{marginLeft:tabMargin[1], marginRight:tabMargin[0]}}>
                                    Card Diary
                                </IconButton>
                                <Tabs value={value} onChange={handleChange} aria-label="Menu" style={{marginLeft:'7%', marginRight:'-7%'}}>
                                    <Tab label="Main" onClick={onClickMainPage}/>
                                    <Tab label="Write" onClick={onClickWritePage}/>
                                    <Tab label="User" onClick={onClickUserPage}/>
                                    {pageName && <Tab label={pageName} />}
                                    <Tab label="Log Out" onClick={onLogOut}/>
                                </Tabs>
                                <FormControl className={classes.margin} style={{marginLeft:searchMargin[0], marginRight:searchMargin[1]}}>
                                    <NativeSelect
                                        id="demo-customized-select-native"
                                        value={searchOption}
                                        onChange={handleChangeSelect}
                                        input={<BootstrapInput />}

                                    >
                                        <option value={'none'}>선택</option>
                                        <option value={'email'}>이메일</option>
                                        <option value={'hashtag'}>해시태그</option>
                                    </NativeSelect>
                                </FormControl>
                                <div className={classes.search} style={{marginLeft:searchMargin[0], marginRight:searchMargin[1]}}>
                                    <div className={classes.searchIcon}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                        value={searchText}
                                        onChange={onChangeSearchText}
                                        ref={searchRef}
                                    />
                                    <Button onClick={onClickSearch}>검색</Button>
                                </div>
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