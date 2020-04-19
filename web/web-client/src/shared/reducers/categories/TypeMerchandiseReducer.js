import * as types from '../../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../../common';

const typeMerchandiseReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.REQUEST_SUCCESS}`:
            return null;
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.PAGING_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.PAGING_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.CREATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.CREATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.DELETE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.DELETE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        case `${ACTION_MODULE.CAT_TYPE_MER}_${types.GET_SELETED_SUCCESS}`:
            return action.result.data;
        default:
            return null;
    }
}

export default typeMerchandiseReducer;
