import React, {useState} from "react";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import CardActions from "@material-ui/core/CardActions";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import ShareIcon from "@material-ui/icons/Share";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import {Card, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {blue, green, red, yellow} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import {
    ONCLICK_FAVORITE_REQUEST
} from "../reducers/diary";
import {Carousel} from "react-responsive-carousel";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles(theme => ({
    root: {
        width: "330px",
        height: "430px",
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: red[500],
    },
    starIcon:{
        color: yellow[700],
    },
    modal: {
        marginLeft: '35%',
        marginTop: '20%',
        maxWidth: '500px',
        maxHeight: '500px',
        width: '40%%',
        height: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
const CardDiary = ({diary}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries, favoriteDiaries} = useSelector(state => state.diary);
    const liked = loginUser && favoriteDiaries && favoriteDiaries.find(v => v.id === diary.id);
    const [isOpenCarousel, setIsOpenCarousel] = useState(false);

    const onCarousel = () => {
        setIsOpenCarousel(true);
    }
    const onCloseCarousel = () => {
        setIsOpenCarousel(false);
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

    //개별 포스트 가져오기
    const getDiary = (id) => () => {

    };
    return (
        <Grid item>
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
                    // title={<Link href={{ pathname: '/diary', query: { id: diary.id}}} as={`/diary/${diary.id}`}><a>{diary.diaryTitle.length > 12}</a></Link> ? diary.diaryTitle.slice(0,12) + " ..." : diary.diaryTitle}
                    title={diary.diaryTitle && diary.diaryTitle.length > 15
                        ?
                            <Link href={{ pathname: '/cardDiaryDetails', query: { id: diary.id}}} as={`/diary/${diary.id}`}><a>
                                {diary.diaryTitle.slice(0,15)+ " ..."}
                            </a></Link>
                        :
                            <Link href={{ pathname: '/cardDiaryDetails', query: { id: diary.id}}} as={`/diary/${diary.id}`}><a>
                                {diary.diaryTitle}
                            </a></Link>}
                    onClick={getDiary(diary.id)}

                    // 날짜
                    subheader={diary.createdAt && diary.createdAt}
                />
                {/*사진*/}
                {/*<Link style={{textDecoration:'none'}} href={{ pathname: '/cardDiaryDetails', query: { id: diary.id}}} as={`/CardDiary`}><a>*/}
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:3603/${diary.Images[0] && diary.Images[0].src}`}
                    title={diary.diaryTitle && diary.diaryTitle}
                    onClick={onCarousel}
                />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={isOpenCarousel}
                    onClose={onCloseCarousel}
                    closeAfterTransition
                >
                    <Fade in={isOpenCarousel}>
                        <div className="carousel-wrapper" >
                            <Carousel
                            >
                                {diary.Images && diary.Images.map((v, i) => (
                                    <div><img src={`http://localhost:3603/${diary.Images[i].src}`}/></div>
                                ))}
                            </Carousel>
                        </div>
                    </Fade>
                </Modal>


                {/*</a></Link>*/}
                {/*내용*/}
                <CardContent style={{height:"102px"}}>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {diary.diaryContent && diary.diaryContent.slice(0,100)}
                        {diary.diaryContent && diary.diaryContent.length > 100
                            ? <Link href={{ pathname: '/cardDiaryDetails', query: { id: diary.id}}} as={`/diary/${diary.id}`}><a>...자세히보기</a></Link>
                            : ""}
                    </Typography>
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
                    <IconButton aria-label="share" onClick={onClickFavorite(diary.id)}>
                        {liked
                            ? <StarBorderRoundedIcon fontSize="large" color="inherit" className={classes.starIcon} />
                            : <StarBorderRoundedIcon fontSize="large" color="inherit" />}

                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}

export default CardDiary;