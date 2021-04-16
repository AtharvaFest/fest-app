import axios from 'axios'

import {
    SIGN_UP,
    LOG_IN,
    LOG_OUT
} from './type'


export const signUpAction = (formValue) => {
    return async (dispatch) => {
        const response = await axios.post('/signup',{...formValue});
        localStorage.setItem('token',response.data.token);
        dispatch({type:SIGN_UP,payload:response.data});
    }
}

export const loginAction = (formValue) => {
    return async (dispatch) => {
        const response = await axios.post('/login',{...formValue});
        localStorage.setItem('token',response.data.token);
        dispatch({type:LOG_IN,payload:response.data});
    }
}

export const logoutAction = () => {
    return async (dispatch) => {
        await axios.get('/logout');
        localStorage.removeItem('token');
        dispatch({type:LOG_OUT})
    }
}

