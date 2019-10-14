import {
    GETALLUSER_REQUEST_SUCCESS,
    GETALLUSER_SUCCESS,
    GETALLUSER_ERROR
} from '../constants/ActionTypes';

const userReducer = (state, action) => {
    switch (action.type) {
        case GETALLUSER_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETALLUSER_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETALLUSER_ERROR:
            return {
                ...action,
                error: true
            };
        default:
            return null;
    }
}

export default userReducer;
