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
    key: '',
    data: {}
};

export const message = {
    messageConfirmDelete: 'Bạn có chắc chắn muốn xóa?',
    createSuccess: 'Thêm mới thành công',
    createError: 'Không thêm được!',
    updateSuccess: 'Sửa thành công',
    updateError: 'Không sửa được!',
    deleteSuccess: 'Xóa thành công',
    deleteError: 'Không xóa được!',
    okText: 'Đồng ý',
    cancelText: 'Hủy bỏ',
    add: 'Thêm mới',
    titleApp: 'QLCCU',
    titleFormSearch: 'Tìm kiếm',
    titleFormListUser: 'Danh sách người dùng',
    titleFormResource: 'Danh sách tài nguyên',
    titleFormRole: 'Danh sách vai trò'
}

export function mappingDataChange(resource, destinnation){
    for(var propt in resource){
        destinnation[propt] = resource[propt];
    }
}