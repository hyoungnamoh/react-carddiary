import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from "next/link";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import CardDiaries from "./cardDiaries";
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        width: "70%",

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
}));

const cardDiaryDetails = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries} = useSelector(state => state.diary);
    console.log(cardDiaries);
    const diary = cardDiaries[0];

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
                        ? <a href="#"> ...더보기</a>
                        : ""}
                </Typography>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                </Collapse>
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
                <IconButton aria-label="share">
                        <StarBorderRoundedIcon fontSize="large" color="inherit" />

                </IconButton>
            </CardActions>
        </Card>
    );
}

cardDiaryDetails.getInitialProps = async (context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type: LOAD_USER_DIARIES_REQUEST,
        data: state.user.loginUser && state.user.loginUser.id,
    });
    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
    });
}

export default cardDiaryDetails;