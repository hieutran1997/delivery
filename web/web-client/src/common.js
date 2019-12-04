import { notification } from 'antd';
import { menu } from './environment';

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
    titleFormRole: 'Danh sách vai trò',
    titleFormControl: 'Danh sách hoạt động',
    missingNameControlError: 'Tên control chưa được chọn!',
}

export function mappingDataChange(resource, destinnation) {
    for (var propt in resource) {
        destinnation[propt] = resource[propt];
    }
}

export const getCurrentUser = () => {
    var info = localStorage.getItem('deliveryApp');
    if (info) {
        info = JSON.parse(info);
        return info;
    }
}

/**
 * Hàm check quyền hiển thị control, type = 1, lấy danh sách quyền của các control chưa định nghĩa
 * @param {*} resourceCode 
 * @param {*} actionCode 
 * @param {*} type 
 */
export const hasPermission = (resourceCode, hasPermission, type) => {
    var scope = localStorage.getItem('deliveryAppScope');
    if (scope) {
        scope = JSON.parse(scope);
        var result = 0;
        scope.forEach(element => {
            if(element.resourceCode === resourceCode && !type){
                result = element[hasPermission] ? element[hasPermission] : 0;
            }
            else if(element.resourceCode === resourceCode && type === 1){
                if(element.ortherControls){
                    let json = JSON.parse(element.ortherControls);
                    result = json[hasPermission] ? json[hasPermission] : 0;
                }
            }
        });
        return result;
    }
    return 0;
}

/**
 * Hàm check menu có quyền
 * @param {*} keyMenu 
 */
export const hasMenu = (keyMenu) => {
    var scope = localStorage.getItem('deliveryAppScope');
    if (scope) {
        scope = JSON.parse(scope);
        var result = undefined;
        scope.forEach(element => {
            if(element.resourceCode === keyMenu){
                result = element;
            }
        });
        return result !== undefined ? true : false;
    }
    return false;
}

export const getPathMenu = (pathUrl) =>{
    let result = [];
    menu.forEach(function(item){
        if(`/${item.url_hash}` === pathUrl){
            result.push({
                url: `/${item.url_hash}`,
                label: item.title
            });
        }
        else if(item.childs.length > 0){
            let check = undefined;
            item.childs.forEach(function(subItem){
                if(`/${subItem.url_hash}` === pathUrl){
                    check = subItem;
                }
            });
            if(check !== undefined){
                result.push({
                    url: `/${item.url_hash}`,
                    label: item.title
                });
                result.push({
                    url: `/${check.url_hash}`,
                    label: check.title
                })
            }
        }
    });
    return result;
}