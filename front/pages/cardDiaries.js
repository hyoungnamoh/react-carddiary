import React, {useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import CardDiary from "../components/CardDiary";



const CardDiaries = () => {

    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    console.log("cardDiaries", cardDiaries);

    return (
        <Paper variant="outlined">
            <Grid container spacing={3} style={{position:"absolute", top:0, left:0, bottom:0, right:0, height:"10%", margin:"10%", maxWidth:"1500px"}}>
                {cardDiaries.map(v => {
                    return (
                        <CardDiary key={v.id} diary={v}/>
                    )})}
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