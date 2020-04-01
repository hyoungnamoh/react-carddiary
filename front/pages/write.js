import React, {useState} from "react";
import {Button, Grid, Paper} from "@material-ui/core";
import {LOAD_USER_REQUEST} from "../reducers/user";
import { useRouter } from "next/router";
import {useSelector} from "react-redux";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    dropZone:{
        height: "10px",
    }
}));


const WritePage = () => {
    // const { loginUser } = useSelector(state => state.user);
    // const router = useRouter();
    // if(!loginUser){
    //     router.push("/");
    // }

    const classes = useStyles();

    const [files, setFiles] = useState([]);
    const [isOpened, setIsOpened] = useState(false);

    const handleChange = (files) => {
        setFiles(files);
    }

    const handleClose= () => {
        setFiles([]);
        console.log("handleClose", files);
        setIsOpened(false);
    }

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        setFiles(files);
        console.log("handleSave", files);
        setIsOpened(false);
    }

    const handleOpen = () => {
        console.log("handleOpen", files);
        setIsOpened(true);
    }

    const handleDelete = () => {
        console.log('삭제');
        setFiles([]);
    }
    return(

        <Paper variant="outlined">
            <form  noValidate autoComplete="off" className={classes.root}>
                    <Grid container>
                        <Grid item md={3}/>
                        <Grid item md={6}>
                            <TextField required id="standard-required" label="제목" defaultValue="Hello World" />
                        </Grid>
                        <Grid item md={3}/>
                        <Grid item md={3}/>
                        <Grid item md={6}>
                            <TextField
                                id="outlined-multiline-static"
                                label="내용"
                                multiline
                                rows="20"
                                defaultValue="Default Value"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={3}/>
                    </Grid>
                    <div className={classes.dropZone}>
                        <Grid container>
                            <Grid item md={3}/>
                            <Grid item md={3} >
                                <DropzoneArea
                                    onChange={handleChange}
                                    dropzoneText="이미지 추가하기"
                                />
                            </Grid>
                            <Grid item md={3}>
                                <DropzoneArea className={classes.dropZone}
                                    onChange={handleChange}
                                    dropzoneText="이미지 추가하기"
                                />
                            </Grid>
                        </Grid>
                    </div>
            </form>
        </Paper>


    )
}

WritePage.getInitialProps = async (context) => {
    const state = context.store.getState();

    console.log("stateee" , state);

}

export default WritePage;