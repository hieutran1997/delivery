import {
    GETALL_ORGANIZATION_REQUEST_SUCCESS,
    GETALL_ORGANIZATION_SUCCESS,
    GETALL_ORGANIZATION_ERROR,
    CREATE_ORGANIZATION_REQUEST_SUCCESS,
    CREATE_ORGANIZATION_SUCCESS,
    CREATE_ORGANIZATION_ERROR,
    UPDATE_ORGANIZATION_REQUEST_SUCCESS,
    UPDATE_ORGANIZATION_SUCCESS,
    UPDATE_ORGANIZATION_ERROR,
    DELETE_ORGANIZATION_REQUEST_SUCCESS,
    DELETE_ORGANIZATION_SUCCESS,
    DELETE_ORGANIZATION_ERROR,
    GET_SELETED_ORGANIZATION_REQUEST_SUCCESS,
    GET_SELETED_ORGANIZATION_SUCCESS,
    GET_SELETED_ORGANIZATION_ERROR,
    GET_ORG_PAGING_REQUEST_SUCCESS,
    GET_ORG_PAGING_ERROR,
    GET_ORG_PAGING_SUCCESS,
    GET_CHILD_ORGANIZATION_REQUEST_SUCCESS,
    GET_CHILD_ORGANIZATION_ERROR,
    GET_CHILD_ORGANIZATION_SUCCESS,
    FIND_ONE_ORG_SUCCESS,
    FIND_ONE_ORG_ERROR
} from '../constants/ActionTypes';

const organizationReducer = (state, action) => {
    switch (action.type) {
        case GETALL_ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GETALL_ORGANIZATION_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GETALL_ORGANIZATION_SUCCESS
            };
        case GETALL_ORGANIZATION_ERROR:
            return {
                ...action,
                error: true,
                type: GETALL_ORGANIZATION_ERROR
            };
        case GET_ORG_PAGING_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            }
        case GET_ORG_PAGING_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: GET_ORG_PAGING_SUCCESS
            }
        case GET_ORG_PAGING_ERROR:
            return {
                ...action,
                error: true
            }
        case GET_SELETED_ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GET_SELETED_ORGANIZATION_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GET_SELETED_ORGANIZATION_SUCCESS
            };
        case GET_SELETED_ORGANIZATION_ERROR:
            return {
                ...action,
                error: true,
                type: GET_SELETED_ORGANIZATION_ERROR
            };
        case GET_CHILD_ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case GET_CHILD_ORGANIZATION_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: GET_CHILD_ORGANIZATION_SUCCESS
            };
        case GET_CHILD_ORGANIZATION_ERROR:
            return {
                ...action,
                error: true,
                type: GET_CHILD_ORGANIZATION_ERROR
            };
        case CREATE_ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case CREATE_ORGANIZATION_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: CREATE_ORGANIZATION_SUCCESS
            };
        case CREATE_ORGANIZATION_ERROR:
            return {
                ...action,
                error: true
            };
        case UPDATE_ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case UPDATE_ORGANIZATION_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: UPDATE_ORGANIZATION_SUCCESS
            };
        case UPDATE_ORGANIZATION_ERROR:
            return {
                ...action,
                error: true,
            };
        case DELETE_ORGANIZATION_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case DELETE_ORGANIZATION_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: DELETE_ORGANIZATION_SUCCESS
            };
        case DELETE_ORGANIZATION_ERROR:
            return {
                ...action,
                error: true
            };
        case FIND_ONE_ORG_SUCCESS:
            return {
                ...action.result.data,
                error: false,
                type: FIND_ONE_ORG_SUCCESS
            }
        case FIND_ONE_ORG_ERROR:
            return {
                ...action,
                error: true
            }
        default:
            return null;
    }
}

export default organizationReducer;
