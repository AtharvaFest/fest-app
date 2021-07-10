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
    USER_EDIT,
    READ_EVENT,
    EVENT_DELETE,
    EVENT_DELETE_ALL,
    GET_EVENT_TO_UPDATE,
    EVENT_UPDATE,
    READ_GALLERY
} from './type'

///////////////////////////////////////////////
////USER 

//AUTH ACTION
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
        const token = currentURL[currentURL.length-1];
        await axios.patch('/reset_password',{...formValue,token});
    }
}



///////////////////////////////////////////////
////ADMIN ACTION

//Auth action
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

//USER ACTIONS
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

//EVENT ACTIONS 
export const createEventsAction = (formValue) => {
    return async (dispatch) => {
        const response = await axios.post('/admin/event/create',{...formValue});
        dispatch({type:READ_EVENT,payload:response.data});
    }
}

//To update an event
export const eventUpdateAction = (id,formValue) => {
    return async (dispatch) => {
        const response = await axios.patch(`/admin/event/update/${id}`,{...formValue});
        dispatch({type:EVENT_UPDATE,payload:response.data});
    }
}

// To get data of event to update 
export const getEventUpdateAction = (id) => {
    return async (dispatch) => {
        const response = await axios.get(`/admin/event/toUpdate/${id}`);
        dispatch({type:GET_EVENT_TO_UPDATE,payload:response.data});
    }
}

export const readEventsAction = () => {
    return async (dispatch) => {
        
        const response = await axios.get('/admin/event/read');
        dispatch({type:READ_EVENT,payload:response.data});
    }
}

export const deleteEventAction = (id) => {
    return async (dispatch) => {
        const response = await axios.delete(`/admin/event/delete/${id}`);
        dispatch({type:EVENT_DELETE,payload:response.data});
    }
}

export const deleteAllEventAction = () => {
    return async (dispatch) => {
        await axios.delete(`/admin/allEvent`);
        dispatch({type:EVENT_DELETE_ALL});
    }
}

// GALLERY ACTION
export const readGalleryAction = () => {
    return async (dispatch) => {
        
        const response = await axios.get('/admin/gallery/read');
        dispatch({type:READ_GALLERY,payload:response.data});
    }
}

export const addPhotoAction = (formData) => {
    return async (dispatch) => {
        
        const response = await axios.post('/admin/gallery/add',formData);
        dispatch({type:READ_GALLERY,payload:response.data});
    }
}

////////////////////////////////////////////////////////////
//////// OTHER ACTTIONS


