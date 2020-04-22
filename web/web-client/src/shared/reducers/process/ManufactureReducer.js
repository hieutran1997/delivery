import * as types from '../../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../../common';

const manufactureReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.MANUAFACTURE}_${types.PAGING_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.PAGING_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.REQUEST_SUCCESS}`:
            return {
                ...action,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.CREATE_UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.CREATE_UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.FIND_BY_ID_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.FIND_BY_ID_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.FIND_BY_MERCHANDISE_ID_SUCCESS}`:
            return {
                ...action.result,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.MANUAFACTURE}_${types.FIND_BY_MERCHANDISE_ID_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        default:
            return null;
    }
}

export default manufactureReducer;
