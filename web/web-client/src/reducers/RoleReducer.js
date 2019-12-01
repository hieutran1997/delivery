import {
    GETROLE_PAGING_REQUEST_SUCCESS,
    GETROLE_PAGING_SUCCESS,
    GETROLE_PAGING_ERROR,
    CREATE_ROLE_REQUEST_SUCCESS,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_ERROR,
    UPDATE_ROLE_REQUEST_SUCCESS,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_ERROR,
    DELETE_ROLE_REQUEST_SUCCESS,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_ERROR,
    GET_SELETED_ROLE_ERROR,
    GET_SELETED_ROLE_REQUEST_SUCCESS,
    GET_SELETED_ROLE_SUCCESS,
    CREATE_USER_ROLE_SUCCESS,
    CREATE_USER_ROLE_ERROR,
    GET_USER_ROLE_SUCCESS,
    CREATE_ROLE_PERMISSION_SUCCESS,
    CREATE_ROLE_PERMISSION_ERROR,
    GET_ROLE_PERMISSION_SUCCESS,
    GET_ROLE_PERMISSION_ERROR
} from '../constants/ActionTypes';

const roleReducer = (state, action) => {
    switch (action.type) {
        case GETROLE_PAGING_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETROLE_PAGING_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: GETROLE_PAGING_SUCCESS
            };
        case GETROLE_PAGING_ERROR:
            return {
                ...action,
                error: true,
                type: GETROLE_PAGING_ERROR
            };
        case GET_SELETED_ROLE_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GET_SELETED_ROLE_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GET_SELETED_ROLE_SUCCESS
            };
        case GET_SELETED_ROLE_ERROR:
            return {
                ...action,
                error: true,
                type: GET_SELETED_ROLE_ERROR
            };
        case CREATE_ROLE_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case CREATE_ROLE_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: CREATE_ROLE_SUCCESS
            };
        case CREATE_ROLE_ERROR:
            return {
                ...action,
                error: true
            };
        case UPDATE_ROLE_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case UPDATE_ROLE_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: UPDATE_ROLE_SUCCESS
            };
        case UPDATE_ROLE_ERROR:
            return {
                ...action,
                error: true,
            };
        case DELETE_ROLE_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case DELETE_ROLE_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: DELETE_ROLE_SUCCESS
            };
        case DELETE_ROLE_ERROR:
            return {
                ...action,
                error: true
            };
        case CREATE_USER_ROLE_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: CREATE_USER_ROLE_SUCCESS
            }; 
        case CREATE_USER_ROLE_ERROR:
            return {
                ...action.result.data,
                error: true,
                type: CREATE_USER_ROLE_ERROR
            }; 
        case GET_USER_ROLE_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GET_USER_ROLE_SUCCESS
            }; 
        case CREATE_ROLE_PERMISSION_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: CREATE_ROLE_PERMISSION_SUCCESS
            }
        case CREATE_ROLE_PERMISSION_ERROR:
            return {
                ...action.result,
                error: true,
                type: CREATE_ROLE_PERMISSION_ERROR
            }
        case GET_ROLE_PERMISSION_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GET_ROLE_PERMISSION_SUCCESS
            }
        case GET_ROLE_PERMISSION_ERROR:
            return {
                ...action.result,
                error: true,
                type: GET_ROLE_PERMISSION_ERROR
            }
        default:
            return null;
    }
}

export default roleReducer;
