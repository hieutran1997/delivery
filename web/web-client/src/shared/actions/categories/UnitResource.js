import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.CAT_UNIT}/postQuery`;
    return {
        types: [`${ACTION_MODULE.CAT_UNIT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.CAT_UNIT}/`;
    return {
        types: [`${ACTION_MODULE.CAT_UNIT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.CREATE_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.CREATE_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.CAT_UNIT}/`;
    return {
        types: [`${ACTION_MODULE.CAT_UNIT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.UPDATE_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.UPDATE_ERROR}`],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.CAT_UNIT}/${data.catUnitId}`;
    return {
        types: [`${ACTION_MODULE.CAT_UNIT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

const getSelectedData = ()=>{
    const url =  `${url_services.CAT_UNIT}/getSelectedData`;
    return {
        types: [`${ACTION_MODULE.CAT_UNIT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.GET_SELETED_SUCCESS}`, `${ACTION_MODULE.CAT_UNIT}_${types.GET_SELETED_ERROR}`],
        api: (axios) => axios.get(url)
    };
} 
export { getDataPaging, insert, update, deleteData, getSelectedData };