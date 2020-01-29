import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Icon, Popconfirm } from 'antd';
import { dataPost, message, openNotification, mappingDataChange, hasPermission, control, resourceCode } from '../../../shared/common';
import { getSelectedData, insert, update, deleteData, getDataPaging, getChild, findOne } from '../../../actions/ActionOrganization';
import { FormSearch } from './formSearch.component';
import { PopupAdd } from './popupAdd.component';
import { PopupInfo } from './popupInfo.component';
import {
    GET_SELETED_ORGANIZATION_SUCCESS
    , GET_ORG_PAGING_SUCCESS
    , UPDATE_ORGANIZATION_SUCCESS
    , UPDATE_ORGANIZATION_ERROR
    , CREATE_ORGANIZATION_SUCCESS
    , CREATE_ORGANIZATION_ERROR
    , DELETE_ORGANIZATION_SUCCESS
    , DELETE_ORGANIZATION_ERROR
    , GET_CHILD_ORGANIZATION_SUCCESS
    , FIND_ONE_ORG_SUCCESS
    , FIND_ONE_ORG_ERROR
} from '../../../shared/constants/ActionTypes';

function Organization(props) {
    const [dataContent, setDataContent] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [dataSearch, setDataSearch] = useState(dataPost);
    const [isEdit, setIsEdit] = useState(false);
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [dataDetail, setDataDetail] = useState({});
    const [onInit, setOnInit] = useState(true);
    const [lstOrg, setLstOrg] = useState([]);
    const [parentCode, setParentCode] = useState(0);

    const columns = [
        {
            title: 'Mã đơn vị',
            width: '12%',
            dataIndex: 'code',
        },
        {
            title: 'Tên',
            dataIndex: 'organizationName',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '30%',
        },
        {
            title: '#',
            render: (text, record) => (
                <span>
                    {hasPermission(resourceCode.organization, control.hasEdit) === 1 ? <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action" title="Sửa" /> : ""}
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    {hasPermission(resourceCode.organization, control.hasDelete) === 1 ? <Popconfirm
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
            props.getSelectedData();
            props.filterData(dataSearch);
            setOnInit(false);
        }
        if (props.dataOrg) {
            switch (props.dataOrg.type) {
                case GET_ORG_PAGING_SUCCESS:
                    setLoading(false);
                    let temp = prepareData(props.dataOrg.data);
                    setDataContent(temp);
                    setPagination({
                        current: props.dataOrg.curPage + 1,
                        pageSize: props.dataOrg.perPage,
                        total: props.dataOrg.total,
                        size: 'small'
                    });
                    break;
                case UPDATE_ORGANIZATION_SUCCESS:
                    openNotification('success', 'Thành công', message.updateSuccess);
                    props.filterData(dataSearch);
                    closePopup();
                    break;
                case UPDATE_ORGANIZATION_ERROR:
                    openNotification('error', 'Lỗi', message.updateSuccess);
                    break;
                case CREATE_ORGANIZATION_SUCCESS:
                    openNotification('success', 'Thành công', message.createSuccess);
                    props.filterData(dataSearch);
                    closePopup();
                    break;
                case CREATE_ORGANIZATION_ERROR:
                    openNotification('error', 'Lỗi', message.createError);
                    break;
                case DELETE_ORGANIZATION_SUCCESS:
                    openNotification('success', 'Thành công', message.deleteSuccess);
                    props.filterData(dataSearch);
                    break;
                case DELETE_ORGANIZATION_ERROR:
                    openNotification('error', 'Lỗi', message.deleteError);
                    break;
                case GET_SELETED_ORGANIZATION_SUCCESS:
                    setLstOrg(props.dataOrg.data);
                    break;
                case GET_CHILD_ORGANIZATION_SUCCESS:
                    setLoading(false);
                    let tmp = prepareData(props.dataOrg.data);
                    pushData(tmp);
                    break;
                case FIND_ONE_ORG_SUCCESS:
                    setDataDetail(props.dataOrg);
                    break;
                case FIND_ONE_ORG_ERROR:
                    openNotification('error', 'Lỗi', message.messageError);
                    break;
                default:
                    console.log('1');
                    break;
            }
        }
    }, [props, dataContent, dataSearch, onInit, setOnInit, setDataContent]);

    const prepareData = data => {
        if (data && data.length > 0) {
            data.map((item) => {
                if (item.isLeaf === 0) {
                    item.children = [];
                }
            });
            return data;
        }
    }

    const searchTree = (element, matchingCode) => {
        if (element.code === matchingCode) {
            return element;
        } else if (element.children !== null) {
            let i;
            let result = null;
            for (i = 0; result === null && i < element.children.length; i++) {
                result = searchTree(element.children[i], matchingCode);
            }
            return result;
        }
        return null;
    }

    const pushData = data => {
        let temp = dataContent;
        if (data && data.length > 0) {
            temp.map((item) => {
                let dataTemp = searchTree(item, parentCode);
                dataTemp.children = data;
            });
            setDataContent(temp);
        }
    }

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
        props.findOne(data.id);
        setIsEdit(true);
    }

    const handleAdd = () => {
        setDataDetail({});
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

    const onExpand = function (expanded, record) {
        if (record && record.children.length === 0) {
            setLoading(true);
            props.getChild(record.code);
            setParentCode(record.code);
        }
    }

    return (
        <>
            <Card title={message.titleFormSearch}>
                <FormSearch onCreate={handleAdd} onSearch={handlerSearch}></FormSearch>
            </Card>
            <Card title="Danh sách đơn vị" >
                <Table rowKey={record => record.code} loading={isLoading} columns={columns} dataSource={dataContent} pagination={pagination} onExpand={onExpand} onChange={handleTableChange} />
            </Card>

            {
                hasPermission(resourceCode.resource, control.hasEdit) === 1 ? <PopupInfo isEdit={isEdit} dataDetail={dataDetail} closePopup={closePopup} onSave={onSaveChange} lstOrg={lstOrg} /> : ""
            }
            {
                hasPermission(resourceCode.resource, control.hasAdd) === 1 ? <PopupAdd isShowAdd={isShowAdd} dataDetail={dataDetail} closePopup={closePopup} onSave={onSave} lstOrg={lstOrg} /> : ""
            }
        </>
    );
}

const mapStateToProps = state => ({
    dataOrg: state.organizationReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        filterData: (data) => dispatch(getDataPaging(data)),
        insert: (data) => dispatch(insert(data)),
        update: (data) => dispatch(update(data)),
        deleteData: (data) => dispatch(deleteData(data)),
        getSelectedData: () => dispatch(getSelectedData()),
        getChild: (parentCode) => dispatch(getChild(parentCode)),
        findOne: (id) => dispatch(findOne(id))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Organization);
