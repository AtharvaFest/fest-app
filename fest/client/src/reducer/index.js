import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form';
import {userAuthReducer,adminAuthReducer} from './authReducer';
import {adminCRUDUserReducer} from './crudUserDataReducer';
import {adminCRUDGalleryReducer} from './crudGalleryDataReducer';
import {adminCRUDNoticeReducer} from './crudNoticeDataReducer';
import {userGetEventsReducer,adminCRUDEventReducer,getEventUpdateReducer} from './crudEventDataReducer';
import {adminCRUDEventRegReducer} from './crudEventRegDataReducer';
import {toastReducer} from './toastReducer';

export default combineReducers({
    form:formReducer,
    userAuthReducer,
    userGetEventsReducer,
    adminAuthReducer,
    adminCRUDUserReducer,
    adminCRUDEventReducer,
    getEventUpdateReducer,
    adminCRUDEventRegReducer,
    adminCRUDGalleryReducer,
    adminCRUDNoticeReducer,
    toastReducer
});