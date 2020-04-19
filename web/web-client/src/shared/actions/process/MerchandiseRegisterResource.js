import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.MERCHANDISE_REGISTER}/postQuery`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.MERCHANDISE_REGISTER}/`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.CREATE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.CREATE_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.MERCHANDISE_REGISTER}/`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.UPDATE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.UPDATE_ERROR}`],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.MERCHANDISE_REGISTER}/${data.catUnitId}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

const findById = (id) => {
    const url =  `${url_services.MERCHANDISE_REGISTER}/${id}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.FIND_BY_ID_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.FIND_BY_ID_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const approve = (id) => {
    const url =  `${url_services.MERCHANDISE_REGISTER}/approve/${id}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.APPROVE_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.APPROVE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const findByMerchandiseId = (id) => {
    const url =  `${url_services.MERCHANDISE_REGISTER}/find-by-merchandise-id/${id}`;
    return {
        types: [`${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.FIND_BY_MERCHANDISE_ID_SUCCESS}`, `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.FIND_BY_MERCHANDISE_ID_ERROR}`],
        api: (axios) => axios.get(url)
    };
}



export { getDataPaging, insert, update, deleteData, findById, approve, findByMerchandiseId };