import {
    ADMIN_ALL_USERS,
    USER_DELETE
} from '../action/type'

const INITIAL_STATE ={allUsers:null}

export const adminAllUsersReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case ADMIN_ALL_USERS:
            return {...state,allUsers:action.payload}
        case USER_DELETE:
                const allUsers = state.allUsers.filter(user =>user._id !== action.payload.user._id);
                return {...state,allUsers}
        default:
            return state
    }

}