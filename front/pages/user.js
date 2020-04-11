import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button, Grid, InputBase, Paper, TextField} from "@material-ui/core";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import CardDiary from "../components/CardDiary";
import {makeStyles, fade} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import {
    EDIT_USER_REQUEST,
    LOAD_FOLLOWINGLIST_REQUEST,
    LOAD_USER_REQUEST,
    USER_EDITFORM_REQUEST,
} from "../reducers/user";
import MyInfoEdit from "../components/MyInfoEdit";
import MyInfo from "../components/MyInfo";
import SearchIcon from '@material-ui/icons/Search';
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import {yellow} from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import {useRouter} from "next/router";


const useStyles = makeStyles((theme) => ({
    root:{
      margin:"10%",
    },
    textFieldWrapper: {
        width: '40ch',
        height: "100%",
        position: "relative",
        zIndex: 1,
        top: 0,
        left: 0,
        overflow: "auto",

    },
    textFields:{
        width:'100%',
        marginTop:'10%',
    },
    avatar:{
        width: "85%",
        height: 250,
        marginLeft:"5%",
    },
    diariesContainer: {
        marginTop:"5%",
        marginBottom:"5%",
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        // marginLeft: '80%',
        marginTop: 0,
        // width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
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
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        paddingBottom:0,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    starIcon:{
        color: yellow[700],
    },
}));

const User = () => {

    const classes = useStyles();
    const {loginUser, isEditing, personalUser, followingList, isLoggingOut} = useSelector(state => state.user);
    const {loginUserCardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    const [searchKeyword, setSearchKeyword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if(!loginUser){
            router.push('/');
            return;
        }
    }, [loginUser, isLoggingOut]);

    //즐겨찾기한 글만 보기
    const [onFilteredSearching, setOnFilteredSearching] = useState(false);
    const onClickFavoriteSearch = () => {
        setOnFilteredSearching(!onFilteredSearching);
    };

    //검색 기능
    const onChangeSearchKeyword = (e) => {
        setSearchKeyword(e.target.value);
    }
    const filteredDiaries = useCallback(loginUserCardDiaries.filter((v) => { //data 를 받아 객체안에 name이라는 속성에 searchKeyword가 있으면
        if(onFilteredSearching){
            return v.isFavorite && (v.diaryTitle.indexOf(searchKeyword) > -1 || v.diaryContent.indexOf(searchKeyword) > -1);
        }
        return v.diaryTitle.indexOf(searchKeyword) > -1 || v.diaryContent.indexOf(searchKeyword) > -1; //값을 data에 저장
    }), [onFilteredSearching, loginUserCardDiaries, searchKeyword]);

    return (
        <Paper variant="outlined" style={{marginRight:"5%", marginLeft:'-5%'}}>
            <Grid container>
                <Grid item md={3} >
                    <div className={classes.root}>

                        {isEditing
                            ?
                            // 내 정보 수정
                            <MyInfoEdit loginUser={loginUser}/>
                            :
                            <MyInfo loginUser={loginUser}/>
                            // 내 정보

                        }
                    </div>
                </Grid>

                <Grid container md={9} spacing={3} className={classes.diariesContainer}>

                    <div style={{marginLeft:'70%', marginTop: -30, marginBottom:'3%'}}>

                        <div className={classes.search}>
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
                                value={searchKeyword}
                                onChange={onChangeSearchKeyword}
                            />
                            <IconButton aria-label="share" onClick={onClickFavoriteSearch}>
                            {
                                onFilteredSearching
                                    ? <StarBorderRoundedIcon fontSize="large" color="inherit" className={classes.starIcon}/>
                                    : <StarBorderRoundedIcon fontSize="large" color="inherit" />

                            }
                            </IconButton>
                        </div>
                    </div>
                    <Grid md={12}/>
                    {filteredDiaries.map(v => {
                        return (
                            <CardDiary key={v.id} diary={v}/>
                        )})}
                </Grid>
            </Grid>
        </Paper>
    );
};

User.getInitialProps = async (context) => {
    const state = context.store.getState();
    let userId = 0;
    const queryId = context.query.userId && parseInt(context.query.userId, 10);
    if(queryId){
        userId = queryId;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: userId,
    });

    context.store.dispatch({
        type: LOAD_USER_DIARIES_REQUEST,
        data: userId,
    });
    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
        data: userId,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGLIST_REQUEST,
    });

}
export default User;