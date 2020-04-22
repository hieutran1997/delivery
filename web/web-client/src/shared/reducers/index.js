import { combineReducers } from 'redux';
import authReducer from './AuthReducer';
import userReducer from './UserReducer';
import resourceReducer from './ResourceReducer';
import roleReducer from './RoleReducer';
import organizationReducer from './OrganizationReducer';
import controlReducer from './ControlReducer';
import groupMerchandiseReducer from './categories/GroupMerchandiseReducer';
import typeMerchandiseReducer from './categories/TypeMerchandiseReducer';
import catUnitReducer from './categories/UnitReducer';
import merchandiseReducer from './categories/MerchandiseReducer';
import merchandiseRegisReducer from './process/MerchandiseRegisterReducer';
import fileReducer from './FileReducer';
import productReducer from './process/ProductReducer';
import growthUpReducer from './process/GrowthUpReducer';
import manufactureReducer from './process/ManufactureReducer';
import deliveryReducer from './process/DeliveryReducer';
import displayReducer from './process/DisplayReducer';

export default combineReducers({
  authReducer,
  userReducer,
  resourceReducer,
  roleReducer,
  organizationReducer,
  controlReducer,
  groupMerchandiseReducer,
  typeMerchandiseReducer,
  catUnitReducer,
  merchandiseReducer,
  merchandiseRegisReducer,
  fileReducer,
  productReducer,
  growthUpReducer,
  manufactureReducer,
  deliveryReducer,
  displayReducer
})
