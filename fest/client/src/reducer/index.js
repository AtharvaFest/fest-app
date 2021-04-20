import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import {userAuthReducer,adminAuthReducer} from '../reducer/authReducer';
import {adminAllUsersReducer} from '../reducer/retriveDataReducer'

export default combineReducers({
    form:formReducer,
    userAuthReducer,
    adminAuthReducer,
    adminAllUsersReducer

});