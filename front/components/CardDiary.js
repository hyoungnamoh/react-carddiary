import React from "react";
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
import {red, yellow} from "@material-ui/core/colors";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import RecipeReviewCard from "../pages/cardDiaries";

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
    }
}));
const CardDiary = ({diary}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries, favoriteDiaries} = useSelector(state => state.diary);
    const liked = loginUser && favoriteDiaries && favoriteDiaries.find(v => v.id === diary.id);
    const onClickFavorite = (id) => () => {
        dispatch({
            type: ONCLICK_FAVORITE_REQUEST,
            data: {
                id: id
            }
        });
    }
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
                    title={diary.diaryTitle.length > 12 ? diary.diaryTitle.slice(0,12) + " ..." : diary.diaryTitle}

                    // 날짜
                    subheader={diary.createdAt}
                />
                {/*사진*/}
                <CardMedia
                    className={classes.media}
                    image={`http://localhost:3603/${diary.Images[0] && diary.Images[0].src}`}
                    title={diary.diaryTitle}
                />
                {/*내용*/}
                <CardContent style={{height:"102px"}}>
                    <Typography variant="body" color="textSecondary" component="p">
                        {diary.diaryContent.slice(0,100)}
                        {diary.diaryContent.length > 100
                            ? <Link href={{ pathname: '/card', query: {id: diary.id}}} as={`/card`} key={diary.id}><a>...더보기</a></Link>
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