import { notification } from 'antd';

export const openNotification = (type, message, description) => {
    const args = {
        message: message,
        description: description,
        duration: 0,
    };
    if (type === 'error') {
        notification.error(args);
    }
    else {
        notification.success(args);
    }
};

export const dataPost = {
    current: 1,
    pageSize: 10,
    key: ''
};

export const message = {
    messageConfirmDelete: 'Bạn có chắc chắn muốn xóa?'
}