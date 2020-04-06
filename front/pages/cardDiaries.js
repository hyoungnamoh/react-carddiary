import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Button, Grid, Paper, TextField} from "@material-ui/core";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import CardDiary from "../components/CardDiary";
import {makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import {EDIT_USER_REQUEST, LOAD_USER_REQUEST, USER_EDITFORM_REQUEST} from "../reducers/user";
import MyInfoEdit from "../components/MyInfoEdit";
import MyInfo from "../components/MyInfo";


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
    }
}));

const CardDiaries = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const {loginUser, isEditing} = useSelector(state => state.user);
    const {cardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    // const [isEditing, setIsEditing] = useState(false); //편집모드
    const [editPassword, setEditPassword] = useState('');
    const [editPasswordConfirm, setEditPasswordConfirm] = useState('');
    const [setEditEmailExt] = useState('');
    console.log('MyInfoEdit loginUser',loginUser);





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
                        {cardDiaries.map(v => {
                            return (
                                <CardDiary key={v.id} diary={v}/>
                            )})}
                </Grid>
            </Grid>
        </Paper>
    );
};

CardDiaries.getInitialProps = async (context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type: LOAD_USER_DIARIES_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
    });
}
export default CardDiaries;