import React, {useCallback, useRef, useState} from 'react';
import {LOG_OUT_REQUEST} from "../reducers/user";
import {useDispatch} from "react-redux";

const Main = () => {
    const dispatch = useDispatch();

    const onLogOut = useCallback(() => {
        //로그아웃 하시겠습니까? 추가
        dispatch({
            type:LOG_OUT_REQUEST,
        });
    }, []);
    return (
        <div>
            <input type="button" onClick={onLogOut} value="로그아웃"/>
        </div>
    );
};


export default Main;