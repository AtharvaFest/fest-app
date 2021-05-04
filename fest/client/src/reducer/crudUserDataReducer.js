import {
    ADMIN_ALL_USERS,
    USER_DELETE,
    USER_DELETE_ALL,
    USER_EDIT
} from '../action/type'

const INITIAL_STATE ={allUsers:null}

export const adminCRUDUserReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case ADMIN_ALL_USERS:
            return {...state,allUsers:action.payload}
        case USER_DELETE:
                const allUsers = state.allUsers.filter(user =>user._id !== action.payload.user._id);
                return {...state,allUsers}
        case USER_DELETE_ALL:
                return {...state,allUsers:''}
        case USER_EDIT:
                const filteredUsers = state.allUsers.map(user =>{
                    if(user._id !== action.payload._id){
                        return user
                    }
                    if(user._id === action.payload._id){
                        return action.payload
                    }
                    return null
                });

                return {...state,allUsers:filteredUsers}
        default:
            return state
    }

}