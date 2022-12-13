import * as types from "../actions/types";

const initialState = {
    createdBy: null,
    createByEmail: null,
    gender: null,
    dateOfBirth: null,
    applyingTo: null,
    semIntake: null,
    programName: null,
    specialization: null,
    lor1: null,
    lor2: null,
    lor3: null,
    sop: null,
    resume: null,
    _id: null
}

const applicationReducer = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case types.APPLICATION_FORM_SAVE_SUCCESS:
            return {
                ...state,
                ...payload
            }
            break;
        case types.APPLICATION_FORM_SAVE_FAILED:
            return {
                ...state,
                createdBy: null,
                createByEmail: null,
                gender: null,
                dateOfBirth: null,
                applyingTo: null,
                semIntake: null,
                programName: null,
                specialization: null,
                lor1: null,
                lor2: null,
                lor3: null,
                sop: null,
                resume: null,
            }
            break;
        case types.WITHDRAW_APPLICATION_SUCCESS:
        case types.APPLICATION_NEW:
        case types.CLEAR_APPLICATION:
            return initialState
        
        case types.APPLICATION_FORM_RECEIVED:
            return {
                ...state,
                ...payload
            }

        case types.APPLICATION_LOAD_START:
            return {
                ...state
            }

        default:
            break;
    }

    return state;
}

export default applicationReducer;
