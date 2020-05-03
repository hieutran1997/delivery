import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.SYS_PARAMETER}/postQuery`;
    return {
        types: [`${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.SYS_PARAMETER}/`;
    return {
        types: [`${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.CREATE_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.CREATE_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.SYS_PARAMETER}/`;
    return {
        types: [`${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.UPDATE_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.UPDATE_ERROR}`],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.SYS_PARAMETER}/${data.sysParameterId}`;
    return {
        types: [`${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

const getSelectedData = ()=>{
    const url =  `${url_services.SYS_PARAMETER}/getSelectedData`;
    return {
        types: [`${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.GET_SELETED_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.GET_SELETED_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const findByCode = (code) => {
    const url =  `${url_services.SYS_PARAMETER}/find-by-code/${code}`;
    return {
        types: [`${ACTION_MODULE.SYS_PARAMETER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.FIND_BY_CODE_SUCCESS}`, `${ACTION_MODULE.SYS_PARAMETER}_${types.FIND_BY_CODE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

export { getDataPaging, insert, update, deleteData, getSelectedData, findByCode };