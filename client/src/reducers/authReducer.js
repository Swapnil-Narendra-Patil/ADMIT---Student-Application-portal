import * as types from "../actions/types";

const initialState = {
    isAuthenticated: false,
    loading: true,
    user: null,
    token: null
}

const authReducer = (state = initialState, action) => {
    const {type, payload} = action;
    // Define all your types here
    switch (type) {
        case types.LOADING_STARTED:
            return {
                ...state,
                loading: true
            };
        case types.LOADING_DONE:
            return {
                ...state,
                loading: false
            }
        case types.REGISTER_SUCCESS:
        case types.LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                user: payload,
                loading: false,
                isAuthenticated: true
            }
        case types.USER_AUTHENTICATED:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: payload
            }
        case types.REGISTER_FAIL:
        case types.USER_AUTHENTICATION_FAILED:
        case types.LOGIN_FAIL:
        case types.LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null,
                loading: false
            }
        default:
            break;
    }
    return state;
}

export default authReducer;