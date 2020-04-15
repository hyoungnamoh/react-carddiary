import React, {useEffect, useRef} from "react";
import {Grid, Tabs, Tab, GridListTile, GridListTileBar, GridList} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import {LOAD_DIARIES_REQUEST, LOAD_FAVORITE_REQUEST, LOAD_HASHTAG_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import ListSubheader from '@material-ui/core/ListSubheader';
import MainCardDiary from "../components/MainCardDiary";
import FollowDrawer from "../components/FollowDrawer";
import Link from "next/link";
import {
    CHANGE_CURRENTPAGE_REQUEST,
    LOAD_FOLLOWERLIST_REQUEST,
    LOAD_FOLLOWINGLIST_REQUEST, LOAD_TODO_REQUEST,
    LOAD_USER_REQUEST
} from "../reducers/user";
import TodoList from "../components/TodoList";



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    diariesContainer: {
        marginTop:"3%",
        marginBottom:"3%",
    },
}));
const Hashtag = ({tag}) => {
    const classes = useStyles();
    const {hashtagDiaries} = useSelector(state => state.diary);
    const { loginUser, isLoggingOut,} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const router = useRouter();
    const countRef = useRef([]); //무한 스크롤링 시 lastId 를 저장 할 배열

    //로그아웃 또는 로그인 안한 사용자가 들어올 경우 메인으로 돌리기
    useEffect(() => {
        if(!loginUser){
            router.push('/');
            return;
        }
    }, [loginUser, isLoggingOut]);

    return (
        <>
            <Grid container>
                <Grid item xs={3} style={{marginTop:'3%'}}>
                    <TodoList/>
                </Grid>
                <Grid item xs={6} className={classes.diariesContainer}>
                        <GridList className={classes.gridList} cols={3} style={{ height: 'auto' }}>
                            <GridListTile key="Subheader" >
                                {/*<ListSubheader>{tag}</ListSubheader>*/}
                                <img src={hashtagDiaries[0] && `http://localhost:3603/${hashtagDiaries[Math.floor(Math.random() * hashtagDiaries.length)].Images[0].src}`} alt={tag} style={{}}/>
                            </GridListTile>
                            {hashtagDiaries.length !== 0 && hashtagDiaries.map((tile) => (
                                <GridListTile key={tile.id}>
                                    <img src={`http://localhost:3603/${tile.Images[0].src}`} alt={tile.diaryTitle} />
                                    <GridListTileBar
                                        title={tile.diaryTitle}
                                        subtitle={<span>by: {tile.User.userName}</span>}
                                        actionIcon={
                                            <Link href={{ pathname: '/cardDiaryDetails', query: { id: tile.id}}} as={`/diary/${tile.id}`}>
                                                <IconButton aria-label={`info about ${tile.diaryTitle}`} className={classes.icon}>
                                                    <InfoIcon />
                                                </IconButton>
                                            </Link>
                                        }
                                    />
                                </GridListTile>
                            ))}
                        </GridList>
                </Grid>
                <Grid item xs={3}>
                    <FollowDrawer/>
                </Grid>
            </Grid>
        </>
    );
}

Hashtag.getInitialProps = async (context) => {
    let userId = 0;
    const queryId = context.query.id && parseInt(context.query.id, 10);

    if(queryId){
        userId = queryId;
    }
    context.store.dispatch({
       type: LOAD_HASHTAG_REQUEST,
       tag: context.query.tag,
    });

    context.store.dispatch({
        type: LOAD_USER_REQUEST,
        data: userId,
    });

    context.store.dispatch({
        type: LOAD_FOLLOWINGLIST_REQUEST,
    });

    context.store.dispatch({
        type: LOAD_FOLLOWERLIST_REQUEST,
    });
    context.store.dispatch({
        type: CHANGE_CURRENTPAGE_REQUEST,
        data: 'Hashtag Page',
    });
    context.store.dispatch({
        type: LOAD_TODO_REQUEST,
    });
    return { tag: context.query.tag, }
}
export default Hashtag;