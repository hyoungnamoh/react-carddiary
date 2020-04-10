import React, {useCallback, useEffect, useState} from "react";
import {Avatar, Button, makeStyles, TextField} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import {useDispatch, useSelector} from "react-redux";
import {
    LOAD_USER_REQUEST,
    USER_EDITFORM_REQUEST,
    ADD_FOLLOW_REQUEST,
    REMOVE_FOLLOW_REQUEST,
    LOAD_FOLLOWINGS_REQUEST
} from "../reducers/user";
import {useRouter} from "next/router";

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
const MyInfo = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const {isEditing, profileImagePath, personalUser, loginUser, followingList} = useSelector(state => state.user);
    const user = personalUser ? personalUser : loginUser;
    const [followText, setFollowText] = useState('팔로우');
    // console.log('MyInfo personalUser', personalUser);
    // console.log('MyInfo loginUser', loginUser);
    // console.log('MyInfo', user.ProfileImage[0].src);
    // console.log(null);
    // console.log('MyInfo', user);
    // console.log('MyInfo', loginUser, personalUser);

    // const router = useRouter();
    // useEffect(() => {
    //     console.log('useEffect');
    //     if (!loginUser){
    //         router.push('/');
    //         return alert('로그인이 필요합니다.');
    //     }
    // }, [loginUser]);

    const onEdit = useCallback(() => {
        dispatch({
            type: USER_EDITFORM_REQUEST
        })
    }, [isEditing]);

    const onClickFollow = (userId) => () => {
        // console.log(userId);

        if(followText === '팔로우'){
            dispatch({
                type: ADD_FOLLOW_REQUEST,
                data: userId,
            });
            setFollowText('팔로우 취소');
            return;
        }
        dispatch({
            type: REMOVE_FOLLOW_REQUEST,
            data: userId,
        });
        setFollowText('팔로우');
        return;
    };
    console.log(user.ProfileImage[0].src);


    return (
        <>
            {(!personalUser || loginUser.id === personalUser.id) &&
                <>
                    <Button style={{float: "right"}} onClick={onEdit}><EditIcon/></Button>
                    <div> 내 정보 페이지 </div>
                </>
            }

            <div>
                <Avatar
                    alt="Remy Sharp"
                    src={ user.ProfileImage[0].src ? `http://localhost:3603/${user.ProfileImage[0].src}` :  null}
                    // src={null }
                    // src={ !profileImagePath ? loginUser.ProfileImage[0].src && `http://localhost:3603/${loginUser.ProfileImage[0].src}` : `http://localhost:3603/${profileImagePath}`}
                    className={classes.avatar}
                />
            </div>
            {/*내 정보 텍스트 필드*/}
            <div className={classes.textFieldWrapper}>
                <TextField required id="standard-required-email" label="이메일" value={user.email} className={classes.textFields}  disabled/>
                <TextField required id="standard-required-name" label="이름" value={user.userName} className={classes.textFields} disabled/>
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
                {personalUser && (personalUser.id !== loginUser.id) &&
                    <Button variant="outlined" color="primary" style={{marginTop:'10%', marginLeft:'25%', width:'40%'}} onClick={onClickFollow(personalUser.id)}>
                        {followText}
                    </Button>
                }
            </div>
        </>
    );
};

export default MyInfo;