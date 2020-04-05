import React, {useState} from 'react';
import {Avatar, Grid, Paper, TextField} from "@material-ui/core";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import CardDiary from "../components/CardDiary";
import {makeStyles} from "@material-ui/core";


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

    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    console.log("cardDiaries", cardDiaries);

    const classes = useStyles();


    return (
        <Paper variant="outlined">
            <Grid container>
                <Grid container md={3} >
                    <div className={classes.root}>
                        <div>내 정보 페이지</div>
                        <div >
                            <Avatar
                                alt="Remy Sharp"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs63AZTe8al7iTmr5BndAyf7QV1UZsS29Qi7DYXIvY8Z1gvMAp&usqp=CAU"
                                className={classes.avatar}
                            />
                        </div>
                        <div className={classes.textFieldWrapper}>
                            <TextField required id="standard-required" label="Required" defaultValue="Hello World" className={classes.textFields} />
                            <TextField required id="standard-required" label="Required" defaultValue="Hello World" className={classes.textFields}/>
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                className={classes.textFields}
                            />
                            <TextField
                                id="standard-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                className={classes.textFields}
                            />
                        </div>
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
        data: state.user.loginUser && state.user.loginUser.id,
    });
    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
    });
}
export default CardDiaries;