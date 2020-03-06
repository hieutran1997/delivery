import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import resourceReducer from './ResourceReducer';
import roleReducer from './RoleReducer';
import organizationReducer from './OrganizationReducer';
import controlReducer from './ControlReducer';
import groupMerchandiseReducer from './categories/GroupMerchandiseReducer';

export default combineReducers({
  authReducer,
  userReducer,
  resourceReducer,
  roleReducer,
  organizationReducer,
  controlReducer,
  groupMerchandiseReducer
})
