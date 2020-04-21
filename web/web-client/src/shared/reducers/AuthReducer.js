import {
    LOGIN_SUCCESS, LOGIN_ERROR, UNAUTHORIZED
} from '../constants/ActionTypes';

const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...action.payload,
                error: false,
                type: LOGIN_SUCCESS
            };
        case LOGIN_ERROR:
            return {
                ...action.payload,
                error: true
            };
        case UNAUTHORIZED:
            return {
                ...action.error,
                unauthorized: true
            };
        default:
            return null;
    }
}

export default authReducer;
