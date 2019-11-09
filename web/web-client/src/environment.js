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
    RESOURCES: 'resources'
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
        key: 1,
        title: 'Người dùng',
        component: 'User',
        url_hash: 'users',
        icon: 'user'
    },
    {
        key: 2,
        title: 'Chức năng hệ thống',
        component: 'SysResource',
        url_hash: 'resources',
        icon: 'user'
    }
]