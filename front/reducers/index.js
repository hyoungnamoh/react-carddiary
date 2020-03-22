//root reducer
//흩어져 있는 reducer를 combineReducers 하나로 묶을 수 있음
import {combineReducers} from 'redux';
import user from './user';

const rootReducer = combineReducers({
    user,
});

export default rootReducer;