import {all, fork, takeLatest, put, call} from 'redux-saga/effects';
import {

    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST,
    ADD_DIARY_REQUEST,
    ADD_DIARY_FAILURE,
    ADD_DIARY_SUCCESS,
    LOAD_USER_DIARIES_REQUEST,
    LOAD_USER_DIARIES_SUCCESS,
    LOAD_USER_DIARIES_FAILURE,
    ONCLICK_FAVORITE_REQUEST,
    ONCLICK_FAVORITE_SUCCESS,
    ONCLICK_FAVORITE_FAILURE, LOAD_FAVORITE_REQUEST, LOAD_FAVORITE_SUCCESS, LOAD_FAVORITE_FAILURE,

} from "../reducers/diary";
import axios from 'axios';



/*
    이미지 업로드
 */
function uploadImagesAPI(formData) {
    return axios.post(`/diary/images`, formData, {
        withCredentials: true,
    });
}

function* uploadImages(action) { //action = watch함수에서 받은 req액션안에 값, dispatch할때 같이 있던 값
    try {
        const result = yield call(uploadImagesAPI, action.data);
        yield put({
            type: UPLOAD_IMAGES_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        yield put({
            type: UPLOAD_IMAGES_FAILURE,
            error: e,
        });
    }
}
function* watchUploadImages() {
    yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}

/*
    다이어리 작성
 */
function addDiaryAPI(diaryData) {
    return axios.post('/diary', diaryData, {
        withCredentials: true,
    });
}
function* addDiary(action) {
    try {
        const result = yield call(addDiaryAPI, action.data);
        yield put({
            type:ADD_DIARY_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: ADD_DIARY_FAILURE,
            error: e,
        });
    }
}
function* watchAddPost() {
    yield takeLatest(ADD_DIARY_REQUEST, addDiary);
}

/*
    유저 다이어리들 가져오기
 */
function loadUserDiariesAPI(id) {
    return axios.get(`/diaries/${id || 0}`, {
        withCredentials: true,
    });
}

function* loadUserDiaries(action) {
    try {
        const result = yield call(loadUserDiariesAPI, action.data);
        // console.log("loadUserDiaries", result.data);
        yield put({
            type:LOAD_USER_DIARIES_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: LOAD_USER_DIARIES_FAILURE,
            error: e,
        });
    }
}
function* watchLoadUserDiaries() {
    yield takeLatest(LOAD_USER_DIARIES_REQUEST, loadUserDiaries);
}
/*
    즐겨찾기 추가
 */
function onClickFavoriteAPI(diaryId) {
    // console.log("onClickFavoriteAPI", diaryId);
    return axios.patch(`/diary/favorite`, diaryId, {
        withCredentials: true,
    });
}

function* onClickFavorite(action) {
    try {
        const result = yield call(onClickFavoriteAPI, action.data);
        // console.log("onClickFavorite", result.data);
        yield put({
            type:ONCLICK_FAVORITE_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: ONCLICK_FAVORITE_FAILURE,
            error: e,
        });
    }
}
function* watchOnclickFavorite() {
    yield takeLatest(ONCLICK_FAVORITE_REQUEST, onClickFavorite);
}

/*
    즐겨찾기 목록 가져오기
 */
function loadFavoriteAPI() {
    return axios.patch(`/diaries/favorite`, {}, {
        withCredentials: true,
    });
}

function* loadFavorite() {
    try {
        const result = yield call(loadFavoriteAPI);
        yield put({
            type:LOAD_FAVORITE_SUCCESS,
            data: result.data,
        });
    }catch (e) {
        console.log(e);
        yield put({
            type: LOAD_FAVORITE_FAILURE,
            error: e,
        });
    }
}
function* watchLoadFavorite() {
    yield takeLatest(LOAD_FAVORITE_REQUEST, loadFavorite);
}

//시작점
export default function* postSaga() {
    yield all([
        fork(watchUploadImages),
        fork(watchAddPost),
        fork(watchLoadUserDiaries),
        fork(watchOnclickFavorite),
        fork(watchLoadFavorite),
    ]);
}