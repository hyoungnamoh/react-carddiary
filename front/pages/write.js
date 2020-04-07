import React, {useCallback, useEffect, useState} from "react";
import {Button, Grid, Input, InputBase, Paper,FormControlLabel, Radio, Checkbox} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';
import {DropzoneArea, DropzoneDialog} from 'material-ui-dropzone'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import {ADD_DIARY_REQUEST, ADDED_DAIRY_SWITCHING, UPLOAD_IMAGES_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import {useRouter} from "next/router";
import CircularProgress from '@material-ui/core/CircularProgress';
import {blue, green} from '@material-ui/core/colors';
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
    buttonProgress: {
        color: blue[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: 20,
        marginLeft: -13,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    papers:{
        width: "75%",
        marginLeft: "12.5%"
    },
    buttonClassname:{
        padding:"9%"
    }
}));


const WritePage = () => {
    // const { loginUser } = useSelector(state => state.user);
    // const router = useRouter();
    // if(!loginUser){
    //     router.push("/");
    // }
    const dispatch = useDispatch();
    const {imagePaths, cardDiaries, isDiaryAdding, diaryAdded} = useSelector(state => state.diary);
    const router = useRouter();

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
    }
    const onChangeImages = useCallback((files) => { //이미지 업로드
        setFiles(files);
        const imageFormData = new FormData();
        imageFormData.append('image', files);
        [].forEach.call(files, (f) => {
                    imageFormData.append('image', f);
                });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    }, []);

    const handleSave = (files) => {
        //Saving files to state for further use and closing Modal.
        setFiles(files);
        setIsOpened(false);
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
        if(files.length === 0){
            return alert('사진을 첨부해주세요.');
        }
        const formData = new FormData();
            imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('diaryTitle', diaryTitle);
        formData.append('diaryContent', diaryContent);
        formData.append('isPublic', isPublic);
        if(isFavorite){
            formData.append('isFavorite', "isFavorite");
        }
        dispatch({
            type: ADD_DIARY_REQUEST,
            data: formData,
        });

    }

    /*
        글 작성 완료 후 페이지 이동
    */
    useEffect(() => {

        if(diaryAdded){
            dispatch({
                type: ADDED_DAIRY_SWITCHING,
            });
            // router.push('/');
        }

    }, [diaryAdded === true]);
    
    /*
        드랍존 출력 메세지 커스터마이징
    */
    const getFileRemovedMessage = (fileName) => {
        return `${fileName}가 삭제되었습니다!`
    }
    const getFileAddedMessage = (fileName) => {
        return `${fileName}가 추가되었습니다!`
    }
    const getFileLimitExceedMessage = (filesLimit) => {
        return `최대 ${filesLimit}장까지만 첨부할 수 있습니다.`
    }
    const getDropRejectMessage = (rejectedFile, acceptedFiles, maxFileSize) => {
        return `${acceptedFiles} 파일 형식만 첨부할 수 있습니다.`;
    }

    return(

        <Paper variant="outlined" className={classes.papers}>
            <form  noValidate autoComplete="off" className={classes.root} style={{marginTop:"1%", marginBottom:"2%"}} encType={"multipart/form-data"}>
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
                            <Grid item md={6} style={{marginLeft: 10}}>
                                <DropzoneArea
                                    onChange={onChangeImages}
                                    dropzoneText="이미지 추가하기"
                                    dropzoneClass={classes.dropZone}
                                    filesLimit={10}
                                    getFileRemovedMessage={getFileRemovedMessage}
                                    getFileAddedMessage={getFileAddedMessage}
                                    getFileLimitExceedMessage={getFileLimitExceedMessage}
                                    getDropRejectMessage={getDropRejectMessage}
                                    acceptedFiles={['image/*']}

                                />
                            </Grid>
                            <Grid  item md={2}/>
                            {/*옵션 시작*/}
                            <Grid container>
                                <Grid item md={3}/>
                                <Grid item md={2}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <h3>저장위치</h3>
                                        <Select
                                            required={true}
                                            native
                                            style={{height:"30px", width:"100%", textAlign:"right", }}
                                        >
                                            <option aria-label="None" value="" />
                                            <option value={10}>Ten</option>
                                            <option value={20}>Twenty</option>
                                            <option value={30}>Thirty</option>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                {/*공개 여부*/}
                                <Grid item md={2}>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                            <h3>공개여부</h3>
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
                                    </FormControl>
                                </Grid>
                                {/*즐겨찾기*/}
                                <Grid item md={1}>
                                    <FormControlLabel
                                        checked={isFavorite}
                                        control={<Checkbox color="primary" />}
                                        label="즐겨찾기"
                                        labelPlacement="start"
                                        style={{marginLeft:0, marginTop:2}}
                                        onChange={onChangeFavorite}
                                    />

                                </Grid>
                                <Grid item md={1}>
                                    <div className={classes.wrapper} >
                                        <Button variant="outlined"
                                                className={classes.buttonClassname}
                                                disabled={isDiaryAdding}
                                                onClick={onSubmitForm} color="primary" style={{marginTop:"70%"}}>
                                            작성하기
                                        </Button>
                                        {isDiaryAdding && <CircularProgress size={24} className={classes.buttonProgress} />}
                                    </div>
                                </Grid>
                        </Grid>
                    </Grid>

            </form>
        </Paper>


    )
}

WritePage.getInitialProps = async (context) => {
    const state = context.store.getState();

}

export default WritePage;