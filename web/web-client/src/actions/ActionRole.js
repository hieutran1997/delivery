import * as types from '../constants/ActionTypes';
import { url_services } from '../environment';

const getDataPaging = (data) => {
    const url =  `${url_services.ROLE}/postQuery`;
    return {
        types: [types.GETROLE_PAGING_REQUEST_SUCCESS, types.GETROLE_PAGING_SUCCESS, types.GETROLE_PAGING_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const insert = (data) => {
    const url = `${url_services.ROLE}/`;
    return {
        types: [types.CREATE_ROLE_REQUEST_SUCCESS, types.CREATE_ROLE_SUCCESS, types.CREATE_ROLE_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const update = (data) => {
    const url = `${url_services.ROLE}/`;
    return {
        types: [types.UPDATE_ROLE_REQUEST_SUCCESS, types.UPDATE_ROLE_SUCCESS, types.UPDATE_ROLE_ERROR],
        api: (axios) => axios.put(url, data)
    };
};

const deleteData = (data) => {
    const url = `${url_services.ROLE}/${data.id}`;
    return {
        types: [types.DELETE_ROLE_REQUEST_SUCCESS, types.DELETE_ROLE_SUCCESS, types.DELETE_ROLE_ERROR],
        api: (axios) => axios.delete(url, data)
    };
};

const getSelectedData = ()=>{
    const url =  `${url_services.ROLE}/getSelectedData`;
    return {
        types: [types.GET_SELETED_ROLE_REQUEST_SUCCESS, types.GET_SELETED_ROLE_SUCCESS, types.GET_SELETED_ROLE_ERROR],
        api: (axios) => axios.get(url)
    };
} 

const insertUserRole = (data) => {
    const url = `${url_services.ROLE}/adduserrole`;
    return {
        types: [types.CREATE_USER_ROLE_REQUEST_SUCCESS, types.CREATE_USER_ROLE_SUCCESS, types.CREATE_USER_ROLE_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const getUserRole = (username) =>{
    const url = `${url_services.ROLE}/getUserRole/${username}`;
    return {
        types: [types.GET_USER_ROLE_REQUEST_SUCCESS, types.GET_USER_ROLE_SUCCESS, types.GET_USER_ROLE_ERROR],
        api: (axios) => axios.get(url)
    };
}

const insertRolePermission = (data) => {
    const url = `${url_services.ROLE}/addPermission`;
    return {
        types: [types.CREATE_ROLE_PERMISSION_REQUEST_SUCCESS, types.CREATE_ROLE_PERMISSION_SUCCESS, types.CREATE_ROLE_PERMISSION_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

const getRolePermission = (resourceCode) =>{
    const url = `${url_services.ROLE}/getRolePermission/${resourceCode}`;
    return {
        types: [types.GET_ROLE_PERMISSION_REQUEST_SUCCESS, types.GET_ROLE_PERMISSION_SUCCESS, types.GET_ROLE_PERMISSION_ERROR],
        api: (axios) => axios.get(url)
    };
}

export { getDataPaging
    , insert, update
    , deleteData
    , getSelectedData
    , insertUserRole
    , getUserRole
    , insertRolePermission
    , getRolePermission
};