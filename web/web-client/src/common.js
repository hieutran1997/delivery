import { notification } from 'antd';

export const openNotification = (type, message, description) => {
    const args = {
        message: message,
        description: description,
        duration: 2,
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
    messageConfirmDelete: 'Bạn có chắc chắn muốn xóa?',
    updateSuccess: 'Sửa thành công',
    updateError: 'Không sửa được!',
    deleteSuccess: 'Xóa thành công',
    deleteError: 'Không xóa được!',
    okText: 'Đồng ý',
    cancelText: 'Hủy bỏ',
    add: 'Thêm mới'
}

export function mappingDataChange(resource, destinnation){
    for(var propt in resource){
        destinnation[propt] = resource[propt];
    }
}