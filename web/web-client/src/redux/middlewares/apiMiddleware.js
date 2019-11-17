import axios from 'axios';
import { environments_dev } from '../../environment';
import { UNAUTHORIZED } from '../../constants/ActionTypes';
import { openNotification } from '../../common';

const apiMiddleware = store => next => action => {
  const { dispatch, getState } = store;
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { api, types, ...rest } = action;
  if (!api) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });

  const _service = axios.create({
    baseURL: environments_dev.URL_SERVICE,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  var token = localStorage.getItem('deliveryApp');
  if (token) {
    token = JSON.parse(token);
    _service.defaults.headers.Authorization = `Bearer ${token.token}`;
  }

  const actionPromise = api(_service);
  actionPromise.then(
    (result) => next({ result, type: SUCCESS }),
    (error) => {
      if(error.response && error.response.status === 401){
        return next({ error, type: UNAUTHORIZED });
      }else if(!error.response){
         // network error
         openNotification('error', 'Lỗi', 'Mất kết nối tới server!');
      }
      return next({ error, type: FAILURE });
    }
  ).catch((error) => {
    if (!error.response) {
      // network error
      openNotification('error', 'Lỗi', 'Mất kết nối tới server!');
    } else {
      next({ error, type: FAILURE });
    }
    
  });

  return actionPromise;
}

export default apiMiddleware;
