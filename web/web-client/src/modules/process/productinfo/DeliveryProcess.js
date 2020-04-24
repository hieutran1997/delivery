import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging, findByMerCode, saveOrUpdate } from '../../../shared/actions/process/DeliveryProcessResource';
import { dataPost, hasPermission, resourceCode, control, DateFormat, ACTION_MODULE, openNotification, message } from '../../../shared/common';
import { getSelectedData as getSelectedDataOrg } from '../../../shared/actions/system/ActionOrganization';
import { Table, Button } from 'antd';
import moment from 'moment';
import TableFile from '../../../shared/components/FileTable.component';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { PopupAddDelivery } from './PopupAddDelivery.component';
import * as types from '../../../shared/constants/ActionTypeCommon';
import { GET_SELETED_ORGANIZATION_SUCCESS } from '../../../shared/constants/ActionTypes';

function DeliveryProcess(props) {
    const [code, setCode] = useState('');
    const [dataSearch, setDataSearch] = useState(dataPost);
    const [dataContent, setDataContent] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isShowAdd, setIsShowAdd] = useState(false);
    const [lstTimeLine, setLstTimeLine] = useState([]);
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
            title: 'Ngày bắt đầu',
            key: 'startDate',
            width: '10%',
            render: (text, record) => (
                <span>{record.startDate ? moment(record.endstartDateate).format(DateFormat) : ""}</span>
            )
        },
        {
            title: 'Ngày kết thúc',
            key: 'endDate',
            width: '10%',
            render: (text, record) => (
                <span>{record.endDate ? moment(record.endDate).format(DateFormat) : ""}</span>
            )
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            width: '10%',
        },
        {
            title: 'Mô tả',
            key: 'image',
            width: '10%',
            render: (text, record) => (
                <>
                    <TableFile type="image" fileAttachment={record.fileAttachment}></TableFile>
                </>
            )
        }
    ];

    useEffect(() => {
        if (props.productCode) {
            setCode(props.productCode);
            let temp = dataSearch;
            temp.data.productCode = props.productCode;
            props.filterData(temp);
        }
    }, [props.productCode]);

    useEffect(() => {
        if (props.propsData) {
            switch (props.propsData.type) {
                case `${ACTION_MODULE.DELIVERY}_${types.PAGING_SUCCESS}`:
                    setLoading(false);
                    setDataContent(props.propsData.data);
                    setPagination({
                        current: props.propsData.curPage,
                        pageSize: props.propsData.perPage,
                        total: props.propsData.total
                    });
                    break;
                case `${ACTION_MODULE.DELIVERY}_${types.FIND_BY_MERCHANDISE_ID_SUCCESS}`:
                    setLstTimeLine(props.propsData.data);
                    break;
                case `${ACTION_MODULE.DELIVERY}_${types.CREATE_UPDATE_SUCCESS}`:
                    openNotification('success', 'Thành công', message.createSuccess);
                    props.filterData(dataSearch);
                    props.findByMerCode(code);
                    closePopup();
                    break;
                case `${ACTION_MODULE.DELIVERY}_${types.CREATE_ERROR}`:
                    openNotification('error', 'Lỗi', message.createError);
                    break;
                default:
                    break;
            }
        }
    }, [props.propsData]);



    useEffect(() => {
        if (props.view && props.view === 'grid') {
            if (code !== "") {
                let temp = dataSearch;
                temp.data.productCode = code;
                props.filterData(temp);
            }
        }
        else if (props.view && props.view !== 'grid' && code != '') {
            props.findByMerCode(code);
        }
        if(props.view){
            props.getSelectedDataOrg();
        }
        
    }, [props.view, props.productCode]);

    useEffect(()=>{
        if (props.dataOrg && props.dataOrg.type === GET_SELETED_ORGANIZATION_SUCCESS) {
            setLstOrg(props.dataOrg.data);
          }
    }, [props.dataOrg])

    const handleTableChange = (pagination) => {
        setDataSearch(pagination);
        let temp = pagination;
        temp.data.productCode = props.productCode;
        props.filterData(pagination);
    }

    const closePopup = () => {
        setIsShowAdd(false);
    }

    const onSave = (data) => {
        if (data) {
            data.merchandiseId = props.product.productId;
            props.saveOrUpdate(data);
        }
    }

    const bindDate = (data) => {
        let startDate = data.startDate ? moment(data.startDate).format(DateFormat) : "Bắt đầu";
        let endDate = data.endDate ? moment(data.endDate).format(DateFormat) : "Hiện nay";
        return (
            <span>{startDate + ' - ' + endDate}</span>
        )
    }

    return (
        <div>
            <table width={'100%'}>
                <thead style={{ hiden: true }}>
                    <tr>
                        <th width="10%">
                        </th>
                        <th width="20%">
                        </th>
                        <th>
                        </th>
                    </tr>
                </thead>
                <tbody className="ant-table-tbody">
                    <tr>
                        <td><b>Mã hàng: </b></td>
                        <td>{props.product.productCode}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><b>Tên hàng: </b></td>
                        <td>{props.product.productName}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><b>Đơn vị: </b></td>
                        <td>{props.product.organizationName}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><b>File đính kèm: </b></td>
                        <td><TableFile fileAttachment={props.product.fileAttachment}></TableFile></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            {hasPermission(resourceCode.user, control.hasAdd) === 1 ?
                                <Button type="primary" icon="plus" style={{ float: "right" }} onClick={() => { setIsShowAdd(true); }}>
                                    Thêm mới
                            </Button> : ""}
                        </td>
                    </tr>
                </tbody>
            </table>
            {props.view === 'grid' ? <div>
                {hasPermission(resourceCode.product, control.hasView) === 1 ?
                    <Table
                        columns={columns} bordered
                        rowKey={record => record.deliveryProcessId}
                        dataSource={dataContent}
                        pagination={pagination}
                        loading={isLoading}
                        onChange={handleTableChange}
                    /> :
                    <b>Không có quyền xem</b>
                }
            </div>
                :
                <div style={{ backgroundColor: 'cadetblue' }}>
                    <VerticalTimeline>
                        {
                            lstTimeLine ? lstTimeLine.map(item => (
                                <VerticalTimelineElement key={item.deliveryProcessId}
                                    className="vertical-timeline-element--work"
                                    date={bindDate(item)}
                                    iconClassName="icon-time-line"
                                    iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                                >
                                    <h3 className="vertical-timeline-element-title"><b>Địa chỉ: </b>{item.address}</h3>
                                    <span><b>Nội dung: </b> {item.description}</span>
                                    <br />
                                    <TableFile type="image" fileAttachment={item.fileAttachment}></TableFile>
                                </VerticalTimelineElement>
                            )) : ""
                        }
                    </VerticalTimeline>
                </div>
            }
            {hasPermission(resourceCode.product, control.addAction) === 1 ? <PopupAddDelivery lstOrg={lstOrg} isShowAdd={isShowAdd} closePopup={closePopup} onSave={onSave}></PopupAddDelivery> : ""}
        </div>
    );
}

const mapStateToProps = state => ({
    propsData: state.deliveryReducer,
    dataOrg: state.organizationReducer
});

const mapDispatchToProps = dispatch => {
    return {
        filterData: (data) => dispatch(getDataPaging(data)),
        findByMerCode: (id) => dispatch(findByMerCode(id)),
        saveOrUpdate: (data) => dispatch(saveOrUpdate(data)),
        getSelectedDataOrg: () => dispatch(getSelectedDataOrg())
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeliveryProcess);