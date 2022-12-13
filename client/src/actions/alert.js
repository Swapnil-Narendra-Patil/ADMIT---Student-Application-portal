import { REMOVE_ALERT, SET_ALERT } from './types';

//actions to set and remove alerts

export const setAlert = (message, alertType) => async dispatch => {
    dispatch({
        type : SET_ALERT,
        payload : {
            msg: message,
            alertType: alertType
        }
    });
};

export const removeAlert = () => dispatch => {
    dispatch({
        type: REMOVE_ALERT,
    })
}