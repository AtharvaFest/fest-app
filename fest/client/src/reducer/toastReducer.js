const INITIAL_STATE = {toastValues:{
    containerId: "",
    toastType: "",
    message: "",
    showToast:false
}
}

export const toastReducer = (state=INITIAL_STATE,action) => {
    switch(action.type) {
        case "TOAST":
            return {...state,toastValues:action.payload}
        default:
            return state
    }
}