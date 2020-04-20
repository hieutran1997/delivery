import * as types from '../../constants/ActionTypes';

const removeFile = (id) => {
    const url =  `/file/delete/${id}`;
    return {
        types: [types.REMOVE_FILE_REQUEST_SUCCESS, types.REMOVE_FILE_SUCCESS, types.REMOVE_FILE_ERROR, "file"],
        api: (axios) => axios.delete(url)
    };
};

const downloadFile = (id) => {
    const url =  `/file/download/${id}`;
    return {
        types: [types.DOWNLOAD_FILE_REQUEST_SUCCESS, types.DOWNLOAD_FILE_SUCCESS, types.DOWNLOAD_FILE_ERROR, "file"],
        api: (axios) => axios.get(url, {responseType: 'blob'})
    };
};

export { removeFile, downloadFile };