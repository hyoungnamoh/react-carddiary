import {all, fork, takeLatest, put, call} from 'redux-saga/effects';
import {

    UPLOAD_IMAGES_SUCCESS,
    UPLOAD_IMAGES_FAILURE,
    UPLOAD_IMAGES_REQUEST, ADD_DIARY_REQUEST, ADD_DIARY_FAILURE, ADD_DIARY_SUCCESS,

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
        console.log("uploadImages action.data", action.data);
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
        console.log("addDiaryaddDiary", result);
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


//시작점
export default function* postSaga() {
    yield all([
        fork(watchUploadImages),
        fork(watchAddPost),
    ]);
}