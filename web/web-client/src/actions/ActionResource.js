import * as types from '../constants/ActionTypes';
import { url_services } from '../environment';

const getAll = (data) => {
    const url =  `${url_services.RESOURCES}/getAll`;
    return {
        types: [types.GETALL_RESOURCES_REQUEST_SUCCESS, types.GETALL_RESOURCES_SUCCESS, types.GETALL_RESOURCES_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.RESOURCES}/`;
    return {
        types: [types.CREATE_RESOURCES_REQUEST_SUCCESS, types.CREATE_RESOURCES_SUCCESS, types.CREATE_RESOURCES_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.RESOURCES}/`;
    return {
        types: [types.UPDATE_RESOURCES_REQUEST_SUCCESS, types.UPDATE_RESOURCES_SUCCESS, types.UPDATE_RESOURCES_ERROR],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.RESOURCES}/${data.id}`;
    return {
        types: [types.DELETE_RESOURCES_REQUEST_SUCCESS, types.DELETE_RESOURCES_SUCCESS, types.DELETE_RESOURCES_ERROR],
        api: (axios) => axios.delete(url, data)
    };
};

export { getAll, insert, update, deleteData };