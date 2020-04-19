import * as types from '../../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../../common';

const catUnitReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.CAT_UNIT}_${types.REQUEST_SUCCESS}`:
            return null;
        case `${ACTION_MODULE.CAT_UNIT}_${types.PAGING_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.PAGING_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.CREATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.CREATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.DELETE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.DELETE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_UNIT}_${types.GET_SELETED_SUCCESS}`:
            return action.result.data;
        default:
            return null;
    }
}

export default catUnitReducer;
