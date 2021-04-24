import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import {userAuthReducer,adminAuthReducer} from '../reducer/authReducer';
import {adminCRUDUserReducer} from '../reducer/crudUserDataReducer'

export default combineReducers({
    form:formReducer,
    userAuthReducer,
    adminAuthReducer,
    adminCRUDUserReducer

});