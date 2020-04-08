import React from "react";
import {Grid, Tabs, Tab} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {LOAD_DIARIES_REQUEST} from "../reducers/diary";
import {useSelector} from "react-redux";
import CardDiary from "./CardDiary";
import FollowDrawer from "./FollowDrawer";



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
    diariesContainer: {
        marginTop:"5%",
        marginBottom:"5%",
        marginLeft:"8%",
    },
}));
const Main2 = () => {
    const classes = useStyles();
    const {cardDiaries} = useSelector(state => state.diary);
    return (
        <>
            <div>main2</div>
            <hr/>
            <Grid container>
                <Grid container md={11} spacing={3} className={classes.diariesContainer}>
                    {cardDiaries.map(v => {
                        return (
                            <CardDiary key={v.id} diary={v}/>
                        )})}
                </Grid>
                <Grid item md={3}>
                    <FollowDrawer/>
                </Grid>
            </Grid>
        </>
    );
}


export default Main2;