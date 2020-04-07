import React, {useCallback, useRef, useState} from "react";
import {Avatar, Button, makeStyles, TextField} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import {EDIT_USER_REQUEST, USER_EDITFORM_REQUEST} from "../reducers/user";
import {useDispatch, useSelector} from "react-redux";
import {DropzoneArea, DropzoneDialog} from "material-ui-dropzone";
import {UPLOAD_IMAGES_REQUEST, UPLOAD_PROFILE_REQUEST} from "../reducers/diary";


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
const MyInfoEdit = ({loginUser}) => {
    // console.log('MyInfoEdit', loginUser.ProfileImage[0]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const {isEditing, profileImagePath, personalUser} = useSelector(state => state.user);
    const user = personalUser ? personalUser : loginUser; //페이지가 자기 페이지인지, 다른 유저 페이지인지 구분해서 user 분기처리
    const userProfileImage = user.ProfileImage[0] && user.ProfileImage[0].src;

    // console.log('MyInfo', user.ProfileImage[0].src);

    //정규표현식
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    const nameRegex = /^[가-힣]{1,4}$/;
    const passwordRegExp = /^[a-zA-z0-9]{8,20}$/;


    const [editEmail, setEditEmail] = useState(user.email && user.email);
    const [editUserName, setEditUserName] = useState(user.userName && user.userName);
    const [editPassword, setEditPassword] = useState('');
    const [editPasswordConfirm, setEditPasswordConfirm] = useState('');
    const [isDropzoneOpend, setIsDropzoneOpend] = useState(false);
    const [profileImage, setProfileImage] = useState([]);
    const imageInput = useRef(''); //이미지 input ref

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
        // if(!editEmail){
        //     return alert('변경할 이메일을 입력해주세요.');
        // }
        if(!editUserName){
            return alert('변경할 이름을 입력해주세요.');
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
                profileImagePath: profileImagePath,
            }
        });
        dispatch({
            type: USER_EDITFORM_REQUEST
        });
    }, [editUserName, editEmail, editPassword, editPasswordConfirm]);

    const onEditCancel = useCallback(() => {
        dispatch({
            type: USER_EDITFORM_REQUEST
        })
    }, [isEditing]);

    const onClickEmail= () => {
        return alert('이메일은 변경이 불가능합니다.');
    };

    const onDropzone = () => {
        setIsDropzoneOpend(true);
    };

    const onSaveDropzone = (file) => {
        setProfileImage(file);
        setIsDropzoneOpend(false);
    };

    const onCloseDropzone = () => {
        setIsDropzoneOpend(false);
    };

    //이미지 업로드 버튼 클릭
    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    //실제로 이미지 업로드 했을 때
    const onChangeImages = useCallback((e) => {
        const imageFormData = new FormData();
        // imageFormData.append('image', e.target.file);
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_PROFILE_REQUEST,
            data: imageFormData,
        })
    }, []);

    return (
        <>
            <Button style={{float:"right"}} onClick={onEditCancel}><ClearIcon /></Button>
            <Button style={{float:"right"}} onClick={onComplete}><DoneIcon /></Button>
            <div>내 정보 페이지 </div>
            <div>
                    <Avatar
                        alt="Remy Sharp"
                        src={ profileImagePath ?  `http://localhost:3603/${profileImagePath}` : userProfileImage  ? `http://localhost:3603/${userProfileImage}` : userProfileImage}
                        className={classes.avatar}
                        onClick={onClickImageUpload}
                    />
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
            </div>
            {/*내 정보 텍스트 필드*/}
            <div className={classes.textFieldWrapper}>
                <TextField required id="standard-required-email" label="이메일" value={editEmail} onClick={onClickEmail} className={classes.textFields} onChange={onChangeEditEmail} disabled/>
                <TextField required id="standard-required-name" label="이름" value={editUserName} className={classes.textFields} onChange={onChangeEditUserName}/>
                <TextField
                    id="standard-password-input"
                    label="비밀번호"
                    type="password"
                    value={editPassword}
                    className={classes.textFields}
                    onChange={onChangeEditPassword}
                />
                <TextField
                    id="standard-password-confirm-input"
                    label="비밀번호 확인"
                    type="password"
                    className={classes.textFields}
                    value={editPasswordConfirm}
                    onChange={onChangeEditPasswordConfirm}
                />
            </div>
        </>
    );
}

export default MyInfoEdit;