import * as types from '../shared/constants/ActionTypes';
import { url_services } from '../environment';

const getAll = () => {
    const url =  `${url_services.ORGANIZATION}/getAll`;
    return {
        types: [types.GETALL_ORGANIZATION_REQUEST_SUCCESS, types.GETALL_ORGANIZATION_SUCCESS, types.GETALL_ORGANIZATION_ERROR],
        api: (axios) => axios.get(url)
    };
};

const getDataPaging = (data) => {
    const url = `${url_services.ORGANIZATION}/postQuery`;
    return {
        types: [types.GET_ORG_PAGING_REQUEST_SUCCESS, types.GET_ORG_PAGING_SUCCESS, types.GET_ORG_PAGING_ERROR],
        api: (axios) => axios.post(url, data)
    };

};

const insert = (data) => {
    const url = `${url_services.ORGANIZATION}/`;
    return {
        types: [types.CREATE_ORGANIZATION_REQUEST_SUCCESS, types.CREATE_ORGANIZATION_SUCCESS, types.CREATE_ORGANIZATION_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.ORGANIZATION}/`;
    return {
        types: [types.UPDATE_ORGANIZATION_REQUEST_SUCCESS, types.UPDATE_ORGANIZATION_SUCCESS, types.UPDATE_ORGANIZATION_ERROR],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.ORGANIZATION}/${data.id}`;
    return {
        types: [types.DELETE_ORGANIZATION_REQUEST_SUCCESS, types.DELETE_ORGANIZATION_SUCCESS, types.DELETE_ORGANIZATION_ERROR],
        api: (axios) => axios.delete(url, data)
    };
};

const getSelectedData = ()=>{
    const url =  `${url_services.ORGANIZATION}/getSelectedData`;
    return {
        types: [types.GET_SELETED_ORGANIZATION_REQUEST_SUCCESS, types.GET_SELETED_ORGANIZATION_SUCCESS, types.GET_SELETED_ORGANIZATION_ERROR],
        api: (axios) => axios.get(url)
    };
} 

export { getAll, insert, update, deleteData, getSelectedData, getDataPaging };