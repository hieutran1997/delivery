import * as types from '../../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../../common';

const merchandiseRegisReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`:
            return {
                ...action,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.PAGING_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.PAGING_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.CREATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.CREATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.DELETE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.DELETE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.APPROVE_SUCCESS}`:
            return {
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.FIND_BY_MERCHANDISE_ID_SUCCESS}`:
            return {
                ...action.result,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_SELETED_SUCCESS}`:
            return {
                ...action.result,
                error: false,
                type: `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_SELETED_SUCCESS}`
            }
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_SELETED_ERROR}`:
            return {
                ...action.result.data,
                error: true,
                type: `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_SELETED_ERROR}`
            }
        case `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_NEW_INSTANCE_SUCCESS}`:
            return {
                ...action.result.data,
                error: true,
                type: `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_NEW_INSTANCE_SUCCESS}`
            }
        default:
            return null;
    }
}

export default merchandiseRegisReducer;
