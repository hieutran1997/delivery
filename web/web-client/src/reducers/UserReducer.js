import {
    GETALLUSER_REQUEST_SUCCESS,
    GETALLUSER_SUCCESS,
    GETALLUSER_ERROR
} from '../constants/ActionTypes';

const userReducer = (state, action) => {
    switch (action.type) {
        case GETALLUSER_REQUEST_SUCCESS:
            return {
                ...action.payload,
                error: false
            };
        case GETALLUSER_SUCCESS:
            return {
                ...action.payload,
                error: false
            };
        case GETALLUSER_ERROR:
            return {
                ...action.payload,
                error: true
            };
        default:
            return null;
    }
}

export default userReducer;
