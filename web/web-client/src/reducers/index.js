import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import resourceReducer from './ResourceReducer';
import roleReducer from './RoleReducer';
import organizationReducer from './OrganizationReducer';

export default combineReducers({
  authReducer,
  userReducer,
  resourceReducer,
  roleReducer,
  organizationReducer
})
