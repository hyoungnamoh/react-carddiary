import React, {useCallback, useEffect, useState} from "react";
import {Avatar, Button, makeStyles, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_USER_REQUEST, USER_EDITFORM_REQUEST} from "../reducers/user";

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
const MyInfo = ({loginUser}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {isEditing, profileImagePath} = useSelector(state => state.user);

    // useEffect(() => {
    //     dispatch({
    //         type: LOAD_USER_REQUEST
    //     })
    //     console.log('useEffect', loginUser);
    // }, []);
    // console.log('MyInfo loginUser', loginUser);


    const onEdit = useCallback(() => {
        dispatch({
            type: USER_EDITFORM_REQUEST
        })
    }, [isEditing]);

    console.log("loginUser.ProfileImage", loginUser.ProfileImage);
    return (
        <>
            <Button style={{float:"right"}} onClick={onEdit}><EditIcon /></Button>
            <div>내 정보 페이지 </div>

            <div>
                <Avatar
                    alt="Remy Sharp"
                    src={ profileImagePath ? `http://localhost:3603/${profileImagePath}` : loginUser.ProfileImage ? `http://localhost:3603/${loginUser.ProfileImage[0].src}` :  ''}
                    className={classes.avatar}
                />
            </div>
            {/*내 정보 텍스트 필드*/}
            <div className={classes.textFieldWrapper}>
                <TextField required id="standard-required-email" label="이메일" value={loginUser.email} className={classes.textFields}  disabled/>
                <TextField required id="standard-required-name" label="이름" value={loginUser.userName} className={classes.textFields} disabled/>
                <TextField
                    id="standard-password-input"
                    label="비밀번호"
                    type="password"
                    className={classes.textFields}
                    defaultValue='0000000000'
                    disabled
                />
                <TextField
                    id="standard-password-confirm-input"
                    label="비밀번호 확인"
                    type="password"
                    className={classes.textFields}
                    defaultValue='0000000000'
                    disabled
                />
            </div>
        </>
    );
};

export default MyInfo;