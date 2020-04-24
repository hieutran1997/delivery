import axios from 'axios';
import { environments_dev } from '../../environment';
import { UNAUTHORIZED } from '../../shared/constants/ActionTypes';
import { openNotification } from '../../shared/common';

const apiMiddleware = store => next => action => {
  const { dispatch, getState } = store;
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  const { api, types, ...rest } = action;
  if (!api) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE, MODULE] = types;
  next({ ...rest, type: REQUEST });

  const _service = axios.create({
    baseURL: MODULE === 'file'? environments_dev.URL_SERVICE_FILE : environments_dev.URL_SERVICE,
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
      if(error.response && error.response.status === 400){
        console.log('error.response', error.response);
        openNotification('warning', 'Cảnh báo', 'Bạn không có quyền truy cập!');
        return;
      }
      if(error.response && error.response.status === 401){
        return next({ error, type: UNAUTHORIZED });
      }
      if(error.response && error.response.status === 403){
        openNotification('error', 'Lỗi', 'Bạn không có quyền truy cập!');
      }
      else if(!error.response){
         // network error
         openNotification('error', 'Lỗi', 'Mất kết nối tới server!');
      }else{
        openNotification('error', 'Lỗi', 'Xảy ra lỗi!');
      }
      return next({ error, type: FAILURE });
    }
  ).catch((error) => {
    if (!error.response) {
      // network error
      //openNotification('error', 'Lỗi', 'Mất kết nối tới server!');
    } else {
      next({ error, type: FAILURE });
    }
    
  });

  return actionPromise;
}

export default apiMiddleware;
