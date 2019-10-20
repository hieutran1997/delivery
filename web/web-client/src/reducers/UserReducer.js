import {
    GETALLUSER_REQUEST_SUCCESS,
    GETALLUSER_SUCCESS,
    GETALLUSER_ERROR,
    GETUSER_PAGING_REQUEST_SUCCESS,
    GETUSER_PAGING_SUCCESS,
    GETUSER_PAGING_ERROR
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
                ...action.result,
                error: false
            };
        case GETALLUSER_ERROR:
            return {
                ...action,
                error: true
            };
        case GETUSER_PAGING_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            }
        case GETUSER_PAGING_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: GETUSER_PAGING_SUCCESS
            }
        case GETUSER_PAGING_ERROR:
            return {
                ...action,
                error: true
            }
        default:
            return null;
    }
}

export default userReducer;
