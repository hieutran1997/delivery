import * as types from '../../constants/ActionTypeCommon';
import { ACTION_MODULE } from '../../common';

const productReducer = (state, action) => {
    switch (action.type) {
        case `${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`:
            return {
                ...action,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.PRODUCT}_${types.CREATE_UPDATE_SUCCESS}`:
            return {
                ...action.result.data,
                error: false,
                type: action.type
            };
        case `${ACTION_MODULE.PRODUCT}_${types.CREATE_UPDATE_ERROR}`:
            return {
                ...action,
                error: true,
                type: action.type
            };
        default:
            return null;
    }
}

export default productReducer;
