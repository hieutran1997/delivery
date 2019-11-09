import {
    GETALL_RESOURCES_REQUEST_SUCCESS,
    GETALL_RESOURCES_SUCCESS,
    GETALL_RESOURCES_ERROR,
    CREATE_RESOURCES_REQUEST_SUCCESS,
    CREATE_RESOURCES_SUCCESS,
    CREATE_RESOURCES_ERROR,
    UPDATE_RESOURCES_REQUEST_SUCCESS,
    UPDATE_RESOURCES_SUCCESS,
    UPDATE_RESOURCES_ERROR,
    DELETE_RESOURCES_REQUEST_SUCCESS,
    DELETE_RESOURCES_SUCCESS,
    DELETE_RESOURCES_ERROR
} from '../constants/ActionTypes';

const resourceReducer = (state, action) => {
    switch (action.type) {
        case GETALL_RESOURCES_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETALL_RESOURCES_SUCCESS:
            return {
                ...action.result,
                error: false
            };
        case GETALL_RESOURCES_ERROR:
            return {
                ...action,
                error: true
            };
        case CREATE_RESOURCES_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case CREATE_RESOURCES_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: CREATE_RESOURCES_SUCCESS
            };
        case CREATE_RESOURCES_ERROR:
            return {
                ...action,
                error: true
            };
        case UPDATE_RESOURCES_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case UPDATE_RESOURCES_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: UPDATE_RESOURCES_SUCCESS
            };
        case UPDATE_RESOURCES_ERROR:
            return {
                ...action,
                error: true
            };
        case DELETE_RESOURCES_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case DELETE_RESOURCES_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: DELETE_RESOURCES_SUCCESS
            };
        case DELETE_RESOURCES_ERROR:
            return {
                ...action,
                error: true
            };
        default:
            return null;
    }
}

export default resourceReducer;
