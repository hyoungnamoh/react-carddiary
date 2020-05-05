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
import {MyInfoStyle} from '../styles/MyInfoStyle';

const MyInfo = () => {
    const dispatch = useDispatch();
    const classes = MyInfoStyle();
    const {isEditing, profileImagePath, personalUser, loginUser, followingList} = useSelector(state => state.user);
    const user = personalUser ? personalUser : loginUser;
    const [isFollowedUser, setIsFollowedUser] = useState(false);
    //내가 팔로잉 하고있는 대상인지 확인
    useEffect(() => {
        if(followingList.length !== 0 && personalUser){
            const followedUser = followingList.filter(v => v.id === personalUser.id);
            setIsFollowedUser(followedUser.length !== 0);
        }
    }, [personalUser]);


    //수정하기 버튼
    const onEdit = useCallback(() => {
        dispatch({
            type: USER_EDITFORM_REQUEST
        })
    }, [isEditing]);

    //팔로우 버튼
    const onClickFollow = useCallback((userId) => () => {
        if(!isFollowedUser){
            dispatch({
                type: ADD_FOLLOW_REQUEST,
                data: userId,
            });
            setIsFollowedUser(true);
        } else{
            dispatch({
                type: REMOVE_FOLLOW_REQUEST,
                data: userId,
            });
            setIsFollowedUser(false);
        }
        return;
    }, [isFollowedUser]);

    return (
        <>
            {loginUser && (!personalUser || loginUser.id === personalUser.id) &&
                <Button style={{float: "right"}} onClick={onEdit}><EditIcon/></Button>
            }
            <div>
                <Avatar
                    alt="Remy Sharp"
                    src={ personalUser ? personalUser.ProfileImage[0].src : loginUser ? loginUser.ProfileImage[0].src :  null}
                    // src={null }
                    // src={ !profileImagePath ? loginUser.ProfileImage[0].src && `http://localhost:3603/${loginUser.ProfileImage[0].src}` : `http://localhost:3603/${profileImagePath}`}
                    className={classes.avatar}
                />
            </div>
            {/*내 정보 텍스트 필드*/}
            <div className={classes.textFieldWrapper}>
                <TextField required id="standard-required-email" value={personalUser && personalUser.email} className={classes.textFields}  disabled/>
                <TextField required id="standard-required-name"  value={personalUser && personalUser.userName} className={classes.textFields} disabled/>
                <TextField
                    id="standard-password-input"
                    label="비밀번호"
                    type="password"
                    className={classes.textFields}
                    value='0000000000'
                    disabled
                />
                <TextField
                    id="standard-password-confirm-input"
                    label="비밀번호 확인"
                    type="password"
                    className={classes.textFields}
                    value='0000000000'
                    disabled
                />
                {loginUser && personalUser && (personalUser.id !== loginUser.id) &&
                    <Button variant="outlined" color="primary" style={{marginTop:'10%', marginLeft:'25%', width:'40%'}} onClick={onClickFollow(personalUser.id)}>
                        {isFollowedUser ? '언팔로우' : '팔로우'}
                    </Button>
                }
            </div>
        </>
    );
};

export default MyInfo;