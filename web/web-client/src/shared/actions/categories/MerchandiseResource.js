import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.MERCHANDISE}/postQuery`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.MERCHANDISE}/`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.CREATE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.CREATE_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.MERCHANDISE}/`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.UPDATE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.UPDATE_ERROR}`],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.MERCHANDISE}/${data.catUnitId}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

const getSelectedData = ()=>{
    const url =  `${url_services.MERCHANDISE}/getSelectedData`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.GET_SELETED_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.GET_SELETED_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const getNewCode = (typeCode) =>{
    const url =  `${url_services.MERCHANDISE}/get-new-code/${typeCode}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.GET_NEW_MERCHANDISE_CODE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.GET_NEW_MERCHANDISE_CODE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const findById = (id) => {
    const url =  `${url_services.MERCHANDISE}/${id}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.FIND_BY_ID_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.FIND_BY_ID_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const approve = (id) => {
    const url =  `${url_services.MERCHANDISE}/approve/${id}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.APPROVE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE}_${types.APPROVE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

export { getDataPaging, insert, update, deleteData, getSelectedData, getNewCode, findById, approve };