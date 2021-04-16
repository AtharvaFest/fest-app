import {SIGN_UP,LOG_IN,LOG_OUT} from '../action/type'

const INITIAL_STATE ={
    isLogin:null,
    userData:null
}


const signUpReducer = (state=INITIAL_STATE,action) => {

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

export default signUpReducer