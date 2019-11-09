import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import resourceReducer from './ResourceReducer'

export default combineReducers({
  authReducer,
  userReducer,
  resourceReducer
})
