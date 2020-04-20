import {
    REMOVE_FILE_REQUEST_SUCCESS,
    REMOVE_FILE_ERROR,
    REMOVE_FILE_SUCCESS,
    DOWNLOAD_FILE_ERROR,
    DOWNLOAD_FILE_SUCCESS,
    DOWNLOAD_FILE_REQUEST_SUCCESS
} from '../constants/ActionTypes';

const fileReducer = (state, action) => {
    switch (action.type) {
        case DOWNLOAD_FILE_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case DOWNLOAD_FILE_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: DOWNLOAD_FILE_SUCCESS
            };
        case DOWNLOAD_FILE_ERROR:
            return {
                ...action,
                error: true,
                type: DOWNLOAD_FILE_ERROR
            };
        case REMOVE_FILE_REQUEST_SUCCESS:
            return {
                ...action,
                error: false
            };
        case REMOVE_FILE_SUCCESS:
            return {
                ...action.result,
                error: false,
                type: REMOVE_FILE_SUCCESS
            };
        case REMOVE_FILE_ERROR:
            return {
                ...action,
                error: true,
                type: REMOVE_FILE_ERROR
            };
        default:
            return null;
    }
}

export default fileReducer;
