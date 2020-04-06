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
    loginUser: null,
    isEditing: false, //수정중 상태
    profileImagePath: '', //프로필 이미지 미리보기 경로
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
                break;
            }
            case LOAD_USER_SUCCESS : {
                draft.loginUser= action.data;
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
                console.log('UPLOAD_PROFILE_SUCCESS', action.data);
                draft.profileImagePath = action.data;
                break;
            }
            case UPLOAD_PROFILE_FAILURE: {
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