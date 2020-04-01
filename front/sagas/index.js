import {all, call, fork} from 'redux-saga/effects';
import user from './user';
import axios from "axios";
import diary from "./diary";

//공용으로 사용할 axios base url
axios.defaults.baseURL = 'http://localhost:3603/api';

export default function* rootSaga() {
    yield all([
        fork(user),
        fork(diary),
    ]);
}