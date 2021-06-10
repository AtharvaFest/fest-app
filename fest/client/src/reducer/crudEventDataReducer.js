import {
    READ_EVENT,
    EVENT_DELETE,
    EVENT_DELETE_ALL,
    GET_EVENT_TO_UPDATE,
    EVENT_UPDATE
} from '../action/type'

const INITIAL_STATE ={allEvents:null}

export const adminCRUDEventReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case READ_EVENT:
            return {...state,allEvents:action.payload}
        case EVENT_DELETE:
            const allEvents = state.allEvents.filter(event =>event._id !== action.payload.event._id);
            return {...state,allEvents}
        case EVENT_DELETE_ALL:
            return {...state,allEvents:''}
        case EVENT_UPDATE:
            return {...state,allEvents:action.payload}
        default:
            return state
    }

}


export const getEventUpdateReducer = (state={getEventUpdate:''},action) => {
    switch(action.type){
        case GET_EVENT_TO_UPDATE:
            return {...state,getEventUpdate:action.payload}
        default:
            return state
    }
}
