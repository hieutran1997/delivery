import * as types from '../constants/ActionTypes';
import { url_services } from '../environment';

const getAll = () => {
    const url =  `${url_services.USER}/getAll`;
    return {
        types: [types.GETALLUSER_REQUEST_SUCCESS, types.GETALLUSER_SUCCESS, types.GETALLUSER_ERROR],
        api: (axios) => axios.get(url)
    };
};

const getDataPaging = (data) => {
    const url = `${url_services.USER}/postQuery`;
    return {
        types: [types.GETUSER_PAGING_REQUEST_SUCCESS, types.GETUSER_PAGING_SUCCESS, types.GETUSER_PAGING_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.USER}/`;
    return {
        types: [types.CREATE_USER_REQUEST_SUCCESS, types.CREATE_USER_SUCCESS, types.CREATE_USER_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.USER}/`;
    return {
        types: [types.UPDATE_USER_REQUEST_SUCCESS, types.UPDATE_USER_SUCCESS, types.UPDATE_USER_ERROR],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.USER}/${data.id}`;
    return {
        types: [types.DELETE_USER_REQUEST_SUCCESS, types.DELETE_USER_SUCCESS, types.DELETE_USER_ERROR],
        api: (axios) => axios.delete(url, data)
    };
};

export { getAll, getDataPaging, insert, update, deleteData };