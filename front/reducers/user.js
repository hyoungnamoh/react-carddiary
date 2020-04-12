//유저 정보 store
import produce from "immer";
import {UPLOAD_PROFILE_FAILURE, UPLOAD_PROFILE_REQUEST, UPLOAD_PROFILE_SUCCESS} from "./diary";

export const initialState = { //초기값
    isLoggingOut: false, //로그아웃 시도중
    isLoggingIn: false, //로그인 시도중
    logInErrorReason: '', //로그인 실패 사유
    isSignedUp: false, //회원가입 성공
    isSigningUp: false, //회원가입 시도중
    signUpErrorReason: '', //회원가입 실패 사유
    loginUser: null, //로그인한 유저
    personalUser: null, //로그인한 유저가 아닌 다른 유저정보
    isEditing: false, //수정중 상태
    profileImagePath: '', //프로필 이미지 미리보기 경로
    followingList: [],
    followerList: [],
};

//로그인하는 액션
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

//로그아웃하는 액션
export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

//회원가입하는 액션
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'; 
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

//사용자 정보 불러오는 액션
export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

//사용자 정보 변경 액션
export const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_FAILURE = 'EDIT_USER_FAILURE';

//팔로워 추가하는 액션
export const ADD_FOLLOW_REQUEST = 'ADD_FOLLOW_REQUEST';
export const ADD_FOLLOW_SUCCESS = 'ADD_FOLLOW_SUCCESS';
export const ADD_FOLLOW_FAILURE = 'ADD_FOLLOW_FAILURE';

//팔로잉 목록 가져오는 액션
export const LOAD_FOLLOWINGLIST_REQUEST = 'LOAD_FOLLOWINGLIST_REQUEST';
export const LOAD_FOLLOWINGLIST_SUCCESS = 'LOAD_FOLLOWINGLIST_SUCCESS';
export const LOAD_FOLLOWINGLIST_FAILURE = 'LOAD_FOLLOWINGLIST_FAILURE';

//팔로잉 목록 가져오는 액션
export const LOAD_FOLLOWERLIST_REQUEST = 'LOAD_FOLLOWERLIST_REQUEST';
export const LOAD_FOLLOWERLIST_SUCCESS = 'LOAD_FOLLOWERLIST_SUCCESS';
export const LOAD_FOLLOWERLIST_FAILURE = 'LOAD_FOLLOWERLIST_FAILURE';


//팔로잉 취소하는 액션
export const REMOVE_FOLLOW_REQUEST = 'REMOVE_FOLLOW_REQUEST';
export const REMOVE_FOLLOW_SUCCESS = 'REMOVE_FOLLOW_SUCCESS';
export const REMOVE_FOLLOW_FAILURE = 'REMOVE_FOLLOW_FAILURE';

//사용자 수정 중 상태 액션
export const USER_EDITFORM_REQUEST = 'USER_EDITFORM_REQUEST';



//setState
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST : {
                draft.isLoggingIn= true;
                draft.logInErrorReason = null;
                draft.isLoading = true;
                break;
            }
            case LOG_IN_SUCCESS: {
                draft.isLoggingIn = false;
                draft.loginUser = action.data;
                draft.isLoading = false;
                break;
            }

            case LOG_IN_FAILURE : {
                draft.isLoggingIn = false;
                draft.logInErrorReason = action.error;
                draft.isLoading = false;
                break;
            }
            case SIGN_UP_REQUEST : {
                draft.isSigningUp = true;
                draft.signUpErrorReason = '';
                break;
            }
            case SIGN_UP_SUCCESS : {
                draft.isSigningUp = false;
                draft.isSignedUp = true;
                break;
            }
            case SIGN_UP_FAILURE : {
                draft.isSigningUp = false;
                draft.signUpErrorReason = action.error;
                break;
            }
            case LOG_OUT_REQUEST : {
                draft.isLoggingOut = true;
                draft.logInErrorReason = '';
                break;
            }
            case LOG_OUT_SUCCESS : {
                draft.isLoggingOut= false;
                draft.loginUser= null;
                break;
            }
            case LOG_OUT_FAILURE : {
                draft.isLoggingOut= false;
                console.log(action.error);
                break;
            }
            case LOAD_USER_REQUEST : {
                draft.personalUser = null;
                break;
            }
            case LOAD_USER_SUCCESS : {
                if (action.loginUser) {
                    draft.loginUser = action.data;
                    break;
                }
                // draft.loginUser = action.data;
                draft.personalUser = action.data;
                break;
            }
            case LOAD_USER_FAILURE : {
                draft.isSigningUp= false;
                console.log(action.error);
                break;
            }
            case EDIT_USER_REQUEST : {
                break;
            }
            case EDIT_USER_SUCCESS : {
                draft.profileImagePath = null;
                draft.loginUser = action.data;
                break;
            }
            case EDIT_USER_FAILURE : {
                console.log(action.error);
                break;
            }
            case USER_EDITFORM_REQUEST: {
                draft.isEditing = !draft.isEditing;
                break;
            }
            case UPLOAD_PROFILE_REQUEST: {
                break;
            }
            case UPLOAD_PROFILE_SUCCESS: {
                draft.profileImagePath = action.data;
                break;
            }
            case UPLOAD_PROFILE_FAILURE: {
                break;
            }
            case ADD_FOLLOW_REQUEST: {
                break;
            }
            case ADD_FOLLOW_SUCCESS: {
                draft.followingList = [];
                action.data.forEach((d) => {
                    draft.followingList.push(d);
                });
                break;
            }
            case ADD_FOLLOW_FAILURE: {
                break;
            }
            case LOAD_FOLLOWINGLIST_REQUEST: {
                break;
            }
            case LOAD_FOLLOWINGLIST_SUCCESS: {
                draft.followingList = [];
                action.data.forEach((d) => {
                    draft.followingList.push(d);
                });
                break;
            }
            case LOAD_FOLLOWINGLIST_FAILURE: {
                break;
            }
            case LOAD_FOLLOWERLIST_REQUEST: {
                break;
            }
            case LOAD_FOLLOWERLIST_SUCCESS: {
                draft.followerList = [];
                action.data.forEach((d) => {
                    draft.followerList.push(d);
                });
                break;
            }
            case LOAD_FOLLOWERLIST_FAILURE: {
                break;
            }
            case REMOVE_FOLLOW_REQUEST: {
                break;
            }
            case REMOVE_FOLLOW_SUCCESS: {
                const index = draft.followingList.findIndex(v => v.id === action.data);
                draft.followingList.splice(index, 1);
                break;
            }
            case REMOVE_FOLLOW_FAILURE: {
                break;
            }
            default : {
              break;
            }
        }
    });
};
//reducer와 initialState는 자주 쓰이므로 export 함
export default reducer;