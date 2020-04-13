import React, {useEffect, useState} from 'react';
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
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import { Carousel } from 'react-responsive-carousel';
import {
    LOAD_DIARY_REQUEST,
    LOAD_FAVORITE_REQUEST,
    LOAD_USER_DIARIES_REQUEST,
    ONCLICK_FAVORITE_REQUEST
} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {CHANGE_CURRENTPAGE_REQUEST} from "../reducers/user";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        width: "70%",
        marginLeft: "15%",

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    starIcon:{
        color: yellow[700],
    },
}));

const cardDiaryDetails = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const {loginUser, isLoggingOut} = useSelector(state => state.user);
    const {cardDiary, favoriteDiaries} = useSelector(state => state.diary);
    const isFavorite = loginUser && favoriteDiaries && favoriteDiaries.find(v => v.id === cardDiary.id);
    console.log('favoriteDiaries', favoriteDiaries);
    console.log('isFavorite', isFavorite);
    console.log('cardDiary', cardDiary);

    const [isViewMore, setViewMore] = useState(false);

    //로그아웃 또는 로그인 안한 사용자가 들어올 경우 메인으로 돌리기
    useEffect(() => {
        if(!loginUser){
            router.push('/');
            return;
        }
    }, [loginUser, isLoggingOut]);

    const onClickViewMore = () => {
        setViewMore(!isViewMore);
    }
    //즐겨찾기 등록
    const onClickFavorite = (id) => () => {
        dispatch({
            type: ONCLICK_FAVORITE_REQUEST,
            data: {
                id: id
            }
        });
    };
    return (
        <Card className={classes.root}>
            <CardHeader
                // 아바타
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {loginUser.userName[0]}
                    </Avatar>
                }
                // 땡땡땡 옵션
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                // 제목
                title={cardDiary.diaryTitle && cardDiary.diaryTitle.length > 12 ? cardDiary.diaryTitle.slice(0,12) + " ..." : cardDiary.diaryTitle}

                // 날짜
                subheader={cardDiary.createdAt}
            />
            {/*사진*/}
            <div className="carousel-wrapper"  >
                <Carousel infiniteLoop showThumbs={false} >
                    {cardDiary.Images && cardDiary.Images.map((v, i) => (
                        <div style={{height: 'auto'}}><img src={`http://localhost:3603/${cardDiary.Images[i].src}`}/></div>
                        ))}
                </Carousel>
            </div>
            {/*내용*/}
            <CardContent>
                {!isViewMore ?
                    <Typography variant="body2" color="textSecondary" component="p" style={{fontSize:"1em"}}>
                    {cardDiary.diaryContent && cardDiary.diaryContent.slice(0,400).split(/(#[^\s]+)/g).map((v) => {
                        if(v.match(/#[^\s]+/)){
                            return (
                                <Link href={{ pathname: '/hashtag', query: {tag: v.slice(1)}}} as={`/diary/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                            );
                        }
                        return v;
                    })}
                    {cardDiary.diaryContent && cardDiary.diaryContent.length > 400
                    ?
                        <a href="#" onClick={onClickViewMore}> ...더보기</a>
                    : ""}
                </Typography>
                :
                <Typography variant="body2" color="textSecondary" component="p">{cardDiary.diaryContent && cardDiary.diaryContent.split(/(#[^\s]+)/g).map((v) => {
                    if(v.match(/#[^\s]+/)){
                        return (
                            <Link href={{ pathname: '/hashtag', query: {tag: v.slice(1)}}} as={`/diary/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                        );
                    }
                    return v;
                })}}
                    <a onClick={onClickViewMore}>접기</a>
                </Typography>}
            </CardContent>

            <CardActions disableSpacing>
                {/*하트 아이콘*/}
                <IconButton aria-label="add to favorites" color="secondary">
                    <FavoriteBorderRoundedIcon fontSize="large" />
                </IconButton>
                {/*공유 아이콘*/}
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                {/*별 아이콘*/}
                {loginUser && loginUser.id === cardDiary.UserId &&
                <IconButton aria-label="share" onClick={onClickFavorite(cardDiary.id)}>
                    {isFavorite
                        ? <StarBorderRoundedIcon fontSize="large" color="inherit" className={classes.starIcon} />
                        : <StarBorderRoundedIcon fontSize="large" color="inherit" />}

                </IconButton>
                }
            </CardActions>
        </Card>
    );
}

cardDiaryDetails.getInitialProps = async (context) => {
    let userId = 0;
    const queryId = context.query.id && parseInt(context.query.id, 10);

    if(queryId){
        userId = queryId;
    }

    context.store.dispatch({
        type: LOAD_DIARY_REQUEST,
        data: context.query.id,
    });
    context.store.dispatch({
        type: CHANGE_CURRENTPAGE_REQUEST,
        data: 'diary details',
    });

    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
        data: userId,
    });
    return { id: parseInt(context.query.id, 10) };
};

export default cardDiaryDetails;