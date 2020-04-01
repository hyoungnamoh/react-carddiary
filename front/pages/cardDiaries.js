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
import {Grid, Paper} from "@material-ui/core";
import {LOAD_USER_DIARIES_REQUEST} from "../reducers/diary";
import {useSelector} from "react-redux";
import {Title} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        width: "330px",
        height: "430px",
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
    // papers:{
    //     width: "75%",
    //     marginLeft: "12.5%"
    // }
}));

const RecipeReviewCard = () => {
    const classes = useStyles();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries} = useSelector(state => state.diary);
    console.log("loginUser", loginUser);
    console.log("cardDiaries", cardDiaries);
    return (
        <Paper className={classes.papers} >
            <div>
                <h1>내 다이어리들</h1>
            </div>
            <Grid container spacing={3} style={{position:"absolute", top:0, left:0, bottom:0, right:0, height:"10%", margin:"10%"}}>
                {cardDiaries.map(v => {
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
                                    title={v.diaryTitle}
                                    // 날짜
                                    subheader={v.createdAt}
                                />
                                {/*사진*/}
                                <CardMedia
                                    className={classes.media}
                                    image={`http://localhost:3603/${v.Images[0] && v.Images[0].src}`}
                                    title="Paella dish"
                                />
                                {/*내용*/}
                                <CardContent style={{height:"102px"}}>
                                    <Typography variant="body" color="textSecondary" component="p">
                                        {v.diaryContent}
                                    </Typography>
                                </CardContent>

                                <CardActions disableSpacing>
                                    {/*하트 아이콘*/}
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    {/*공유 아이콘*/}
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
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
}
export default RecipeReviewCard;