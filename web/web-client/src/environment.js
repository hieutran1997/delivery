import axios from 'axios';

export const environments_dev = {
    URL_SERVICE: 'http://localhost:8080'
}

export const environments_prod = {
    URL_SERVICE: 'http://localhost:8080'
}

export const url_services = {
    LOGIN: '/auth/token',
    USER: 'users',
    RESOURCES: 'resources',
    ROLE: 'roles',
    ORGANIZATION: 'organizations',
    CONTROL: 'actioncontrol',
    WEBSOCKET: 'ws',
    CAT_GROUP_MER: '/cat/group-merchandise'
}

export default function environments() {
    if (process.env.NODE_ENV !== "production") {
        return environments_dev;
    } else {
        return environments_prod;
    }
}

export const client = axios.create({ //all axios can be used, shown in axios documentation
    baseURL: environments_dev.URL_SERVICE,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
});

export const menu = [
    {
        key: 'system',
        title: 'Hệ thống',
        component: 'System',
        url_hash: 'system',
        icon: 'branches',
        childs: [
            {
                key: 'admin/system/user',
                title: 'Người dùng',
                component: 'User',
                url_hash: 'admin/system/user',
                icon: 'user'
            },
            {
                key: 'admin/system/resource',
                title: 'Chức năng hệ thống',
                component: 'SysResource',
                url_hash: 'admin/system/resource',
                icon: 'solution'
            },
            {
                key: 'admin/system/role',
                title: 'Vai trò hệ thống',
                component: 'SysRole',
                url_hash: 'admin/system/role',
                icon: 'api'
            },
            {
                key: 'admin/system/org',
                title: 'Đơn vị',
                component: 'Organization',
                url_hash: 'admin/system/org',
                icon: 'database'
            }
        ]
    },
    {
        key: 'cat',
        title: 'Danh mục',
        component: 'System',
        url_hash: 'cat',
        icon: 'user',
        childs: [
            {
                key: 'admin/cat/sys_cat',
                title: 'Danh mục hệ thống',
                component: 'SysCat',
                url_hash: 'admin/cat/sys_cat',
                icon: 'database'
            },
            {
                key: 'admin/cat/group-merchandise',
                title: 'Danh mục nhóm hàng',
                component: 'GroupMerchandise',
                url_hash: 'admin/cat/group-merchandise',
                icon: 'database'
            }
        ]
    }
]