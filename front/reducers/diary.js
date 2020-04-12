import produce from 'immer';

export const initialState = {
    imagePaths:[], //이미지 경로
    loginUserCardDiaries:[], //다이어리들
    cardDiaries:[], //다이어리들
    cardDiary:{}, //개별 다이어리
    isDiaryAdding: false, //프로그래스바 로딩중
    diaryAdded: false, //글작성 완료(route)
    favoriteDiaries:[], //별 누른 다이어리들
    hasMoreDiary: false, //더 불러올 다이어리가 있는지

};

//이미지 업로드하는 액션
export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

//프로필 이미지 업로드하는 액션
export const UPLOAD_PROFILE_REQUEST = 'UPLOAD_PROFILE_REQUEST';
export const UPLOAD_PROFILE_SUCCESS = 'UPLOAD_PROFILE_SUCCESS';
export const UPLOAD_PROFILE_FAILURE = 'UPLOAD_PROFILE_FAILURE';

//다이어리 업로드하는 액션
export const ADD_DIARY_REQUEST = 'ADD_DIARY_REQUEST';
export const ADD_DIARY_SUCCESS = 'ADD_DIARY_SUCCESS';
export const ADD_DIARY_FAILURE = 'ADD_DIARY_FAILURE';

//자신의 다이어리들 가져오는 액션
export const LOAD_USER_DIARIES_REQUEST = 'LOAD_USER_DIARIES_REQUEST';
export const LOAD_USER_DIARIES_SUCCESS = 'LOAD_USER_DIARIES_SUCCESS';
export const LOAD_USER_DIARIES_FAILURE = 'LOAD_USER_DIARIES_FAILURE';

//즐겨찾기 별 누르는 액션
export const ONCLICK_FAVORITE_REQUEST = 'ONCLICK_FAVORITE_REQUEST';
export const ONCLICK_FAVORITE_SUCCESS = 'ONCLICK_FAVORITE_SUCCESS';
export const ONCLICK_FAVORITE_FAILURE = 'ONCLICK_FAVORITE_FAILURE';

//첫 로딩 시 즐겨찾기 가져오는 액션
export const LOAD_FAVORITE_REQUEST = 'LOAD_FAVORITE_REQUEST';
export const LOAD_FAVORITE_SUCCESS = 'LOAD_FAVORITE_SUCCESS';
export const LOAD_FAVORITE_FAILURE = 'LOAD_FAVORITE_FAILURE';

//완료 후 다시 added 초기화 해주는 액션
export const ADDED_DAIRY_SWITCHING = 'ADDED_DAIRY_SWITCHING';

//다이어리 하나 불러오는 액션
export const LOAD_DIARY_REQUEST = 'LOAD_DIARY_REQUEST';
export const LOAD_DIARY_SUCCESS = 'LOAD_DIARY_SUCCESS';
export const LOAD_DIARY_FAILURE = 'LOAD_DIARY_FAILURE';

//모든 다이어리 가져오는 액션
export const LOAD_DIARIES_REQUEST = 'LOAD_DIARIES_REQUEST';
export const LOAD_DIARIES_SUCCESS = 'LOAD_DIARIES_SUCCESS';
export const LOAD_DIARIES_FAILURE = 'LOAD_DIARIES_FAILURE';

//모든 다이어리 가져오는 액션
export const DELETE_DIARY_REQUEST = 'DELETE_DIARY_REQUEST';
export const DELETE_DIARY_SUCCESS = 'DELETE_DIARY_SUCCESS';
export const DELETE_DIARY_FAILURE = 'DELETE_DIARY_FAILURE';

//다이어리 수정하는 액션
export const EDIT_DIARY_REQUEST = 'EDIT_DIARY_REQUEST';
export const EDIT_DIARY_SUCCESS = 'EDIT_DIARY_SUCCESS';
export const EDIT_DIARY_FAILURE = 'EDIT_DIARY_FAILURE';

const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case UPLOAD_IMAGES_REQUEST: {
                draft.imagePaths = [];
                break;
            }
            case UPLOAD_IMAGES_SUCCESS: {
                action.data.forEach((p) => {
                    draft.imagePaths.push(p);
                });
                break;
            }
            case UPLOAD_IMAGES_FAILURE: {
                break;
            }
            case ADD_DIARY_REQUEST: {
                draft.isDiaryAdding = true;
                draft.diaryAdded = false;
                break;
            }
            case ADD_DIARY_SUCCESS: {
                draft.cardDiaries.unshift(action.data);
                draft.imagePaths = [];
                draft.isDiaryAdding = false;
                draft.diaryAdded = true;
                break;
            }
            case ADD_DIARY_FAILURE: {
                draft.isDiaryAdding = false;
                break;
            }
            case ADDED_DAIRY_SWITCHING: {
                draft.diaryAdded = false;
            }
            case LOAD_USER_DIARIES_REQUEST: {
                draft.loginUserCardDiaries = [];
                // draft.cardDiaries = !action.lastId ? [] : draft.cardDiaries;
                // draft.hasMorePost = action.lastId ? draft.hasMorePost : true;
                break;
            }
            case LOAD_USER_DIARIES_SUCCESS: {
                action.data.forEach((diary) => {
                    draft.loginUserCardDiaries.push(diary);
                });
                // draft.hasMorePost = action.data.length === 10;
                break;
            }
            case LOAD_USER_DIARIES_FAILURE: {
                break;
            }
            case LOAD_FAVORITE_REQUEST:
            case ONCLICK_FAVORITE_REQUEST: {
                break;
            }
            case LOAD_FAVORITE_SUCCESS:
            case ONCLICK_FAVORITE_SUCCESS: {
                draft.favoriteDiaries = action.data;
                break;
            }
            case LOAD_FAVORITE_FAILURE:
            case ONCLICK_FAVORITE_FAILURE: {
                break;
            }
            case LOAD_DIARY_REQUEST: {
                break;
            }
            case LOAD_DIARY_SUCCESS: {
                draft.cardDiary = action.data;
                break;
            }
            case LOAD_DIARY_FAILURE: {
                break;
            }
            case LOAD_DIARIES_REQUEST: {
                draft.cardDiaries = !action.lastId ? [] : draft.cardDiaries;
                draft.hasMoreDiary = action.lastId ? draft.hasMoreDiary : true;
                break;
            }
            case LOAD_DIARIES_SUCCESS: {
                action.data.forEach((diary) => {
                    draft.cardDiaries.push(diary);
                });
                draft.hasMoreDiary = action.data.length === 5;
                break;
            }
            case LOAD_DIARIES_FAILURE: {
                break;
            }
            case DELETE_DIARY_REQUEST: {
                break;
            }
            case DELETE_DIARY_SUCCESS: {
                const index = draft.cardDiaries.findIndex(v => v.id === action.data);
                draft.cardDiaries.splice(index, 1);
                break;
            }
            case DELETE_DIARY_FAILURE: {
                break;
            }
            case EDIT_DIARY_REQUEST: {
                draft.isDiaryAdding = true;
                draft.diaryAdded = false;
                break;
            }
            case EDIT_DIARY_SUCCESS: {
                draft.imagePaths = [];
                draft.isDiaryAdding = false;
                draft.diaryAdded = true;
                break;
            }
            case EDIT_DIARY_FAILURE: {
                draft.isDiaryAdding = false;
                break;
            }
            default: {
                break;
            }
        }
    });
};
export default reducer;