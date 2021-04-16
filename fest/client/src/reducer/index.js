import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import authReducer from '../reducer/authReducer'

export default combineReducers({
    form:formReducer,
    authReducer
});