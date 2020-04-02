import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red, yellow} from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Grid, Paper} from "@material-ui/core";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import Link from "next/link";
import CardDiary from "../components/CardDiary";



const RecipeReviewCard = () => {

    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    // console.log("loginUser", loginUser);
    // console.log("cardDiaries", cardDiaries);



    return (
        <Paper >
            <div>
                <h1>내 다이어리들</h1>
            </div>
            <Grid container spacing={3} style={{position:"absolute", top:0, left:0, bottom:0, right:0, height:"10%", margin:"10%"}}>
                {cardDiaries.map(v => {
                    return (
                        <CardDiary diary={v}/>
                    )})}

            </Grid>
        </Paper>
    );
};

RecipeReviewCard.getInitialProps = async (context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type: LOAD_USER_DIARIES_REQUEST,
        data: state.user.loginUser && state.user.loginUser.id,
    });
    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
    });
}
export default RecipeReviewCard;