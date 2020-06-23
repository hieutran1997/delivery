import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging, saveOrUpdate, findById, deleteData } from '../../../shared/actions/process/ProductResource';
import { getSelectedDataWithOrg as getSelectedDataOrg } from '../../../shared/actions/system/ActionOrganization';
import { dataPost, message, openNotification, hasPermission, control, resourceCode, ACTION_MODULE, DateFormat, appConfig } from '../../../shared/common';
import { Table, Icon, Popconfirm, Card, Tag } from 'antd';
import { PopupInfo } from './PopupInfo.component';
import PopupAdd from './PopupAdd.component';
import { FormSearch } from './FormSearch.component';
import * as types from '../../../shared/constants/ActionTypeCommon';
import { getSeletedByOrgpath } from '../../../shared/actions/process/MerchandiseRegisterResource';
import moment from 'moment';
import TableFile from '../../../shared/components/FileTable.component';
import { GET_SELETED_ORGANIZATION_SUCCESS } from '../../../shared/constants/ActionTypes';
import { Link } from 'react-router-dom';
import { environments_dev } from '../../../environment';
var QRCode = require('qrcode.react');

function Product(props) {
  const [dataContent, setDataContent] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(dataPost);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [lstMerchandise, setLstMerchandise] = useState([]);
  const [lstOrg, setLstOrg] = useState([]);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '3%',
      render: (value, row, index) => {
        return index + 1;
      }
    },
    {
      title: 'Mã',
      dataIndex: 'productCode',
      width: '5%'
    },
    {
      title: 'Tên HH',
      dataIndex: 'productName',
      width: '15%'
    },
    {
      title: 'Đơn vị',
      dataIndex: 'organizationName',
      width: '10%'
    },
    {
      title: 'Trong loại hình',
      key: 'typeOfManufacture',
      width: '10%',
      render: (text, record) => {
        let tmp = appConfig.TYPE_OF_MANUFACTURE.find(x => x.value === record.typeOfManufacture);
        return (
          <>
            {tmp ? tmp.name : "Chưa xác định"}
          </>
        );
      }
    },
    {
      title: 'Trạng thái',
      key: 'status',
      width: '5%',
      render: (text, record) => {
        if(record.status){
          let tmp = appConfig.PRODUCT_STATUS.find(x => x.value === record.status);
          return (
            <>
              <Tag color={tmp.color} key={tmp ? tmp.name : "Chưa xác định"}>{tmp ? tmp.name : "Chưa xác định"}</Tag>
            </>
          );
        }else{
          return ("");
        }
        
      }
    },
    {
      title: 'Ngày bắt đầu',
      width: '10%',
      render: (text, record) => (
        <span>{moment(record.dateOfManufacture).format(DateFormat)}</span>
      )
    },
    {
      title: 'Đính kèm',
      key: 'attach',
      width: '10%',
      render: (text, record) => (
        <>
          <TableFile fileAttachment={record.fileAttachment}></TableFile>
        </>
      )
    },
    {
      title: 'QR code',
      key: 'qr',
      width: '5%',
      render: (text, record) => (
        <>
         <QRCode value={`${environments_dev.CLIENT_HOST}/view?code=${record.productEncrypt}`} size={100}/>
        </>
      )
    },
    {
      title: '#',
      key: 'action',
      render: (text, record) => (
        <span>
          {hasPermission(resourceCode.product, control.hasEdit) === 1 ? <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action icon-edit" title="Sửa" /> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {hasPermission(resourceCode.product, control.hasDelete) === 1 ?
            <Popconfirm
              title={message.messageConfirmDelete}
              okText={message.okText}
              cancelText={message.cancelText}
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm={() => { handleDelete(record) }}
            >
              <Icon type="delete" className="icon-action  icon-delete" title="Xóa" />
            </Popconfirm> : ""}
          &nbsp;&nbsp;&nbsp;&nbsp;
          {hasPermission(resourceCode.product, control.hasView) === 1 ?
            <Link to={{ pathname: "/admin/process/product-info", search: "?code=" + record.productCode, state: { fromDashboard: true } }} >
              <Icon type="eye" className="icon-action icon-edit" title="Xem" />
            </Link>
            : ""}

        </span>
      ),
      width: '10%'
    },
  ];

  useEffect(() => {
    var dataSearchTmp = dataSearch;
    dataSearchTmp.data = {};
    props.getSeletedByOrgpath();
    props.filterData(dataSearchTmp);
    props.getSelectedDataOrg();
  }, []);

  useEffect(() => {
    if (props.productData) {
      switch (props.productData.type) {
        case `${ACTION_MODULE.PRODUCT}_${types.PAGING_SUCCESS}`:
          setLoading(false);
          setDataContent(props.productData.data);
          setPagination({
            current: props.productData.curPage,
            pageSize: props.productData.perPage,
            total: props.productData.total,

          });
          break;
        case `${ACTION_MODULE.PRODUCT}_${types.CREATE_UPDATE_SUCCESS}`:
          openNotification('success', 'Thành công', message.createSuccess);
          props.filterData(dataSearch);
          closePopup();
          break;
        case `${ACTION_MODULE.PRODUCT}_${types.CREATE_ERROR}`:
          openNotification('error', 'Lỗi', message.createError);
          break;
        case `${ACTION_MODULE.PRODUCT}_${types.DELETE_SUCCESS}`:
          openNotification('success', 'Thành công', message.deleteSuccess);
          props.filterData(dataSearch);
          break;
        case `${ACTION_MODULE.PRODUCT}_${types.DELETE_ERROR}`:
          openNotification('error', 'Lỗi', message.deleteError);
          break;
        case `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_ID_SUCCESS}`:
          setDataDetail(props.productData);
          break;
        case `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_ID_ERROR}`:
          openNotification('error', 'Lỗi', message.messageError);
          break;
        default:
          break;
      }
    }
  }, [props, props.productData, dataSearch]);

  useEffect(() => {
    if (props.merchandiseData && props.merchandiseData.type === `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_SELETED_SUCCESS}`) {
      setLstMerchandise(props.merchandiseData.data);
    }
  }, [props.merchandiseData]);

  useEffect(() => {
    if (props.dataOrg && props.dataOrg.type === GET_SELETED_ORGANIZATION_SUCCESS) {
      setLstOrg(props.dataOrg.data);
    }
  })

  const handlerSearch = data => {
    setLoading(true);
    dataPost.data = data;
    setDataSearch(dataPost);
    props.filterData(dataSearch);
  }

  const handleTableChange = (pagination) => {
    setDataSearch(pagination);
    props.filterData(pagination);
  }

  const handleEdit = (data) => {
    props.findById(data.productId);
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
    props.saveOrUpdate(data);
  }

  const onSave = (data) => {
    var instance = data;
    props.saveOrUpdate(instance);
  }

  const handleDelete = (data) => {
    if (data) {
      props.deleteData(data);
    }
  }

  return (
    <div>
      <Card title={message.titleFormSearch}>
        <FormSearch lstOrg={lstOrg} lstMerchandise={lstMerchandise} onCreate={handleAdd} onSearch={handlerSearch}></FormSearch>
      </Card>
      <br />
      <Card title={message.titleFormListProduct}>
        {hasPermission(resourceCode.product, control.hasView) === 1 ?
          <Table
            columns={columns} bordered
            rowKey={record => record.productId}
            dataSource={dataContent}
            pagination={pagination}
            loading={isLoading}
            onChange={handleTableChange}
          /> :
          <b>Không có quyền xem</b>
        }

      </Card>
      {
        hasPermission(resourceCode.product, control.hasEdit) === 1 ? <PopupInfo lstMerchandise={lstMerchandise} isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} onSave={onSaveChange} /> : ""
      }
      {
        hasPermission(resourceCode.product, control.hasAdd) === 1 ? <PopupAdd isShowAdd={isShowAdd} closePopup={closePopup} onSave={onSave} lstMerchandise={lstMerchandise} /> : ""
      }
    </div>
  );
}

const mapStateToProps = state => ({
  productData: state.productReducer,
  merchandiseData: state.merchandiseRegisReducer,
  file: state.fileReducer,
  dataOrg: state.organizationReducer,
});

const mapDispatchToProps = dispatch => {
  return {
    filterData: (data) => dispatch(getDataPaging(data)),
    saveOrUpdate: (data) => dispatch(saveOrUpdate(data)),
    deleteData: (data) => dispatch(deleteData(data)),
    getSeletedByOrgpath: () => dispatch(getSeletedByOrgpath()),
    findById: id => dispatch(findById(id)),
    getSelectedDataOrg: () => dispatch(getSelectedDataOrg())
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Product);
