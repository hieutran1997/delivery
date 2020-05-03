import * as types from '../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../common';

const sysParameterReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`:
            return null;
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.PAGING_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.PAGING_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.CREATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.CREATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.DELETE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.DELETE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.GET_SELETED_SUCCESS}`:
            return {
                ...action,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.FIND_BY_CODE_SUCCESS}`:
            return {
                ...action,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.SYS_PARAMETER}_${types.FIND_BY_CODE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        default:
            return null;
    }
}

export default sysParameterReducer;