import {
    EMAIL_ACTIVATE,
    LOG_IN,
    LOG_OUT,
    ADMIN_LOGIN,
    ADMIN_LOGOUT
} from '../action/type'

const INITIAL_STATE ={
    isLogin:null,
    userData:null
}

// Reducer to store USER data of loggedin,signup and loggout
export const userAuthReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case EMAIL_ACTIVATE:
            return {...state,isLogin:true,userData:action.payload}
        case LOG_IN:
            return {...state,isLogin:true,userData:action.payload}
        case LOG_OUT:
            return {...state,isLogin:false,userData:null}
        default:
            return state
    }
}

//Reducer to store ADMIN auth data
export const adminAuthReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case ADMIN_LOGIN:
            return {...state,isLogin:true,userData:action.payload}
        case ADMIN_LOGOUT:
            return {...state,isLogin:false,userData:null}
        default:
            return state
    }
}