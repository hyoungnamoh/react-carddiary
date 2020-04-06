import {all, takeLatest, fork, put, call, take, takeEvery, delay} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_IN_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_FAILURE,
    LOG_OUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAILURE, EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAILURE
} from "../reducers/user";
import axios from 'axios';
import {UPLOAD_PROFILE_FAILURE, UPLOAD_PROFILE_REQUEST, UPLOAD_PROFILE_SUCCESS} from "../reducers/diary";



/*
    로그아웃
 */
function logOutAPI() {
    //서버에 요청을 보내는 부분
    return axios.post('/sign/logout', {}, {
        withCredentials: true,
    });
}

function* logOut(action) {
    try{
        const result = yield call(logOutAPI, action.data);//성공 시 다음 줄 실행
        yield put({
            type: LOG_OUT_SUCCESS, //실행
        })
    } catch (e) { //실패 시
        console.error(e);
        yield put({
            type: LOG_OUT_FAILURE
        })
    }
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

/*
    유저 정보가져오기
 */
function loadUserAPI(userId) {
    // 서버에 요청을 보내는 부분
    return axios.get(userId ? `/user/${userId}` : '/user/', {
        withCredentials: true,
    });
}
function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({ // put은 dispatch 동일
            type: LOAD_USER_SUCCESS,
            data: result.data,
            loginUser: !action.data,
        });
    } catch (e) { // loginAPI 실패
        console.error(e);
        yield put({
            type: LOAD_USER_FAILURE,
            error: e,
        });
    }
}
function* watchLoadUser() {
    //(호출되길 기다리는 액션, 호출되면 실행할 함수)
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

/*
    회원가입
 */
function signUpAPI(signUpdata) {
    return axios.post('/sign/signUp', signUpdata);
}
function* signUp(action) {
    try{
        yield call(signUpAPI, action.data);// (함수, 인자)
        yield put({
            type: SIGN_UP_SUCCESS //실행
        })
    } catch (e) { //실패 시
        yield put({
            type: SIGN_UP_FAILURE,
            error: e
        })
    }
}
function* watchSignUp() {
    yield takeEvery(SIGN_UP_REQUEST, signUp);
}

/*
    로그인
 */
function loginAPI(loginData) {
    //서버에 요청을 보내는 부분
    return axios.post('/sign/signIn', loginData, {
        withCredentials: true, //다른 도메인과 쿠키 주고받을 수 있게 함, 추가로 서버쪽에 cors 설정 해줘야 함
    });
}
function* login(action) {
    try{
       const result = yield call(loginAPI, action.data);//성공 시 다음 줄 실행
        yield put({
            type: LOG_IN_SUCCESS, //실행
            data: result.data,
        })
    } catch (e) { //실패 시
        console.error(e);
        yield put({
            type: LOG_IN_FAILURE
        })
    }
}
function* watchLogin() {
    //(호출되길 기다리는 액션, 호출되면 실행할 함수)
    //LOG_IN 액션이 호출되면 login 실행
    yield takeLatest(LOG_IN_REQUEST, login);
}

/*
    유저 정보 수정
 */
function editUserAPI(editData) {
    return axios.patch('/user/edit', editData, {
        withCredentials: true,
    });
}
function* editUser(action) {
    try{
        const result = yield call(editUserAPI, action.data);
        yield put({
            type: EDIT_USER_SUCCESS, //실행
            data: result.data
        })
    } catch (e) { //실패 시
        yield put({
            type: EDIT_USER_FAILURE,
            error: e
        })
    }
}
function* watchEditUser() {
    yield takeEvery(EDIT_USER_REQUEST, editUser);
}

/*
    프로필 이미지 업로드
 */
function uploadProfileAPI(formData) {
    return axios.post(`/user/profile`, formData, {
        withCredentials: true,
    });
}

function* uploadProfile(action) { //action = watch함수에서 받은 req액션안에 값, dispatch할때 같이 있던 값
    try {
        const result = yield call(uploadProfileAPI, action.data);
        yield put({
            type: UPLOAD_PROFILE_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: UPLOAD_PROFILE_FAILURE,
            error: e,
        });
    }
}
function* wathUploadProfile() {
    yield takeLatest(UPLOAD_PROFILE_REQUEST, uploadProfile);
}

//시작점
export default function* userSaga() {
    //watch = 이벤트 리스너
    //all = 이벤트 리스너를 여러개 사용하고 싶을 때 사용, 여러 이펙트를 동시에 실행할 수 있게 함
    yield all ([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchLogOut),
        fork(watchLoadUser),
        fork(watchEditUser),
        fork(wathUploadProfile),
    ]);
}