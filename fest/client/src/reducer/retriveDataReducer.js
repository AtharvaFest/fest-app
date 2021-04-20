import {
    ADMIN_ALL_USERS
} from '../action/type'

const INITIAL_STATE ={allUsers:null}

export const adminAllUsersReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case ADMIN_ALL_USERS:
            return {...state,allUsers:action.payload}
        default:
            return state
    }

}