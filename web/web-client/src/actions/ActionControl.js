import * as types from '../shared/constants/ActionTypes';
import { url_services } from '../environment';

const getDataPaging = (data) => {
    const url =  `${url_services.CONTROL}/postQuery`;
    return {
        types: [types.GETCONTROL_PAGING_REQUEST_SUCCESS, types.GETCONTROL_PAGING_SUCCESS, types.GETCONTROL_PAGING_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.CONTROL}/`;
    return {
        types: [types.CREATE_CONTROL_REQUEST_SUCCESS, types.CREATE_CONTROL_SUCCESS, types.CREATE_CONTROL_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.CONTROL}/`;
    return {
        types: [types.UPDATE_CONTROL_REQUEST_SUCCESS, types.UPDATE_CONTROL_SUCCESS, types.UPDATE_CONTROL_ERROR],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.CONTROL}/${data.id}`;
    return {
        types: [types.DELETE_CONTROL_REQUEST_SUCCESS, types.DELETE_CONTROL_SUCCESS, types.DELETE_CONTROL_ERROR],
        api: (axios) => axios.delete(url, data)
    };
};

export { getDataPaging, insert, update, deleteData };