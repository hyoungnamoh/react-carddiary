import React, {useCallback, useState} from 'react';
import {Avatar, Button, Grid, Paper, TextField} from "@material-ui/core";
import {LOAD_FAVORITE_REQUEST, LOAD_USER_DIARIES_REQUEST, ONCLICK_FAVORITE_REQUEST} from "../reducers/diary";
import {useDispatch, useSelector} from "react-redux";
import CardDiary from "../components/CardDiary";
import {makeStyles} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import axios from "axios";
import {EDIT_USER_REQUEST} from "../reducers/user";


const useStyles = makeStyles((theme) => ({
    root:{
      margin:"10%",
    },
    textFieldWrapper: {
        width: '40ch',
        height: "100%",
        position: "relative",
        zIndex: 1,
        top: 0,
        left: 0,
        overflow: "auto",

    },
    textFields:{
        width:'100%',
        marginTop:'10%',
    },
    avatar:{
        width: "85%",
        height: 250,
        marginLeft:"5%",
    },
    diariesContainer: {
        marginTop:"5%",
        marginBottom:"5%",
    }
}));

const CardDiaries = () => {

    const dispatch = useDispatch();
    const {loginUser} = useSelector(state => state.user);
    const {cardDiaries, isFavoriteCard} = useSelector(state => state.diary);
    const [isEditing, setIsEditing] = useState(false); //편집모드
    const [editEmail, setEditEmail] = useState(loginUser.email);
    const [editUserName, setEditUserName] = useState(loginUser.userName);
    const [editPassword, setEditPassword] = useState('');
    const [editPasswordConfirm, setEditPasswordConfirm] = useState('');
    const [setEditEmailExt] = useState('')

    //정규표현식
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const nameRegex = /^[가-힣]{1,4}$/;
    const passwordRegExp = /^[a-zA-z0-9]{8,20}$/;

    const onEdit = useCallback(() => {
        setIsEditing(true);
        setEditPassword('');
        setEditPasswordConfirm('');
    }, [isEditing, editPasswordConfirm, editPassword]);

    const onComplete = useCallback(() => {
        // axios.post('/sign/emailCheck', {
        //     email:editEmail,
        // }).then((result) => {
        //
        //     if(result.data){
        //         extEmail = false;
        //     } else{
        //         extEmail = true;
        //     }});
        // if(!extEmail){
        //     return alert("이미 사용중인 이메일입니다.");
        // }
        if(!editEmail){
            return alert('변경할 이메일을 입력해주세요.')
        }
        if(!editUserName){
            return alert('변경할 이름을 입력해주세요.')
        }
        if(!editPassword){
            return alert('변결할 비밀번호를 입력해주세요.');
        }
        if(!editPasswordConfirm){
            return alert('변결할 비밀번호를 두번 입력해주세요.');
        }
        if(!emailRegex.test(editEmail)){
            return alert('이메일 형식이 올바르지 않습니다.');
        }
        if(!passwordRegExp.test(editPassword)){
            return alert('비밀번호는 영문 숫자 혼용하여 8~20자 입력해주세요.');
        }
        if(editPassword !== editPasswordConfirm){
            return alert('같은 비밀번호를 두번 입력해주세요.');
        }

        dispatch({
            type: EDIT_USER_REQUEST,
            data:{
                userName: editUserName,
                email: editEmail,
                password: editPassword,
            }
        });
        setIsEditing(false);
    }, [editUserName, editEmail, editPassword, editPasswordConfirm]);

    const onChangeEditEmail = useCallback((e) => {
        setEditEmail(e.target.value);
    },[editEmail]);

    const onChangeEditUserName = useCallback((e) => {
        setEditUserName(e.target.value);
    }, [editUserName]);

    const onChangeEditPassword = useCallback((e) => {
        setEditPassword(e.target.value);
    }, [editPassword]);

    const onChangeEditPasswordConfirm = useCallback((e) => {
        setEditPasswordConfirm(e.target.value);
    }, [editPasswordConfirm]);

    const classes = useStyles();


    return (
        <Paper variant="outlined">
            <Grid container>
                <Grid container md={3} >
                    <div className={classes.root}>
                        {isEditing
                            ?
                            // 내 정보 수정
                            <>
                                <Button style={{float:"right"}} onClick={onComplete}><DoneIcon /></Button>
                                <div>내 정보 페이지 </div>
                                <div>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs63AZTe8al7iTmr5BndAyf7QV1UZsS29Qi7DYXIvY8Z1gvMAp&usqp=CAU"
                                        className={classes.avatar}
                                    />
                                </div>
                                {/*내 정보 텍스트 필드*/}
                                <div className={classes.textFieldWrapper}>
                                    <TextField required id="standard-required" label="이메일" value={editEmail} className={classes.textFields} onChange={onChangeEditEmail}/>
                                    <TextField required id="standard-required" label="이름" value={editUserName} className={classes.textFields} onChange={onChangeEditUserName}/>
                                    <TextField
                                        id="standard-password-input"
                                        label="비밀번호"
                                        type="password"
                                        value={editPassword}
                                        className={classes.textFields}
                                        onChange={onChangeEditPassword}
                                    />
                                    <TextField
                                        id="standard-password-input"
                                        label="비밀번호 확인"
                                        type="password"
                                        className={classes.textFields}
                                        value={editPasswordConfirm}
                                        onChange={onChangeEditPasswordConfirm}
                                    />
                                </div>
                            </>
                            :
                            // 내 정보
                            <>
                                <Button style={{float:"right"}} onClick={onEdit}><EditIcon /></Button>
                                <div>내 정보 페이지 </div>

                                <div>
                                    <Avatar
                                        alt="Remy Sharp"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRs63AZTe8al7iTmr5BndAyf7QV1UZsS29Qi7DYXIvY8Z1gvMAp&usqp=CAU"
                                        className={classes.avatar}
                                    />
                                </div>
                                {/*내 정보 텍스트 필드*/}
                                <div className={classes.textFieldWrapper}>
                                    <TextField required id="standard-required" label="이메일" value={loginUser.email} className={classes.textFields}  disabled/>
                                    <TextField required id="standard-required" label="이름" value={loginUser.userName} className={classes.textFields} disabled/>
                                    <TextField
                                        id="standard-password-input"
                                        label="비밀번호"
                                        type="password"
                                        className={classes.textFields}
                                        defaultValue='0000000000'
                                        disabled
                                    />
                                    <TextField
                                        id="standard-password-input"
                                        label="비밀번호 확인"
                                        type="password"
                                        className={classes.textFields}
                                        defaultValue='0000000000'
                                        disabled
                                    />
                                </div>
                            </>
                        }
                    </div>
                </Grid>

                <Grid container md={9} spacing={3} className={classes.diariesContainer}>
                        {cardDiaries.map(v => {
                            return (
                                <CardDiary key={v.id} diary={v}/>
                            )})}
                </Grid>
            </Grid>
        </Paper>
    );
};

CardDiaries.getInitialProps = async (context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type: LOAD_USER_DIARIES_REQUEST,
        data: state.user.loginUser && state.user.loginUser.id,
    });
    context.store.dispatch({
        type: LOAD_FAVORITE_REQUEST,
    });
}
export default CardDiaries;