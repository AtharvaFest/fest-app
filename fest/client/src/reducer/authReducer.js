import {
    SIGN_UP,
    LOG_IN,
    LOG_OUT,
    ADMIN_LOGIN,
    ADMIN_LOGOUT
} from '../action/type'

const INITIAL_STATE ={
    isLogin:null,
    userData:null
}


export const userAuthReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case SIGN_UP:
            return {...state,isLogin:true,userData:action.payload}
        case LOG_IN:
            return {...state,isLogin:true,userData:action.payload}
        case LOG_OUT:
            return {...state,isLogin:false,userData:null}
        default:
            return state
    }
}

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