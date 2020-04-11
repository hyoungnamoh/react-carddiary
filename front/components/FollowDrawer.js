import React, {useEffect, useState} from "react";
import {Avatar, Button, ListItemAvatar, ListItemSecondaryAction, Tab, Tabs} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import ListItemText from "@material-ui/core/ListItemText";
import Drawer from "@material-ui/core/Drawer";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));
const FollowDrawer = () => {
    const classes = useStyles();
    const {followingList, followerList} = useSelector(state => state.user);
    const [drawerFollowList, setDrawerFollowList] = useState(0);
    const handleChange = (event, newValue) => {
        setDrawerFollowList(newValue);
    };
    useEffect(() => {

    }, [followingList, followerList]);
    console.log(followingList);
    // console.log(followerList[0].ProfileImage[0].src);

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="right"
        >
            <div className={classes.toolbar} />
            <Tabs
                value={drawerFollowList}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="팔로워" />
                <Tab label="팔로잉" />
            </Tabs>
            <Divider />
            <List>
                {drawerFollowList
                    ?
                    followingList.map((v, i) => (
                        <ListItem button key={v.id}>
                            <ListItemAvatar>
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                    src={ v.ProfileImage ? `http://localhost:3603/${v.ProfileImage[0].src}` :  null}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={v.userName} />
                        </ListItem>
                    ))
                    :
                    followerList.map((v, i) => (
                        <ListItem button key={v.id}>
                            <ListItemAvatar >
                                <Avatar
                                    aria-label="recipe"
                                    className={classes.avatar}
                                    src={ v.ProfileImage ? `http://localhost:3603/${v.ProfileImage[0].src}` :  null}
                                />
                            </ListItemAvatar>
                            {/*<ListItemText primary={v.userName} />*/}
                            <ListItemText primary={v.userName} secondary={v.email}/>
                            <ListItemSecondaryAction><Button style={{marginLeft:'1%'}}>언팔로우</Button></ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default FollowDrawer;