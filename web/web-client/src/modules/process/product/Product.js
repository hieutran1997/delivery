import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging, insert, update, deleteData } from '../../../shared/actions/categories/UnitResource';
import { dataPost, message, mappingDataChange, openNotification, hasPermission, control, resourceCode, ACTION_MODULE } from '../../../shared/common';
import { Table, Icon, Popconfirm, Card } from 'antd';
import { PopupInfo } from './PopupInfo.component';
import { PopupAdd } from './PopupAdd.component';
import { FormSearch } from './FormSearch.component';
import * as types from '../../../shared/constants/ActionTypeCommon';

function Product(props) {
  const [onInit, setOnInit] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(dataPost);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

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
      title: 'Mã DVT',
      dataIndex: 'code',
      width: '20%'
    },
    {
      title: 'Tên DVT',
      dataIndex: 'name',
      width: '20%'
    },
    {
      title: '#',
      key: 'action',
      render: (text, record) => (
        <span>
          {hasPermission(resourceCode.unit, control.hasEdit) === 1 ? <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action" title="Sửa" /> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {hasPermission(resourceCode.unit, control.hasDelete) === 1 ?
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
      setOnInit(false);
    }
    if (props.dataCatUnit) {
      setLoading(false);
      switch (props.dataCatUnit.type) {
        case `${ACTION_MODULE.CAT_UNIT}_${types.PAGING_SUCCESS}`:
          setDataContent(props.dataCatUnit.data);
          setPagination({
            current: props.dataCatUnit.curPage,
            pageSize: props.dataCatUnit.perPage,
            total: props.dataCatUnit.total,
            size: 'small'
          });
          break;
        case `${ACTION_MODULE.CAT_UNIT}_${types.UPDATE_SUCCESS}`:
          openNotification('success', 'Thành công', message.updateSuccess);
          props.filterData(dataSearch);
          closePopup();
          break;
        case `${ACTION_MODULE.CAT_UNIT}_${types.UPDATE_ERROR}`:
          openNotification('error', 'Lỗi', message.updateSuccess);
          break;
        case `${ACTION_MODULE.CAT_UNIT}_${types.CREATE_SUCCESS}`:
          openNotification('success', 'Thành công', message.createSuccess);
          props.filterData(dataSearch);
          closePopup();
          break;
        case `${ACTION_MODULE.CAT_UNIT}_${types.CREATE_ERROR}`:
          openNotification('error', 'Lỗi', message.createError);
          break;
        case `${ACTION_MODULE.CAT_UNIT}_${types.DELETE_SUCCESS}`:
          openNotification('success', 'Thành công', message.deleteSuccess);
          props.filterData(dataSearch);
          break;
        case `${ACTION_MODULE.CAT_UNIT}_${types.DELETE_ERROR}`:
          openNotification('error', 'Lỗi', message.deleteError);
          break;
        default:
          break;
      }
    }
  }, [props, onInit, dataSearch]);

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

  const handleAdd = () => {
    setDataDetail(null);
    setIsShowAdd(true);
  }

  const closePopup = () => {
    setIsEdit(false);
    setIsShowAdd(false);
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

  const handleDelete = (data) => {
    if (data) {
      props.deleteData(data);
    }
  }

  return (
    <div>
      <Card title={message.titleFormSearch}>
        <FormSearch onCreate={handleAdd} onSearch={handlerSearch}></FormSearch>
      </Card>
      <br />
      <Card title={message.titleFormListUnit}>
        {hasPermission(resourceCode.unit, control.hasView) === 1 ? 
          <Table
            columns={columns}
            rowKey={record => record.code}
            dataSource={dataContent}
            pagination={pagination}
            loading={isLoading}
            onChange={handleTableChange}
          /> : 
          <b>Không có quyền xem</b>
      }
        
      </Card>
      {
        hasPermission(resourceCode.unit, control.hasEdit) === 1 ? <PopupInfo isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} onSave={onSaveChange} /> : ""
      }
      {
        hasPermission(resourceCode.unit, control.hasAdd) === 1 ? <PopupAdd isShowAdd={isShowAdd} closePopup={closePopup} onSave={onSave} /> : ""
      }
    </div>
  );
}

const mapStateToProps = state => ({
  dataCatUnit: state.catUnitReducer,
});

const mapDispatchToProps = dispatch => {
  return {
    filterData: (data) => dispatch(getDataPaging(data)),
    insert: (data) => dispatch(insert(data)),
    update: (data) => dispatch(update(data)),
    deleteData: (data) => dispatch(deleteData(data)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
