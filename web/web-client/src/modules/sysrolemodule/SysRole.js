import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Card, Table, Icon, Popconfirm } from 'antd';
import { connect } from 'react-redux';
import { getDataPaging
        , insert
        , update
        , deleteData
        , insertRolePermission
        , getRolePermission 
    } from '../../actions/ActionRole';
import { dataPost, message, openNotification, mappingDataChange } from '../../common';
import {
    GETROLE_PAGING_SUCCESS,
    UPDATE_ROLE_SUCCESS,
    UPDATE_ROLE_ERROR,
    CREATE_ROLE_SUCCESS,
    CREATE_ROLE_ERROR,
    DELETE_ROLE_SUCCESS,
    DELETE_ROLE_ERROR,
    GETUSER_PAGING_ERROR,
    CREATE_ROLE_PERMISSION_ERROR,
    CREATE_ROLE_PERMISSION_SUCCESS,
    GET_ROLE_PERMISSION_SUCCESS
} from '../../constants/ActionTypes';
import { PopupInfo } from './popupInfo.component';
import { PopupAdd } from './popupAdd.component';
import { FormSearch } from './formSearch.component';
import { PopupAddPermission } from './formAddPermission.component';

function SysRole(props) {
    const [onInit, setOnInit] = useState(true);
    const [dataContent, setDataContent] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [dataSearch, setDataSearch] = useState(dataPost);
    const [isEdit, setIsEdit] = useState(false);
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [isShowAddPermission, setIsShowAddPermission] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [isError, setError] = useState(false);
    const [lstTarget, setLstTarget] = useState([]);

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
            title: 'Mã vai trò',
            dataIndex: 'code',
            width: '20%'
        },
        {
            title: 'Tên vai trò',
            dataIndex: 'sysRoleName',
            width: '20%'
        },
        {
            title: '#',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Icon type="apartment" onClick={() => { handlerAddPer(record) }} className="icon-action" title="Phân quyền" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action" title="Sửa" />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Popconfirm
                        title={message.messageConfirmDelete}
                        okText={message.okText}
                        cancelText={message.cancelText}
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
        if(onInit){
            setOnInit(false);
            setLoading(true);
            if (dataContent.length === 0) {
                props.filterData(dataSearch);
            }
        }
        if(props.role && !onInit) {
            setLoading(false);
            switch (props.role.type) {
                case GETROLE_PAGING_SUCCESS:
                    setError(false);
                    setDataContent(props.role.data);
                    setPagination({
                        current: props.role.curPage + 1,
                        pageSize: props.role.perPage,
                        total: props.role.total,
                        size: 'small'
                    });
                    break;
                case GETUSER_PAGING_ERROR:
                    setDataContent([]);
                    setError(true);
                    break;
                case UPDATE_ROLE_SUCCESS:
                    openNotification('success', 'Thành công', message.updateSuccess);
                    props.filterData(dataSearch);
                    closePopup();
                    break;
                case UPDATE_ROLE_ERROR:
                    openNotification('error', 'Lỗi', message.updateSuccess);
                    break;
                case CREATE_ROLE_SUCCESS:
                    openNotification('success', 'Thành công', message.createSuccess);
                    props.filterData(dataSearch);
                    closePopup();
                    break;
                case CREATE_ROLE_ERROR:
                    openNotification('error', 'Lỗi', message.createError);
                    break;
                case DELETE_ROLE_SUCCESS:
                    openNotification('success', 'Thành công', message.deleteSuccess);
                    props.filterData(dataSearch);
                    break;
                case DELETE_ROLE_ERROR:
                    openNotification('error', 'Lỗi', message.deleteError);
                    break;
                case CREATE_ROLE_PERMISSION_SUCCESS:
                    openNotification('success', 'Thành công', message.createSuccess);
                    closePopup();
                    break;
                case CREATE_ROLE_PERMISSION_ERROR:
                    openNotification('error', 'Lỗi', message.createError);
                    break;
                case GET_ROLE_PERMISSION_SUCCESS:
                    if(props.role.data){
                        props.role.data.forEach(function(item){
                            let resourceControl = JSON.parse(item.ortherControlsOfResource);
                            let perControl = JSON.parse(item.ortherControls);
                            let temp = {}
                            if(perControl){
                                for (const [key, valuePermission] of Object.entries(perControl)) {
                                    if(key in resourceControl){
                                        temp[key] = {
                                            title: resourceControl[key],
                                            value: valuePermission
                                        }
                                    }
                                }
                                for (const [key, valueResource] of Object.entries(resourceControl)) {
                                    if(!(key in perControl)){
                                        temp[key] = {
                                            title: valueResource,
                                            value: 0
                                        }
                                    }
                                }
                            }
                            else{
                                for (const [key, valueResource] of Object.entries(resourceControl)) {
                                    temp[key] = {
                                        title: valueResource,
                                        value: 0
                                    }
                                }
                            }
                            item.ortherControls = temp;
                        });
                    }
                    setLstTarget(props.role.data);
                    break;
                default:
                    console.log('1');
                    break;
            }
        
        }
    }, [props, dataSearch, dataContent, isError, onInit, setOnInit, setLstTarget]);

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
        setDataDetail({});
        setIsShowAdd(true);
    }

    const handlerAddPer = (data) =>{
        props.getRolePermission(data.code);
        setDataDetail(data);
        setIsShowAddPermission(true);
    }

    const closePopup = () => {
        setIsEdit(false);
        setIsShowAdd(false);
        setIsShowAddPermission(false);
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

    const onSavePermission = (data)=>{
        console.log('data', data);
        props.insertRolePermission(data);
    }

    return (
        <div>
            <Card title={message.titleFormSearch}>
                <FormSearch onCreate={handleAdd} onSearch={handlerSearch}></FormSearch>
            </Card>
            <br />
            <Card title={message.titleFormRole}>
                <Table
                    columns={columns}
                    rowKey={record => record.code}
                    dataSource={dataContent}
                    pagination={pagination}
                    loading={isLoading}
                    onChange={handleTableChange}
                />
            </Card>

            <PopupAddPermission isShowAddPermission={isShowAddPermission} dataDetail={dataDetail} closePopup={closePopup} lstTarget={lstTarget} onSave={onSavePermission}/>
            <PopupAdd isShowAdd={isShowAdd} dataDetail={dataDetail} closePopup={closePopup} onSave={onSave} />
            <PopupInfo isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} onSave={onSaveChange}></PopupInfo>
        </div>
    );
}

const mapStateToProps = state => ({
    role: state.roleReducer
});

const mapDispatchToProps = dispatch => {
    return {
        filterData: (data) => dispatch(getDataPaging(data)),
        insert: (data) => dispatch(insert(data)),
        update: (data) => dispatch(update(data)),
        deleteData: (data) => dispatch(deleteData(data)),
        insertRolePermission: (data) => dispatch(insertRolePermission(data)),
        getRolePermission: (resourceCode) => dispatch(getRolePermission(resourceCode))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SysRole);
