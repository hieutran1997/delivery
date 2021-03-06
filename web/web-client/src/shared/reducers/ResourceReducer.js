import {
    GETRESOURCES_PAGING_REQUEST_SUCCESS,
    GETRESOURCES_PAGING_SUCCESS,
    GETRESOURCES_PAGING_ERROR,
    CREATE_RESOURCES_REQUEST_SUCCESS,
    CREATE_RESOURCES_SUCCESS,
    CREATE_RESOURCES_ERROR,
    UPDATE_RESOURCES_REQUEST_SUCCESS,
    UPDATE_RESOURCES_SUCCESS,
    UPDATE_RESOURCES_ERROR,
    DELETE_RESOURCES_REQUEST_SUCCESS,
    DELETE_RESOURCES_SUCCESS,
    DELETE_RESOURCES_ERROR,
    GET_SELETED_RESOURCES_ERROR,
    GET_SELETED_RESOURCES_SUCCESS,
    CREATE_RESOURCES_CONTROL_SUCCESS,
    CREATE_RESOURCES_CONTROL_ERROR
} from '../constants/ActionTypes';

const resourceReducer = (state, action) => {
    switch (action.type) {
        case GETRESOURCES_PAGING_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETRESOURCES_PAGING_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: GETRESOURCES_PAGING_SUCCESS
            };
        case GETRESOURCES_PAGING_ERROR:
            return {
                ...action,
                error: true,
                type: GETRESOURCES_PAGING_ERROR
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
                error: true,
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
        case GET_SELETED_RESOURCES_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GET_SELETED_RESOURCES_SUCCESS
            };
        case GET_SELETED_RESOURCES_ERROR:
            return {
                ...action,
                error: true
            };
        case CREATE_RESOURCES_CONTROL_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: CREATE_RESOURCES_CONTROL_SUCCESS
            };
        case CREATE_RESOURCES_CONTROL_ERROR:
            return {
                ...action,
                error: true,
                type: CREATE_RESOURCES_CONTROL_ERROR
            };
        default:
            return null;
    }
}

export default resourceReducer;
