import {
    READ_NOTICE,
} from '../action/type'


const INITIAL_STATE ={notices:null}

export const adminCRUDNoticeReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case READ_NOTICE:
            return {...state,notices:action.payload}
        default:
            return state
    }

}