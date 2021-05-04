import axios from 'axios'
import {
    EMAIL_ACTIVATE,
    LOG_IN,
    LOG_OUT,
    ADMIN_LOGIN,
    ADMIN_LOGOUT,
    ADMIN_ALL_USERS,
    USER_DELETE,
    USER_DELETE_ALL,
    USER_EDIT
} from './type'

///////////////////////////////////////////////
////USER ACTION
export const signUpAction = (formValue) => {
    return async () => {
        await axios.post('/signup',{...formValue});
    }
}

export const emailActivationAction = () => {
    return async (dispatch) => {
        const currentURL = window.location.href.split('/');
        const token = currentURL[currentURL.length-1]
        const response = await axios.post(`/activate_email`,{token});
        localStorage.setItem('token',response.data.token);
        dispatch({type:EMAIL_ACTIVATE,payload:response.data});
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

export const forgotPasswordAction = (formValue) => {
    return async () => {
        await axios.put('/forgot_password',{...formValue});
    }
}

export const resetPasswordAction = (formValue) => {
    return async () => {
        const currentURL = window.location.href.split('/');
        const token = currentURL[currentURL.length-1]
        await axios.patch('/reset_password',{...formValue,token});
    }
}

///////////////////////////////////////////////
////ADMIN ACTION

export const adminLoginAction = (formValue) => {
    return async (dispatch) => {
        const response = await axios.post('/admin/login',{...formValue});
        localStorage.setItem('adminToken',response.data.token);
        dispatch({type:ADMIN_LOGIN,payload:response.data});
    }
}

export const adminLogoutAction = () => {
    return async (dispatch) => {
        await axios.get('/admin/logout');
        localStorage.removeItem('adminToken');
        dispatch({type:ADMIN_LOGOUT})
    }
}

export const adminAllUsersAction = () => {
    return async (dispatch) => {
        const response = await axios.get('/admin/users');
        dispatch({type:ADMIN_ALL_USERS,payload:response.data});
    }
}

export const deleteUserAction = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`/admin/user/${id}`);
        dispatch({type:USER_DELETE,payload:response.data});
    }
}

export const deleteAllUserAction = () => {
    return async (dispatch) => {
        await axios.delete(`/admin/allUser`);
        dispatch({type:USER_DELETE_ALL});
    }
}

export const editUserAction = (formValue,id) => {
    return async (dispatch) => {
        const response = await axios.patch(`/admin/user/${id}`,{...formValue});
        dispatch({type:USER_EDIT,payload:response.data});
    }
}


////////////////////////////////////////////////////////////
//////// OTHER ACTTIONS


