import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import {userAuthReducer,adminAuthReducer} from './authReducer';
import {adminCRUDUserReducer} from './crudUserDataReducer';
import {adminCRUDGalleryReducer} from './crudGalleryDataReducer';
import {adminCRUDEventReducer,getEventUpdateReducer} from './crudEventDataReducer';
import {toastReducer} from './toastReducer';

export default combineReducers({
    form:formReducer,
    userAuthReducer,
    adminAuthReducer,
    adminCRUDUserReducer,
    adminCRUDEventReducer,
    getEventUpdateReducer,
    adminCRUDGalleryReducer,
    toastReducer
});