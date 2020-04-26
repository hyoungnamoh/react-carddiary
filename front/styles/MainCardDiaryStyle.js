import {makeStyles} from "@material-ui/core/styles";
import {red, yellow} from "@material-ui/core/colors";

export const mainCardDiaryStyle = makeStyles(theme => ({
    root: {
        width: "700px",
        maxHeight: "800px",
        marginBottom:"3%",
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
        marginLeft: '27%',
        marginTop: '15%',
        maxWidth: '750px',
        maxHeight: '750px',
        width: '60%',
        height: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));