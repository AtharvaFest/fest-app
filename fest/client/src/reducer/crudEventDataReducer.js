import {
    READ_EVENT,
    EVENT_DELETE
} from '../action/type'

const INITIAL_STATE ={allEvents:null}

export const adminCRUDEventReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case READ_EVENT:
            return {...state,allEvents:action.payload}
        case EVENT_DELETE:
            const allEvents = state.allEvents.filter(event =>event._id !== action.payload.event._id);
            return {...state,allEvents}
        default:
            return state
    }

}
