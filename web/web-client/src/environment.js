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
    WEBSOCKET: 'ws'
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
                key: 'user',
                title: 'Người dùng',
                component: 'User',
                url_hash: 'user',
                icon: 'user'
            },
            {
                key: 'resource',
                title: 'Chức năng hệ thống',
                component: 'SysResource',
                url_hash: 'resource',
                icon: 'solution'
            },
            {
                key: 'role',
                title: 'Vai trò hệ thống',
                component: 'SysRole',
                url_hash: 'role',
                icon: 'api'
            },
            // {
            //     key: '/control',
            //     title: 'Hoạt động điều khiển',
            //     component: 'Control',
            //     url_hash: 'control',
            //     icon: 'api'
            // },
            {
                key: 'org',
                title: 'Đơn vị',
                component: 'Organization',
                url_hash: 'org',
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
            
        ]
    }
]