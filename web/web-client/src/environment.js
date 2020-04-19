import axios from 'axios';

export const environments_dev = {
    URL_SERVICE: 'http://localhost:8000'
}

export const environments_prod = {
    URL_SERVICE: 'http://localhost:8000'
}

export const url_services = {
    LOGIN: '/auth/token',
    USER: 'users',
    RESOURCES: 'resources',
    ROLE: 'roles',
    ORGANIZATION: 'organizations',
    CONTROL: 'actioncontrol',
    WEBSOCKET: 'ws',
    CAT_GROUP_MER: '/cat/group-merchandise',
    CAT_TYPE_MER: '/cat/type-merchandise',
    CAT_UNIT: '/cat/unit',
    MERCHANDISE: '/cat/merchandise',
    MERCHANDISE_REGISTER: '/process/merchandise-register'
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
                icon: 'ellipsis'
            },
            {
                key: 'admin/system/resource',
                title: 'Chức năng hệ thống',
                component: 'SysResource',
                url_hash: 'admin/system/resource',
                icon: 'ellipsis'
            },
            {
                key: 'admin/system/role',
                title: 'Vai trò hệ thống',
                component: 'SysRole',
                url_hash: 'admin/system/role',
                icon: 'ellipsis'
            },
            {
                key: 'admin/system/org',
                title: 'Đơn vị',
                component: 'Organization',
                url_hash: 'admin/system/org',
                icon: 'ellipsis'
            }
        ]
    },
    {
        key: 'cat',
        title: 'Danh mục',
        component: 'System',
        url_hash: 'cat',
        icon: 'database',
        childs: [
            {
                key: 'admin/cat/sys_cat',
                title: 'Danh mục hệ thống',
                component: 'SysCat',
                url_hash: 'admin/cat/sys_cat',
                icon: 'ellipsis'
            },
            {
                key: 'admin/cat/group-merchandise',
                title: 'Danh mục nhóm hàng',
                component: 'GroupMerchandise',
                url_hash: 'admin/cat/group-merchandise',
                icon: 'ellipsis'
            },
            {
                key: 'admin/cat/type-merchandise',
                title: 'Danh mục loại hàng',
                component: 'TypeMerchandise',
                url_hash: 'admin/cat/type-merchandise',
                icon: 'ellipsis'
            },
            {
                key: 'admin/cat/unit',
                title: 'Danh mục đơn vị tính',
                component: 'Unit',
                url_hash: 'admin/cat/unit',
                icon: 'ellipsis'
            },
            {
                key: 'admin/cat/merchandise',
                title: 'Danh mục hàng hóa',
                component: 'Merchandise',
                url_hash: 'admin/cat/merchandise',
                icon: 'ellipsis'
            }
        ]
    },
    {
        key: 'process',
        title: 'Quá trình',
        component: 'process',
        url_hash: 'process',
        icon: 'rise',
        childs: [
            {
                key: 'admin/process/products',
                title: 'Quản lý hàng hóa',
                component: 'SysCat',
                url_hash: 'admin/process/products',
                icon: 'ellipsis'
            }
        ]
    }
]