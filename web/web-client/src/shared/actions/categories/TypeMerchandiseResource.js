import * as types from '../../constants/ActionTypeCommon';
import { url_services } from '../../../environment';
import { ACTION_MODULE } from '../../common';

const getDataPaging = (data) => {
    const url =  `${url_services.CAT_TYPE_MER}/postQuery`;
    return {
        types: [`${ACTION_MODULE.CAT_TYPE_MER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.PAGING_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.PAGING_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.CAT_TYPE_MER}/`;
    return {
        types: [`${ACTION_MODULE.CAT_TYPE_MER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.CREATE_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.CREATE_ERROR}`],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.CAT_TYPE_MER}/`;
    return {
        types: [`${ACTION_MODULE.CAT_TYPE_MER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.UPDATE_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.UPDATE_ERROR}`],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.CAT_TYPE_MER}/${data.catTypeMerchandiseId}`;
    return {
        types: [`${ACTION_MODULE.CAT_TYPE_MER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.DELETE_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.DELETE_ERROR}`],
        api: (axios) => axios.delete(url, data)
    };
};

const getSelectedData = ()=>{
    const url =  `${url_services.CAT_TYPE_MER}/getSelectedData`;
    return {
        types: [`${ACTION_MODULE.CAT_TYPE_MER}_${types.REQUEST_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.GET_SELETED_SUCCESS}`, `${ACTION_MODULE.CAT_TYPE_MER}_${types.GET_SELETED_ERROR}`],
        api: (axios) => axios.get(url)
    };
} 
export { getDataPaging, insert, update, deleteData, getSelectedData };