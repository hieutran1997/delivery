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