import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE, convertFormFile } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.DELIVERY}/postQuery`;
    return {
        types: [`${ACTION_MODULE.DELIVERY}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const saveOrUpdate = (data) => {
    const url = `${url_services.DELIVERY}/save`;
    const form = convertFormFile(data);
    return {
        types: [`${ACTION_MODULE.DELIVERY}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.CREATE_UPDATE_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.CREATE_UPDATE_ERROR}`],
        api: (axios) => axios.post(url, form, { headers: { 'Content-Type': 'multipart/form-data; text/html; charset=UTF-8' }})
    };
};

const findById = (id) => {
    const url =  `${url_services.DELIVERY}/${id}`;
    return {
        types: [`${ACTION_MODULE.DELIVERY}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.FIND_BY_ID_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.FIND_BY_ID_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const findByMerCode = (code) => {
    const url =  `${url_services.DELIVERY}/find-by-merid/${code}`;
    return {
        types: [`${ACTION_MODULE.DELIVERY}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.FIND_BY_MERCHANDISE_ID_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.FIND_BY_MERCHANDISE_ID_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const deleteData = (data) => {
    const url = `${url_services.DELIVERY}/${data.DELIVERYId}`;
    return {
        types: [`${ACTION_MODULE.DELIVERY}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.DELIVERY}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

export { getDataPaging, saveOrUpdate, findById, deleteData, findByMerCode };