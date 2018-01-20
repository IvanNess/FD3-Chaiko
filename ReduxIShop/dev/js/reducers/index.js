import {combineReducers} from 'redux';
import UserReducer from './reducer-users';
import ActiveUserReducer from './reducer-active-user';
import ValidatorReducer from './reducer-validator';
import EditReducer from './reducer-edit';
import DelConfirmReducer from './reducer-delConfirm';


const allReducers = combineReducers({
    users: UserReducer,
    activeUser: ActiveUserReducer,
    validator: ValidatorReducer,
    editMode: EditReducer,
    delConfirm: DelConfirmReducer,
});

export default allReducers;