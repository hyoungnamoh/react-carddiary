import React, {useEffect} from "react";
import {Grid, Tabs, Tab} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {LOAD_DIARIES_REQUEST, LOAD_FAVORITE_REQUEST} from "../reducers/diary";
import {useSelector} from "react-redux";
import {
    LOAD_FOLLOWERLIST_REQUEST,
    LOAD_FOLLOWINGLIST_REQUEST,
    LOAD_USER_REQUEST
} from "../reducers/user";
import CardDiary from "../components/CardDiary";
import FollowDrawer from "../components/FollowDrawer";
import {useRouter} from "next/router";
import MainCardDiary from "../components/MainCardDiary";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    // diariesContainer: {
    //     marginTop:"5%",
    //     marginBottom:"5%",
    //     marginLeft:"8%",
    // },
}));
const Main = () => {
    const classes = useStyles();
    const {cardDiaries} = useSelector(state => state.diary);
    const { loginUser, isLoggingOut} = useSelector(state => state.user);

    const router = useRouter();

    //로그아웃 또는 로그인 안한 사용자가 들어올 경우 메인으로 돌리기
    useEffect(() => {
        if(!loginUser){
            router.push('/');
            return;
        }
    }, [loginUser, isLoggingOut]);

    return (
        <>
            <div>main2</div>
            <hr/>
            <Grid container>
                <Grid xs={3}/>
                <Grid container xs={7} className={classes.diariesContainer}>
                    {cardDiaries.map(v => {
                        return (
                            <MainCardDiary key={v.id} diary={v}/>
                        )})}
                </Grid>
                <Grid item xs={2}>
                    <FollowDrawer/>
                </Grid>
            </Grid>
        </>
    );
}

Main.getInitialProps = async (context) => {
    const state = context.store.getState();

    const loginUserId = state.user.loginUser && state.user.loginUser.id;
    let userId = 0;
    const queryId = context.query.id && parseInt(context.query.id, 10);

    if(queryId){
        userId = queryId;
    }
    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: userId,
    });

    context.store.dispatch({
        type: LOAD_DIARIES_REQUEST,
    });

    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
        data: userId,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGLIST_REQUEST,
    });
    context.store.dispatch({
        type: LOAD_FOLLOWERLIST_REQUEST,
    });
}
export default Main;