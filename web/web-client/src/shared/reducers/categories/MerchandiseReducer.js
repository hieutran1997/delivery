import * as types from '../../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../../common';

const merchandiseReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`:
            return {
                ...action,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.PAGING_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.PAGING_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.CREATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.CREATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.DELETE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.DELETE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.GET_NEW_MERCHANDISE_CODE_SUCCESS}`:
            return {
                ...action.result,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MERCHANDISE}_${types.FIND_BY_ID_SUCCESS}`:
            return {
                ...action.result,
                error: false,
                type: action.type
            };
        case  `${ACTION_MODULE.MERCHANDISE}_${types.APPROVE_SUCCESS}`:
            return {
                error: false,
                type: action.type
            };
        default:
            return null;
    }
}

export default merchandiseReducer;
