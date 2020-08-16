import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging, insert, update, deleteData, getNewCode, findById, approve } from '../../../shared/actions/categories/MerchandiseResource';
import { getSelectedData as getUnitData } from '../../../shared/actions/categories/UnitResource';
import { getSelectedData as getGroupData } from '../../../shared/actions/categories/GroupMerchandiseResource';
import { getSelectedData as getTypeData } from '../../../shared/actions/categories/TypeMerchandiseResource';
import { insert as insertRegister, findByMerchandiseId} from '../../../shared/actions/process/MerchandiseRegisterResource';
import { dataPost, message, mappingDataChange, openNotification, hasPermission, control, resourceCode, ACTION_MODULE } from '../../../shared/common';
import { Table, Icon, Popconfirm, Card } from 'antd';
import { PopupInfo } from './PopupInfo.component';
import { PopupAdd } from './PopupAdd.component';
import { FormSearch } from './FormSearch.component';
import { PopupRegis } from './PopupRegister.component';
import * as types from '../../../shared/constants/ActionTypeCommon';

function Merchandise(props) {
  const [onInit, setOnInit] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(dataPost);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [isShowRegis, setIsShowRegis] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [lstType, setLstType] = useState([]);
  const [lstGroup, setLstGroup] = useState([]);
  const [lstUnit, setLstUnit] = useState([]);
  const [newCode, setNewCode] = useState('');

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
      title: 'Mã HH',
      dataIndex: 'merchandiseCode',
      width: '5%'
    },
    {
      title: 'Tên HH',
      dataIndex: 'merchandiseName',
      width: '20%'
    },
    {
      title: 'Đơn vị tính',
      dataIndex: 'unit',
      width: '10%'
    },
    {
      title: 'Loại HH',
      dataIndex: 'typeMerchandise',
      width: '20%'
    },
    {
      title: 'Nhóm HH',
      dataIndex: 'groupMerchandise',
      width: '20%'
    },
    {
      title: '#',
      key: 'action',
      render: (text, record) => (
        <span>
          {hasPermission(resourceCode.merchandise, control.hasEdit) === 1 ? <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action icon-edit" title="Sửa" /> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {hasPermission(resourceCode.merchandise, control.hasDelete) === 1 ?
            <Popconfirm
              title={message.messageConfirmDelete}
              okText={message.okText}
              cancelText={message.cancelText}
              icon={<Icon type="question-circle-o" />}
              onConfirm={() => { handleDelete(record) }}
            >
              <Icon type="delete" className="icon-action icon-delete" title="Xóa" />
            </Popconfirm> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {
            hasPermission(resourceCode.merchandise, control.hasApprove) === 1 && record.status === 0 ?
              <Popconfirm
                title={message.messageConfirmApprove}
                okText={message.okText}
                cancelText={message.cancelText}
                icon={<Icon type="question-circle-o" style={{ color: 'organge' }} />}
                onConfirm={() => { handleApprove(record) }}
              >
                <Icon type="check" className="icon-action icon-edit" title="Duyệt" theme="outlined" />
              </Popconfirm> : ""
          }
          {
            hasPermission(resourceCode.merchandise, control.regisMerchandise, 1) === 1 && record.isRegistered !== 1 && record.status === 2 ? 
              <Icon type="select" onClick={() => { handleRegis(record) }} className="icon-action icon-edit" title="Đăng ký" theme="outlined" /> : ""
          }
          {
            hasPermission(resourceCode.merchandise, control.regisMerchandise, 1) === 1 && record.isRegistered === 1 && record.status === 2 ? 
              <Icon type="eye" onClick={() => { handleRegis(record) }} className="icon-action icon-edit" title="Xem" theme="outlined" /> : ""
          }
        </span>
      ),
      width: '20%'
    },
  ];

  useEffect(() => {
    if (onInit) {
      setLoading(true);
      props.filterData(dataSearch);
      props.getGroupData();
      props.getTypeData();
      props.getUnitData();
      setOnInit(false);
    }
    if (props.dataProps) {
      setLoading(false);
      switch (props.dataProps.type) {
        case `${ACTION_MODULE.MERCHANDISE}_${types.PAGING_SUCCESS}`:
          setDataContent(props.dataProps.data);
          setPagination({
            current: props.dataProps.curPage,
            pageSize: props.dataProps.perPage,
            total: props.dataProps.total,
            
          });
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.UPDATE_SUCCESS}`:
          openNotification('success', 'Thành công', message.updateSuccess);
          props.filterData(dataSearch);
          setDataDetail({});
          closePopup();
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.UPDATE_ERROR}`:
          openNotification('error', 'Lỗi', message.updateSuccess);
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.CREATE_SUCCESS}`:
          openNotification('success', 'Thành công', message.createSuccess);
          setDataDetail({});
          props.filterData(dataSearch);
          closePopup();
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.CREATE_ERROR}`:
          openNotification('error', 'Lỗi', message.createError);
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.DELETE_SUCCESS}`:
          openNotification('success', 'Thành công', message.deleteSuccess);
          props.filterData(dataSearch);
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.DELETE_ERROR}`:
          openNotification('error', 'Lỗi', message.deleteError);
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.GET_NEW_MERCHANDISE_CODE_SUCCESS}`:
          setNewCode(props.dataProps.data);
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.FIND_BY_ID_SUCCESS}`:
          setDataDetail(props.dataProps.data);
          break;
        case `${ACTION_MODULE.MERCHANDISE}_${types.APPROVE_SUCCESS}`:
          props.filterData(dataSearch);
          openNotification('success', 'Thành công', message.approveSuccess);
          break;
        default:
          break;
      }
    }
  }, [props, props.dataProps, onInit, dataSearch]);

  useEffect(() => {
    if (props.unitProps && props.unitProps.type === `${ACTION_MODULE.CAT_UNIT}_${types.GET_SELETED_SUCCESS}`) {
      setLstUnit(props.unitProps.result.data);
    }
  }, [props.unitProps]);

  useEffect(() => {
    if (props.groupMerchandiseProps && props.groupMerchandiseProps.type === `${ACTION_MODULE.CAT_GROUP_MER}_${types.GET_SELETED_SUCCESS}`) {
      setLstGroup(props.groupMerchandiseProps.result.data);
    }
  }, [props.groupMerchandiseProps, props.unitProps]);

  useEffect(() => {
    if (props.typeMerchandiseProps && props.typeMerchandiseProps.type === `${ACTION_MODULE.CAT_TYPE_MER}_${types.GET_SELETED_SUCCESS}`) {
      setLstType(props.typeMerchandiseProps.result.data);
    }
  }, [props.typeMerchandiseProps]);

  useEffect(() => {
    if(props.registerProps){
      if(props.registerProps.type === `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.CREATE_SUCCESS}`){
        openNotification('success', 'Thành công', message.createSuccess);
        setDataDetail(null);
        closePopup();
      }
      else if(props.registerProps.type === `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.FIND_BY_MERCHANDISE_ID_SUCCESS}`){
        if(props.registerProps.data !== ""){
          setDataDetail(props.registerProps.data);
        }
      }
    }
  }, [props.registerProps])

  const handlerSearch = data => {
    dataPost.data = data;
    setDataSearch(dataPost);
    props.filterData(dataSearch);
  }

  const handleTableChange = (pagination) => {
    setDataSearch(pagination);
    props.filterData(pagination);
  }

  const handleApprove = (data) => {
    props.approve(data.merchandiseId);
  }

  const handleRegis = (data) =>{
    setDataDetail(data);
    props.findByMerchandiseId(data.merchandiseId);
    setIsShowRegis(true);
  }

  const handleEdit = (data) => {
    props.findById(data.merchandiseId);
    setIsEdit(true);
  }

  const handleAdd = () => {
    setDataDetail(null);
    setIsShowAdd(true);
  }

  const closePopup = () => {
    setIsEdit(false);
    setIsShowAdd(false);
    setIsShowRegis(false);
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

  const onRegis = (data) =>{
    if(data){
      props.insertRegister(data);
    }
  }

  const handleDelete = (data) => {
    if (data) {
      props.deleteData(data);
    }
  }

  const getNewCode = (typeCode) => {
    if (typeCode) {
      props.getNewCode(typeCode)
    }
  }

  return (
    <div>
      <Card title={message.titleFormSearch}>
        <FormSearch onCreate={handleAdd} onSearch={handlerSearch} lstType={lstType} lstGroup={lstGroup} lstUnit={lstUnit}></FormSearch>
      </Card>
      <br />
      <Card title={message.titleFormListMerchandise}>
        {hasPermission(resourceCode.merchandise, control.hasView) === 1 ?
          <Table
            bordered
            columns={columns}
            rowKey={record => record.merchandiseCode}
            dataSource={dataContent}
            pagination={pagination}
            loading={isLoading}
            onChange={handleTableChange}
          /> :
          <b>Không có quyền xem</b>
        }

      </Card>
      {
        hasPermission(resourceCode.merchandise, control.hasEdit) === 1 ?
          <PopupInfo isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} onSave={onSaveChange} lstType={lstType} lstGroup={lstGroup} lstUnit={lstUnit} />
          : ""
      }
      {
        hasPermission(resourceCode.merchandise, control.hasAdd) === 1 ?
          <PopupAdd isShowAdd={isShowAdd} closePopup={closePopup} getNewCode={getNewCode} newCode={newCode} onSave={onSave} lstType={lstType} lstGroup={lstGroup} lstUnit={lstUnit} />
          : ""
      }
      {
        hasPermission(resourceCode.merchandise, control.regisMerchandise, 1) === 1 ? 
          <PopupRegis isShowRegis={isShowRegis} closePopup={closePopup} onSave={onRegis} dataDetail={dataDetail}/> : ""
      }
    </div>
  );
}

const mapStateToProps = state => ({
  dataProps: state.merchandiseReducer,
  typeMerchandiseProps: state.typeMerchandiseReducer,
  groupMerchandiseProps: state.groupMerchandiseReducer,
  unitProps: state.catUnitReducer,
  registerProps: state.merchandiseRegisReducer
});

const mapDispatchToProps = dispatch => {
  return {
    filterData: (data) => dispatch(getDataPaging(data)),
    insert: (data) => dispatch(insert(data)),
    update: (data) => dispatch(update(data)),
    deleteData: (data) => dispatch(deleteData(data)),
    getUnitData: () => dispatch(getUnitData()),
    getTypeData: () => dispatch(getTypeData()),
    getGroupData: () => dispatch(getGroupData()),
    getNewCode: (typeCode) => dispatch(getNewCode(typeCode)),
    findById: (id) => dispatch(findById(id)),
    approve: (id) => dispatch(approve(id)),
    insertRegister: (data) => dispatch(insertRegister(data)),
    findByMerchandiseId: (id) => dispatch(findByMerchandiseId(id))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Merchandise);