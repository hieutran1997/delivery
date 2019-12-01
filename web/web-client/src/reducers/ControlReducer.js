import {
    GETCONTROL_PAGING_REQUEST_SUCCESS,
    GETCONTROL_PAGING_SUCCESS,
    GETCONTROL_PAGING_ERROR,
    CREATE_CONTROL_REQUEST_SUCCESS,
    CREATE_CONTROL_SUCCESS,
    CREATE_CONTROL_ERROR,
    UPDATE_CONTROL_REQUEST_SUCCESS,
    UPDATE_CONTROL_SUCCESS,
    UPDATE_CONTROL_ERROR,
    DELETE_CONTROL_REQUEST_SUCCESS,
    DELETE_CONTROL_SUCCESS,
    DELETE_CONTROL_ERROR
} from '../constants/ActionTypes';

const controlReducer = (state, action) => {
    switch (action.type) {
        case GETCONTROL_PAGING_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETCONTROL_PAGING_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: GETCONTROL_PAGING_SUCCESS
            };
        case GETCONTROL_PAGING_ERROR:
            return {
                ...action,
                error: true,
                type: GETCONTROL_PAGING_ERROR
            };
        case CREATE_CONTROL_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case CREATE_CONTROL_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: CREATE_CONTROL_SUCCESS
            };
        case CREATE_CONTROL_ERROR:
            return {
                ...action,
                error: true
            };
        case UPDATE_CONTROL_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case UPDATE_CONTROL_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: UPDATE_CONTROL_SUCCESS
            };
        case UPDATE_CONTROL_ERROR:
            return {
                ...action,
                error: true,
            };
        case DELETE_CONTROL_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case DELETE_CONTROL_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: DELETE_CONTROL_SUCCESS
            };
        case DELETE_CONTROL_ERROR:
            return {
                ...action,
                error: true
            };
        default:
            return null;
    }
}

export default controlReducer;
