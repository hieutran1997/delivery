import { environments_dev, url_services } from '../environment';
import axios from 'axios';

const _serviceLogin = axios.create({
    baseURL: environments_dev.URL_SERVICE,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic '+ btoa("app_erp:app_erp")
    }
});

const signIn = async (username, password) => {
    try {
        const data = 'username=' + username + '&password=' + password + '&grant_type=password&client_id=app_erp';
        const result = await _serviceLogin.post(url_services.LOGIN, data);
        if (result.status === 200) {
            //var token = result.data.token;
            var profile = JSON.stringify(result.data);
            try {
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
