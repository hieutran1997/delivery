import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging, insert, update, deleteData } from '../../../actions/ActionUser';
import { getSelectedData as getSelectedDataOrg } from '../../../actions/ActionOrganization';
import { getSelectedData as getSelectedDataRole, insertUserRole, getUserRole } from '../../../actions/ActionRole';
import { dataPost, message, mappingDataChange, openNotification, hasPermission, control, resourceCode } from '../../../shared/common';
import {
  GETUSER_PAGING_SUCCESS,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  DELETE_USER_ERROR,
  DELETE_USER_SUCCESS,
  GET_SELETED_ORGANIZATION_SUCCESS,
  GET_USER_ROLE_SUCCESS,
  CREATE_USER_ROLE_SUCCESS,
  CREATE_USER_ROLE_ERROR
} from '../../../shared/constants/ActionTypes';
import { Table, Icon, Popconfirm, Card } from 'antd';
import { PopupInfo } from './popupInfo.component';
import { PopupAdd } from './popupAdd.component';
import { PopupAddRole } from './formAddRole.component';
import { FormSearch } from './formSearch.component';

function User(props) {
  const [onInit, setOnInit] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(dataPost);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowAddRole, setIsShowAddRole] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [lstOrg, setLstOrg] = useState([]);
  const [lstRoleResource, setLstRoleResource] = useState([]);
  const [lstRoleTarget, setLstRoleTarget] = useState([]);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '5%',
      render: (value, row, index) => {
        return index + 1;
      }
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      width: '20%'
    },
    {
      title: 'Họ',
      dataIndex: 'firstname',
      width: '20%'
    },
    {
      title: 'Tên',
      dataIndex: 'lastname',
      width: '20%'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age'
    },
    {
      title: '#',
      key: 'action',
      render: (text, record) => (
        <span>
          {hasPermission(resourceCode.user, control.addRole, 1) === 1 ? <Icon type="apartment" onClick={() => { handlerAddRole(record) }} className="icon-action" title="Gán vai trò" /> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {hasPermission(resourceCode.user, control.hasEdit) === 1 ? <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action" title="Sửa" /> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {hasPermission(resourceCode.user, control.hasDelete) === 1 ?
            <Popconfirm
              title={message.messageConfirmDelete}
              okText={message.okText}
              cancelText={message.cancelText}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => { handleDelete(record) }}
            >
              <Icon type="delete" className="icon-action" title="Xóa" />
            </Popconfirm> : ""}
        </span>
      ),
      width: '20%'
    },
  ];

  useEffect(() => {
    if (onInit) {
      setLoading(true);
      props.filterData(dataSearch);
      props.getSelectedDataOrg();
      setOnInit(false);
    }
    if (props.dataUser) {
      setLoading(false);
      switch (props.dataUser.type) {
        case GETUSER_PAGING_SUCCESS:
          setDataContent(props.dataUser.data);
          setPagination({
            current: props.dataUser.curPage + 1,
            pageSize: props.dataUser.perPage,
            total: props.dataUser.total,
            size: 'small'
          });
          break;
        case UPDATE_USER_SUCCESS:
          openNotification('success', 'Thành công', message.updateSuccess);
          props.filterData(dataSearch);
          closePopup();
          break;
        case UPDATE_USER_ERROR:
          openNotification('error', 'Lỗi', message.updateSuccess);
          break;
        case CREATE_USER_SUCCESS:
          openNotification('success', 'Thành công', message.createSuccess);
          props.filterData(dataSearch);
          closePopup();
          break;
        case CREATE_USER_ERROR:
          openNotification('error', 'Lỗi', message.createError);
          break;
        case DELETE_USER_SUCCESS:
          openNotification('success', 'Thành công', message.deleteSuccess);
          props.filterData(dataSearch);
          break;
        case DELETE_USER_ERROR:
          openNotification('error', 'Lỗi', message.deleteError);
          break;
        default:
          console.log('1');
          break;
      }
    }
    if (props.dataOrg) {
      if (props.dataOrg.type === GET_SELETED_ORGANIZATION_SUCCESS) {
        setLstOrg(props.dataOrg.data);
      }
    }
    if (props.dataRole) {
      if (props.dataRole.type === GET_USER_ROLE_SUCCESS) {
        setLstRoleResource(props.dataRole.data.source);
        setLstRoleTarget(props.dataRole.data.target);
      }
      if (props.dataRole.type === CREATE_USER_ROLE_SUCCESS) {
        setIsShowAddRole(false);
        openNotification('success', 'Thành công', 'Gán vai trò thành công!');
      }
      else if (props.dataRole.type === CREATE_USER_ROLE_ERROR) {
        openNotification('error', 'Thất bại', 'Xảy ra lỗi!');
      }
    }
  }, [props, dataContent, dataSearch, onInit, setOnInit, setLstRoleResource, setLstRoleTarget]);

  const handlerSearch = data => {
    dataPost.data = data;
    setDataSearch(dataPost);
    props.filterData(dataSearch);
  }

  const handleTableChange = (pagination) => {
    setDataSearch(pagination);
    props.filterData(pagination);
  }

  const handleEdit = (data) => {
    setDataDetail(data);
    setIsEdit(true);
  }

  const handlerAddRole = (data) => {
    props.getUserRole(data.username);
    setTimeout(function () {
      setDataDetail(data);
      setIsShowAddRole(true);
    }, 100)
  }

  const handleAdd = () => {
    setDataDetail(null);
    setIsShowAdd(true);
  }

  const closePopup = () => {
    setIsEdit(false);
    setIsShowAdd(false);
    setIsShowAddRole(false);
  }

  const onSaveChange = (data) => {
    var instance = dataDetail;
    mappingDataChange(data, instance);
    props.update(instance);
  }

  const onSave = (data) => {
    var instance = data;
    props.insert(instance);
  }

  const onSaveRole = (data) => {
    props.insertUserRole(data);
  }

  const handleDelete = (data) => {
    if (data) {
      props.deleteData(data);
    }
  }

  return (
    <div>
      <Card title={message.titleFormSearch}>
        <FormSearch onCreate={handleAdd} onSearch={handlerSearch} lstOrg={lstOrg} ></FormSearch>
      </Card>
      <br />
      <Card title={message.titleFormListUser}>
        {hasPermission(resourceCode.user, control.hasView) === 1 ? 
          <Table
            columns={columns}
            rowKey={record => record.username}
            dataSource={dataContent}
            pagination={pagination}
            loading={isLoading}
            onChange={handleTableChange}
          /> : 
          <b>Không có quyền xem</b>
      }
        
      </Card>
      {
        hasPermission(resourceCode.user, control.addRole, 1) === 1 ?<PopupAddRole isShowAddRole={isShowAddRole} dataDetail={dataDetail} closePopup={closePopup} lstRoleResource={lstRoleResource} lstRoleTarget={lstRoleTarget} onSave={onSaveRole} /> : ""
      }

      {
        hasPermission(resourceCode.user, control.hasEdit) === 1 ? <PopupInfo isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} lstOrg={lstOrg} onSave={onSaveChange} /> : ""
      }

      {
        hasPermission(resourceCode.user, control.hasAdd) === 1 ? <PopupAdd isShowAdd={isShowAdd} dataDetail={dataDetail} closePopup={closePopup} lstOrg={lstOrg} onSave={onSave} /> : ""
      }
    </div>
  );
}

const mapStateToProps = state => ({
  dataUser: state.userReducer,
  dataOrg: state.organizationReducer,
  dataRole: state.roleReducer
});

const mapDispatchToProps = dispatch => {
  return {
    filterData: (data) => dispatch(getDataPaging(data)),
    insert: (data) => dispatch(insert(data)),
    update: (data) => dispatch(update(data)),
    deleteData: (data) => dispatch(deleteData(data)),
    getSelectedDataOrg: () => dispatch(getSelectedDataOrg()),
    getSelectedDataRole: () => dispatch(getSelectedDataRole()),
    insertUserRole: (data) => dispatch(insertUserRole(data)),
    getUserRole: (username) => dispatch(getUserRole(username))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
