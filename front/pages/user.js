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
import {EDIT_USER_REQUEST, LOAD_USER_REQUEST, USER_EDITFORM_REQUEST} from "../reducers/user";
import MyInfoEdit from "../components/MyInfoEdit";
import MyInfo from "../components/MyInfo";
import SearchIcon from '@material-ui/icons/Search';


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

const User = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {loginUser, isEditing} = useSelector(state => state.user);
    const {cardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    const [editPassword, setEditPassword] = useState('');
    const [editPasswordConfirm, setEditPasswordConfirm] = useState('');
    const [setEditEmailExt] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    //검색 기능
    const onChangeSearchKeyword = (e) => {
        setSearchKeyword(e.target.value);
    }
    const filteredDiaries = cardDiaries.filter((v) => { //data 를 받아 객체안에 name이라는 속성에 searchKeyword가 있으면
        return v.diaryTitle.indexOf(searchKeyword) > -1 || v.diaryContent.indexOf(searchKeyword) > -1; //값을 data에 저장
    });

    return (
        <Paper variant="outlined">
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

    const loginUserId = state.user.loginUser && state.user.loginUser.id;
    // console.log('User.getInitialProps loginUserId', loginUserId);
    let userId = 0;
    const queryId = context.query.id && parseInt(context.query.id, 10);
    // console.log('User.getInitialProps queryId', queryId);

    // console.log('User.getInitialProps loginUserId', loginUserId);
    // console.log('User.getInitialProps queryId', queryId);

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

}
export default User;