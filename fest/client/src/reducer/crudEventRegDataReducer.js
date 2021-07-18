import {
    READ_EVENTREG
} from '../action/type'



const INITIAL_STATE ={eventRegData:null}

export const adminCRUDEventRegReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case READ_EVENTREG:
            return {...state,eventRegData:action.payload}
        default:
            return state
    }

}