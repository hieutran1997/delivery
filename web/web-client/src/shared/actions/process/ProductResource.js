import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE, convertFormFile } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.PRODUCT}/postQuery`;
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const saveOrUpdate = (data) => {
    const url = `${url_services.PRODUCT}/`;
    const form = convertFormFile(data);
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.CREATE_UPDATE_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.CREATE_UPDATE_ERROR}`],
        api: (axios) => axios.post(url, form, { headers: { 'Content-Type': 'multipart/form-data; text/html; charset=UTF-8' }})
    };
};

const findById = (id) => {
    const url =  `${url_services.PRODUCT}/${id}`;
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_ID_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_ID_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const deleteData = (data) => {
    const url = `${url_services.PRODUCT}/${data.productId}`;
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

const findByCode = (id) => {
    const url =  `${url_services.PRODUCT}/find-by-code/${id}`;
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_CODE_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_CODE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const findByCodeWithoutSecure = (code) => {
    const url =  `${url_services.PRODUCT}/find-by-code-without-secure?encryptCode=${code}`;
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_CODE_WITHOUT_SECURE_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_CODE_WITHOUT_SECURE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

const getProcessByCodeWithoutSecure = (code) => {
    const url =  `${url_services.PRODUCT}/get-process-by-code-without-secure?encryptCode=${code}`;
    return {
        types: [`${ACTION_MODULE.PRODUCT}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.GET_PROCESSS_BY_CODE_WITHOUT_SECURE_SUCCESS}`, `${ACTION_MODULE.PRODUCT}_${types.GET_PROCESSS_BY_CODE_WITHOUT_SECURE_ERROR}`],
        api: (axios) => axios.get(url)
    };
}

export { getDataPaging, saveOrUpdate, findById, deleteData, findByCode, findByCodeWithoutSecure, getProcessByCodeWithoutSecure };