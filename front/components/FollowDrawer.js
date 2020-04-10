import React, {useEffect} from "react";
import {Tab, Tabs} from "@material-ui/core";
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
    const {followingList} = useSelector(state => state.user);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {

    }, [followingList])
    console.log('followingList', followingList);

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
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="팔로워" />
                <Tab label="팔로윙" />
            </Tabs>
            <Divider />
            <List>
                {followingList.map((v, i) => (
                    <ListItem button key={v.id}>
                        <ListItemIcon>{i % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={v.userName} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default FollowDrawer;