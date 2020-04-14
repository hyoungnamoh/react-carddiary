import React, {useCallback, useEffect, useState} from 'react';
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
    LIKE_DIARY_REQUEST,
    LOAD_DIARY_REQUEST,
    LOAD_FAVORITE_REQUEST,
    LOAD_USER_DIARIES_REQUEST,
    ONCLICK_FAVORITE_REQUEST, UNLIKE_DIARY_REQUEST
} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import {CHANGE_CURRENTPAGE_REQUEST} from "../reducers/user";
import Link from "next/link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import StarRoundedIcon from "@material-ui/icons/StarRounded";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        width: "70%",
        marginLeft: "15%",
        marginTop: "3%",
        marginBottom:"3%",

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
    const dispatch = useDispatch();
    const router = useRouter();
    const {loginUser, isLoggingOut} = useSelector(state => state.user);
    const {cardDiary, favoriteDiaries} = useSelector(state => state.diary);
    const isFavorite = loginUser && favoriteDiaries && favoriteDiaries.find(v => v.id === cardDiary.id);
    const liked = loginUser && cardDiary.Likers && cardDiary.Likers.find(v => v.id === loginUser.id); //좋아요 눌렀는지 여부

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

    const onClickLike = useCallback(() => {
        console.log('onClickLike');
        if(!loginUser) {
            router.push('/');
            return alert('로그인이 필요합니다.');
        }
        if(liked){ //좋아요를 누른 상태
            dispatch({
                type: UNLIKE_DIARY_REQUEST,
                data: cardDiary.id,
            })
        } else{ //좋아요를 누르지 않은 상태
            dispatch({
                type: LIKE_DIARY_REQUEST,
                data: cardDiary.id,
            });
        }
    }, [loginUser && loginUser.id, cardDiary && cardDiary.id, liked]);

    console.log(cardDiary);
    return (
        <Card className={classes.root}>
            <CardHeader
                // 아바타
                avatar={
                    <Link href={{ pathname: '/user', query: { userId: cardDiary.UserId}}} as={`/user/${cardDiary.UserId}`}><a>
                        <Avatar
                            aria-label="recipe"
                            className={classes.avatar}
                            src={ cardDiary.User && cardDiary.User.ProfileImage ? `http://localhost:3603/${cardDiary.User.ProfileImage[0].src}` :  null}
                        >
                        </Avatar>
                    </a></Link>
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
                <IconButton aria-label="add to favorites" color="secondary" onClick={onClickLike}>
                    {!liked
                        ? <FavoriteBorderRoundedIcon fontSize="large"/>
                        : <FavoriteIcon fontSize="large" />
                    }

                </IconButton>
                {/*별 아이콘*/}
                {loginUser && loginUser.id === cardDiary.UserId &&
                <IconButton aria-label="share" onClick={onClickFavorite(cardDiary.id)}>
                    {isFavorite
                        ? <StarRoundedIcon fontSize="large" color="inherit" className={classes.starIcon}/>
                        : <StarBorderRoundedIcon fontSize="large" color="inherit" className={classes.starIcon}/>
                    }
                </IconButton>
                }
                {/*공유 아이콘*/}
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
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