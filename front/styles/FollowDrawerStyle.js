import {makeStyles} from "@material-ui/core/styles";

const drawerWidthPhone = '70vw';
const drawerWidthWeb = '25vw';
export const followDrawerStylePhone = makeStyles((theme) => ({
        appBar: {
            width: `calc(100% - ${drawerWidthPhone})`,
            // marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidthPhone,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidthPhone,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'space-around',
        }
    }),
);

export const followDrawerStyleWeb = makeStyles((theme) => ({
        root: {
            display: 'flex',
        },
        appBar: {
            width: `calc(100% - ${drawerWidthWeb})`,
            // marginLeft: drawerWidth,
        },
        drawer: {
            width: drawerWidthWeb,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidthWeb,
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
        drawerHeader: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
            justifyContent: 'space-around',
        }
    }),
);

export const followDrawerStyleHide = makeStyles((theme) => ({
        drawer: {
            display: 'none',
        }
    }),
);