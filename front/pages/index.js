import React, {useCallback, useEffect, useRef, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Link from 'next/link';
import {LOAD_USER_REQUEST, LOG_IN_REQUEST} from "../reducers/user";
import Router from "next/router";
import {useDispatch, useSelector} from "react-redux";
import SignInIndex from '../components/signInIndex';
import Main from "../components/main";





const Index = () => {
    const { user } = useSelector(state => state.user);
    return (
        <>
            {user ?
                <Main/>
                :
                <SignInIndex/>
            }
        </>
    );
};

export default Index;