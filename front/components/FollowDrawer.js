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
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_FOLLOW_REQUEST,
    LOAD_FOLLOWERLIST_REQUEST,
    LOAD_FOLLOWINGLIST_REQUEST,
    REMOVE_FOLLOW_REQUEST
} from "../reducers/user";
import Link from "next/link";
import {followDrawerStyle} from "../styles/FollowDrawerStyle";


const FollowDrawer = () => {
    const classes = followDrawerStyle();
    const dispatch = useDispatch();
    const {followingList, followerList} = useSelector(state => state.user);
    const [drawerFollowList, setDrawerFollowList] = useState(0);
    const [filteredFollow, setFilteredFollow] = useState([]);
    const handleChange = (event, newValue) => {
        setDrawerFollowList(newValue);
    };

    //언팔로우 버튼 클릭
    const onClickUnFollow = (userId) => () => {
        dispatch({
            type: REMOVE_FOLLOW_REQUEST,
            data: userId,
        });
    }
    
    //팔로우 버튼 클릭
    const onClickFollow = (userId) => () => {
        dispatch({
            type: ADD_FOLLOW_REQUEST,
            data: userId,
        });
    }

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
                    followingList.map((v) => (
                        <Link href={{ pathname: '/user', query: { userId: v.id}}} as={`/user/${v.id}`} key={v.id}>
                            <ListItem button >
                                <ListItemAvatar >
                                    <Avatar
                                        aria-label="recipe"
                                        className={classes.avatar}
                                        src={ v.ProfileImage ? `${v.ProfileImage[0].src}` :  null}
                                    />
                                </ListItemAvatar>
                                {/*<ListItemText primary={v.userName} />*/}
                                <ListItemText primary={v.userName} secondary={v.email}/>
                                <ListItemSecondaryAction style={{width:'30%', }}>
                                    <Button variant="outlined" color="primary" onClick={onClickUnFollow(v.id)}>언팔로우</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    ))
                    :
                    followerList.map((v) => (
                        <Link href={{ pathname: '/user', query: { userId: v.id}}} as={`/user/${v.id}`} key={v.id}>
                            <ListItem button >
                                <ListItemAvatar >
                                    <Avatar
                                        aria-label="recipe"
                                        className={classes.avatar}
                                        src={ v.ProfileImage ? `${v.ProfileImage[0].src}` :  null}
                                    />
                                </ListItemAvatar>
                                <ListItemText primary={v.userName} secondary={v.email}/>
                                {
                                    followingList.filter(f => f.id === v.id).length === 0 &&
                                    <ListItemSecondaryAction style={{width:'30%', }}>
                                        <Button variant="outlined" color="primary" onClick={onClickFollow(v.id)}>팔로우</Button>
                                    </ListItemSecondaryAction>
                                }
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        </Drawer>
    );
}

export default FollowDrawer;