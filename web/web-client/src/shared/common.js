import { notification } from 'antd';
import { menu, environments_dev, url_services } from '../environment';
import axios from 'axios';

const _service = axios.create({
    baseURL: environments_dev.URL_SERVICE,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

var currentInfo = {};

export const DateFormat = 'DD/MM/YYYY';

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

export const typeOfDynamicInput = {
    INPUT: 'input',
    TEXT_AREA: 'textarea',
    DATE_TIME: 'date',
    SELECT_FILTER: 'select'
}

export const message = {
    messageConfirmDelete: 'Bạn có chắc chắn muốn xóa?',
    messageConfirmApprove: 'Bạn có chắc chắn muốn duyệt?',
    createSuccess: 'Thêm mới thành công',
    createError: 'Không thêm được!',
    updateSuccess: 'Sửa thành công',
    updateError: 'Không sửa được!',
    deleteSuccess: 'Xóa thành công',
    approveSuccess: 'Duyệt thành công',
    approveError: 'Xóa thành công',
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
    messageError: 'Có lỗi xảy ra',
    titleFormListGroupMerchandise: "Danh sách nhóm hàng",
    titleFormListTypeMerchandise: "Danh sách loại hàng",
    titleFormListUnit: "Danh sách đơn vị tính",
    titleFormListMerchandise: "Danh sách hàng hóa"
}

/**
 * Tên quyền của các control
 */
export const control = {
    hasEdit: "hasEdit",
    hasDelete: "hasDelete",
    hasAdd: "hasAdd",
    hasView: "hasView",
    hasApprove: "hasApprove",
    //other control
    addRole: "addRole",
    addPermission: "addPermission",
    addAction: "addAction",
    regisMerchandise: "regisMerchandise"
}

export const resourceCode = {
    user: "user",
    role: "role",
    resource: "resource",
    organization: 'organization',
    groupMerchandise: 'groupMerchandise',
    typeMerchandise: 'typeMerchandise',
    unit: 'unit',
    merchandise: 'merchandise'
}

export const ACTION_MODULE = {
    CAT_GROUP_MER: "CAT_GROUP_MER",
    CAT_TYPE_MER: "CAT_TYPE_MER",
    CAT_UNIT: "CAT_UNIT",
    MERCHANDISE: "MERCHANDISE",
    MERCHANDISE_REGISTER: "MERCHANDISE_REGISTER"
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
        currentInfo = info;
        return info;
    } else {
        return null;
    }
}

export const getListPermission = async () => {
    if (currentInfo === {}) {
        getCurrentUser();
    }
    if (currentInfo.typeOfUser !== 1) {
        _service.defaults.headers.Authorization = `Bearer ${currentInfo.token}`;
        try {
            const result = await _service.get(`${url_services.ROLE}/getPermission`);
            if (result) {
                var profile = JSON.stringify(result.data);
                localStorage.setItem('deliveryAppScope', profile);
            }
        } catch (error) {
            if (error.response && error.response.status === 403) {
                openNotification('error', 'Lỗi', 'Bạn không có quyền truy cập!');
            }
            else {
                openNotification('error', 'Lỗi', 'Xảy ra lỗi!');
            }
        }
    }

}

/**
 * Hàm check quyền hiển thị control, type = 1, lấy danh sách quyền của các control chưa định nghĩa
 * @param {*} resourceCode 
 * @param {*} actionCode 
 * @param {*} type 
 */
export const hasPermission = (resourceCode, hasPermission, type) => {
    var currentUser = getCurrentUser();
    if (currentUser && currentUser.typeOfUser === 1) { //Là quyền admin
        return 1;
    }
    var scope = localStorage.getItem('deliveryAppScope');
    if (scope) {
        scope = JSON.parse(scope);
        var result = 0;
        scope.forEach(element => {
            if (element.resourceCode === resourceCode && !type) {
                result = element[hasPermission] ? element[hasPermission] : 0;
            }
            else if (element.resourceCode === resourceCode && type === 1) {
                if (element.ortherControls) {
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
    var currentUser = getCurrentUser();
    if (currentUser && currentUser.typeOfUser === 1) { //Là quyền admin
        return true;
    }
    else if (!currentUser) {
        return false;
    }
    var scope = localStorage.getItem('deliveryAppScope');
    if (scope) {
        scope = JSON.parse(scope);
        var result = undefined;
        scope.forEach(element => {
            if (element.pathUrl === keyMenu) {
                result = element;
            }
        });
        return result !== undefined ? true : false;
    }
    return false;
}

export const getPathMenu = (pathUrl) => {
    let result = [];
    menu.forEach(function (item) {
        if (`/${item.url_hash}` === pathUrl) {
            result.push({
                url: `/${item.url_hash}`,
                label: item.title
            });
        }
        else if (item.childs.length > 0) {
            let check = undefined;
            item.childs.forEach(function (subItem) {
                if (`/${subItem.url_hash}` === pathUrl) {
                    check = subItem;
                }
            });
            if (check !== undefined) {
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

export const getListTopic = () => {
    if (currentInfo === {}) {
        getCurrentUser();
    }
    let result = [];
    if (currentInfo.lstRole) {
        currentInfo.lstRole.forEach(function (item) {
            result.push(`/topic/permission/${item.value}`);
        });
    }
    return result;
}