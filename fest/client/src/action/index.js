import axios from 'axios'
import {
    SIGN_UP,
    LOG_IN,
    LOG_OUT,
    ADMIN_LOGIN,
    // ADMIN_LOGOUT
    ADMIN_ALL_USERS,
    USER_DELETE,
    USER_EDIT
} from './type'

///////////////////////////////////////////////
////USER ACTION
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

///////////////////////////////////////////////
////ADMIN ACTION

export const adminLoginAction = (formValue) => {
    return async (dispatch) => {
        const response = await axios.post('/adminlogin',{...formValue});
        localStorage.setItem('adminToken',response.data.token);
        dispatch({type:ADMIN_LOGIN,payload:response.data});
    }
}

export const adminAllUsersAction = () => {
    return async (dispatch) => {
        const response = await axios.get('/users');
        dispatch({type:ADMIN_ALL_USERS,payload:response.data});
    }
}

export const deleteUserAction = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`/user/${id}`);
        dispatch({type:USER_DELETE,payload:response.data});
    }
}

export const editUserAction = (formValue,id) => {
    return async (dispatch) => {
        const response = await axios.patch(`/user/${id}`,{...formValue});
        dispatch({type:USER_EDIT,payload:response.data});
    }
}

