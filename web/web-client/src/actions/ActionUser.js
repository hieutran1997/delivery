import * as types from '../constants/ActionTypes';

const getAll = () => {
    const url = "users/getAll";
    return {
        types: [types.GETALLUSER_REQUEST_SUCCESS, types.GETALLUSER_SUCCESS, types.GETALLUSER_ERROR],
        api: (axios) => axios.get(url)
    };
};

const getDataPaging = (data) => {
    const url = "users/postQuery";
    return {
        types: [types.GETUSER_PAGING_REQUEST_SUCCESS, types.GETUSER_PAGING_SUCCESS, types.GETUSER_PAGING_ERROR],
        api: (axios) => axios.post(url, data)
    };
};

export { getAll, getDataPaging };