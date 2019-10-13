import * as types from '../constants/ActionTypes';

const getAll = () => {
    const url = "users/user";
    return {
        types: [types.GETALLUSER_REQUEST_SUCCESS, types.GETALLUSER_SUCCESS, types.GETALLUSER_ERROR],
        api: (axios) => axios.get(url)
    };
};

export { getAll };