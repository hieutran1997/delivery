import * as types from '../shared/constants/ActionTypes';
import { signIn } from '../shared/services';

const loginSuccess = item => ({ type: types.LOGIN_SUCCESS, payload: item });

const loginError = err => {
  return { type: types.LOGIN_ERROR, payload: err };
};

const login = (username, password) => async dispatch => {
  const result = await signIn(username, password);
  if (result) {
    if(result.message === undefined|| result.message === null){
      dispatch(loginSuccess(result));
    }else{
      dispatch(loginError(result.message));
    }
  } else {
    dispatch(loginError("Đăng nhập thất bại"));
  }
};

export { login };
