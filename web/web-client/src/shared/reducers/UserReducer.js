import {
    GETALLUSER_REQUEST_SUCCESS,
    GETALLUSER_SUCCESS,
    GETALLUSER_ERROR,
    GETUSER_PAGING_REQUEST_SUCCESS,
    GETUSER_PAGING_SUCCESS,
    GETUSER_PAGING_ERROR,
    CREATE_USER_REQUEST_SUCCESS,
    CREATE_USER_SUCCESS,
    CREATE_USER_ERROR,
    UPDATE_USER_REQUEST_SUCCESS,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    DELETE_USER_REQUEST_SUCCESS,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR
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
        case CREATE_USER_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            }
        case CREATE_USER_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: CREATE_USER_SUCCESS
            }
        case CREATE_USER_ERROR:
            return {
                ...action,
                error: true
            }
        case UPDATE_USER_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: UPDATE_USER_SUCCESS
            }
        case UPDATE_USER_ERROR:
            return {
                ...action,
                error: true
            }
        case DELETE_USER_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            }
        case DELETE_USER_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: DELETE_USER_SUCCESS
            }
        case DELETE_USER_ERROR:
            return {
                ...action,
                error: true
            }
        default:
            return null;
    }
}

export default userReducer;
