import React, {useState} from "react";
import {Button, Grid, Input, InputBase, Paper,FormControlLabel, Radio, Checkbox} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
    dropZone:{
        height: "10px",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        marginLeft: theme.spacing(5),
    },
    selectEmpty: {
    },
    inputBaseMargin: {
        marginTop: theme.spacing(2),
    },
}));


const WritePage = () => {
    // const { loginUser } = useSelector(state => state.user);
    // const router = useRouter();
    // if(!loginUser){
    //     router.push("/");
    // }

    const classes = useStyles();

    const [files, setFiles] = useState([]); //드랍존 이미지 파일
    const [isOpened, setIsOpened] = useState(false); //드랍존 모달 오픈
    const [isPublic, setIsPublic] = useState("publicDiary"); //공개여부 라디오버튼
    const [diaryTitle, setDiaryTitle] = useState(''); //다이어리 제목
    const [diaryContent, setDiaryContent] = useState(''); //다이어리 내용
    const [isFavorite, setIsFavorite] = useState(false);


    
    /*
        드랍존 핸들링
    */
    const handleChange = (files) => {

        setFiles(files);
        console.log(files);
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
    }
    
    /*
        폼 핸들링
    */
    const onChangeDiaryTitle = (e) => { //제목
        setDiaryTitle(e.target.value);
    }
    const onChangeDiaryContent = (e) => { //내용
        setDiaryContent(e.target.value);
    }
    const radioChange = (e) => { //공개여부
        console.log(e.target.value);
        setIsPublic(e.target.value);
    };
    const onChangeFavorite = (e) => { //즐겨찾기 체크
        setIsFavorite(e.target.checked);
    }
    const onSubmitForm = (e) => {
        e.preventDefault();
        if(!diaryTitle || !diaryTitle.trim()){
            return alert('제목을 작성하세요.');
        }
        if(!diaryContent || !diaryContent.trim()){
            return alert('내용을 작성하세요.');
        }
        const formData = new FormData();
            imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('content', text);
        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        })

    }

    return(

        <Paper variant="outlined">
            <form  noValidate autoComplete="off" className={classes.root} style={{marginTop:"1%", marginBottom:"2%"}}>
                    <Grid container>
                        <Grid item md={3}/>
                        <Grid item md={6}>
                            <TextField required id="standard-required" label="제목" value={diaryTitle} onChange={onChangeDiaryTitle}/>
                        </Grid>
                        <Grid item md={3}/>
                        <Grid item md={3}/>
                        <Grid item md={6}>
                            <TextField
                                id="outlined-multiline-static"
                                label="내용"
                                multiline
                                rows="20"
                                variant="outlined"
                                required={true}
                                value={diaryContent}
                                onChange={onChangeDiaryContent}
                            />
                        </Grid>
                        <Grid item md={3}/>
                        </Grid>
                        <Grid container>
                            <Grid item md={3}/>
                            <Grid item md={3} style={{marginLeft: 10}}>
                                <DropzoneArea
                                    onChange={handleChange}
                                    dropzoneText="이미지 추가하기"
                                    dropzoneClass={classes.dropZone}
                                />
                            </Grid>
                            <Grid item md={5}>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <h3>저장위치</h3>
                                    <Select
                                        required={true}
                                        native
                                        // value={}
                                        onChange={handleChange}
                                        // inputProps={{
                                        //     name: 'age',
                                        //     id: 'outlined-age-native-simple',
                                        // }}
                                        style={{height:"30px", width:"100%", textAlign:"right", }}
                                    >
                                        <option aria-label="None" value="" />
                                        <option value={10}>Ten</option>
                                        <option value={20}>Twenty</option>
                                        <option value={30}>Thirty</option>
                                    </Select>
                                {/*    중요도*/}
                                    
                                    <div>
                                        <h3>공개여부</h3>
                                        {/*공개여부*/}
                                        <RadioGroup row aria-label="position" name="position" defaultValue="top" value={isPublic} onChange={radioChange}>
                                            <FormControlLabel
                                                value="publicDiary"
                                                control={<Radio color="primary" />}
                                                label="공개"
                                                labelPlacement="end"
                                            />
                                            <FormControlLabel
                                                value="privateDiary"
                                                control={<Radio color="primary" />}
                                                label="비공개"
                                                labelPlacement="end"
                                            />
                                        </RadioGroup>
                                        <FormControlLabel
                                            checked={isFavorite}
                                            control={<Checkbox color="primary" />}
                                            label="즐겨찾기"
                                            labelPlacement="start"
                                            style={{marginLeft:0, marginTop:2}}
                                            onChange={onChangeFavorite}
                                        />
                                    </div>
                                </FormControl>
                                <Button variant="outlined" color="primary" style={{marginTop:"32%", marginLeft:"10%"}}>
                                    작성하기
                                </Button>
                        </Grid>
                    </Grid>
            </form>
        </Paper>


    )
}

WritePage.getInitialProps = async (context) => {
    const state = context.store.getState();

    console.log("stateee" , state);

}

export default WritePage;