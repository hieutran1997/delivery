import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging, insert, update, deleteData } from '../../actions';
import { dataPost, message, mappingDataChange, openNotification } from '../../common';
import {  GETUSER_PAGING_SUCCESS, 
          CREATE_USER_SUCCESS,
          CREATE_USER_ERROR,
          UPDATE_USER_SUCCESS, 
          UPDATE_USER_ERROR, 
          DELETE_USER_ERROR, 
          DELETE_USER_SUCCESS } from '../../constants/ActionTypes';
import { Table, Icon, Popconfirm, Card } from 'antd';
import { PopupInfo } from './popupInfo.component';
import { PopupAdd } from './popupAdd.component';
import { FormSearch } from './formSearch.component';

function User(props) {
  const [dataContent, setDataContent] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(dataPost);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  
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
          <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action" title="Sửa"/>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title={message.messageConfirmDelete}
            okText= {message.okText}
            cancelText= {message.cancelText}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => { handleDelete(record) }}
          >
            <Icon type="delete" className="icon-action" title="Xóa" />
          </Popconfirm>
        </span>
      ),
      width: '20%'
    },
  ];

  useEffect(() => {
    if (!props.dataUser) {
      setLoading(true);
      if (dataContent.length === 0) {
        props.filterData(dataSearch);
      }
    } else {
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
  }, [props, dataContent, dataSearch]);

  const handlerSearch = data =>{
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

  const handleAdd = () =>{
    setDataDetail({});
    setIsShowAdd(true);
  }

  const closePopup = () => {
    setIsEdit(false);
    setIsShowAdd(false);
  }

  const onSaveChange = (data)=>{
    var instance = dataDetail;
    mappingDataChange(data, instance);
    props.update(instance);
  }

  const onSave = (data)=>{
    var instance = data;
    props.insert(instance);
  }

  const handleDelete = (data) => {
    if(data){
      props.deleteData(data);
    }
  }

  return (
    <div>
      <Card title={message.titleFormSearch}>
        <FormSearch onCreate={handleAdd} onSearch={handlerSearch}></FormSearch>
      </Card>
      <br/>
      <Card title={message.titleFormListUser}>
        <Table
          columns={columns}
          rowKey={record => record.username}
          dataSource={dataContent}
          pagination={pagination}
          loading={isLoading}
          onChange={handleTableChange}
        />
      </Card>
     
      <PopupAdd isShowAdd={isShowAdd} dataDetail={dataDetail} closePopup={closePopup} onSave={onSave}/>
      <PopupInfo isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} onSave={onSaveChange}></PopupInfo>
    </div>
  );
}

const mapStateToProps = state => ({
  dataUser: state.userReducer
});

const mapDispatchToProps = dispatch => {
  return {
    filterData: (data) => dispatch(getDataPaging(data)),
    insert: (data)=>dispatch(insert(data)),
    update: (data) => dispatch(update(data)),
    deleteData: (data) => dispatch(deleteData(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
