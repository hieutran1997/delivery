import { environments_dev, url_services } from '../environment';
import axios from 'axios';

const _serviceLogin = axios.create({
    baseURL: environments_dev.URL_SERVICE,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const signIn = async (username, password) => {
    try {
        const data = {
            username: username,
            password: password
        };
        const result = await _serviceLogin.post(url_services.LOGIN, data);
        if (result.status === 200) {
            //var token = result.data.token;
            try {
                var scope = result.data.scope;
                var info = result.data;
                scope = JSON.stringify(scope);
                localStorage.setItem('deliveryAppScope', scope);
                delete info.scope; 
                var profile = JSON.stringify(info);
                localStorage.setItem('deliveryApp', profile);
            } catch (error) {

            }
        }
        return result.data;
    } catch (error) {
        return error;
    }
};

export {
    signIn
};
