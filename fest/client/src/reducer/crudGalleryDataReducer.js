import {
    READ_GALLERY,
} from '../action/type'


const INITIAL_STATE ={photos:null}

export const adminCRUDGalleryReducer = (state=INITIAL_STATE,action) => {

    switch(action.type){
        case READ_GALLERY:
            return {...state,photos:action.payload}
        default:
            return state
    }

}