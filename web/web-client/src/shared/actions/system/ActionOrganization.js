import * as types from '../../constants/ActionTypes';
import { url_services } from '../../../environment';

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

const getChild = (parentCode) => {
    const url =  `${url_services.ORGANIZATION}/getChild/${parentCode}`;
    return {
        types: [types.GET_CHILD_ORGANIZATION_REQUEST_SUCCESS, types.GET_CHILD_ORGANIZATION_SUCCESS, types.GET_CHILD_ORGANIZATION_ERROR],
        api: (axios) => axios.get(url)
    };
}

const findOne = (id) => {
    const url =  `${url_services.ORGANIZATION}/${id}`;
    return {
        types: [types.FIND_ONE_ORG_REQUEST_SUCCESS, types.FIND_ONE_ORG_SUCCESS, types.FIND_ONE_ORG_ERROR],
        api: (axios) => axios.get(url)
    };
}

const getSelectedDataWithOrg = ()=>{
    const url =  `${url_services.ORGANIZATION}/get-selected-data-with-path`;
    return {
        types: [types.GET_SELETED_ORGANIZATION_REQUEST_SUCCESS, types.GET_SELETED_ORGANIZATION_SUCCESS, types.GET_SELETED_ORGANIZATION_ERROR],
        api: (axios) => axios.get(url)
    };
} 

export { getAll, insert, update, deleteData, getSelectedData, getDataPaging, getChild, findOne, getSelectedDataWithOrg };