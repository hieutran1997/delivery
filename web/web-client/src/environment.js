import axios from 'axios';

export const environments_dev = {
    URL_SERVICE: 'http://localhost:8080'
}

export const environments_prod = {
    URL_SERVICE: 'http://localhost:8080'
}

export const url_services = {
    LOGIN: '/oauth/token'
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