import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Table, Icon, Popconfirm } from 'antd';
import { dataPost, message, openNotification, mappingDataChange, hasPermission, control, resourceCode } from '../../../shared/common';
import { getSelectedData, insert, update, deleteData, getDataPaging } from '../../../actions/ActionOrganization';
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
            console.log('props.dataOrg', props.dataOrg);
            switch (props.dataOrg.type) {
                case GET_ORG_PAGING_SUCCESS:
                    setLoading(false);
                    prepareData(props.dataOrg.data);
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
                default:
                    console.log('1');
                    break;
            }
        }
    }, [props, dataContent, dataSearch, onInit, setOnInit]);

    const prepareData = data => {
        console.log('data', data);
        if (data && data.length > 0) {
            data.map((item) => {
                if (item.isLeaf == 0) {
                    item.children = [];
                }
            });
            setDataContent(data);
        }

    }

    const data = [
        {
            key: 1,
            name: 'John Brown sr.',
            age: 60,
            address: 'New York No. 1 Lake Park',
            children: [
                {
                    key: 11,
                    name: 'John Brown',
                    age: 42,
                    address: 'New York No. 2 Lake Park',
                },
                {
                    key: 12,
                    name: 'John Brown jr.',
                    age: 30,
                    address: 'New York No. 3 Lake Park',
                    children: [
                        {
                            key: 121,
                            name: 'Jimmy Brown',
                            age: 16,
                            address: 'New York No. 3 Lake Park',
                        },
                    ],
                },
                {
                    key: 13,
                    name: 'Jim Green sr.',
                    age: 72,
                    address: 'London No. 1 Lake Park',
                    children: [
                        {
                            key: 131,
                            name: 'Jim Green',
                            age: 42,
                            address: 'London No. 2 Lake Park',
                            children: [
                                {
                                    key: 1311,
                                    name: 'Jim Green jr.',
                                    age: 25,
                                    address: 'London No. 3 Lake Park',
                                },
                                {
                                    key: 1312,
                                    name: 'Jimmy Green sr.',
                                    age: 18,
                                    address: 'London No. 4 Lake Park',
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            key: 2,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];

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

    }

    return (
        <>
            <Card title={message.titleFormSearch}>
                <FormSearch onCreate={handleAdd} onSearch={handlerSearch}></FormSearch>
            </Card>
            <Card title="Danh sách đơn vị" >
                <Table rowKey={record => record.code} loading={isLoading} columns={columns} dataSource={dataContent} pagination={pagination} expandRowByClick={true} onExpand={onExpand} onChange={handleTableChange} />
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
        getSelectedData: () => dispatch(getSelectedData())
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Organization);
