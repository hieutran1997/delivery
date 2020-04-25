import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { DateFormat } from '../shared/common';
import moment from 'moment';
import 'react-vertical-timeline-component/style.min.css';
import { useLocation } from 'react-router-dom';
import { findByCodeWithoutSecure, getProcessByCodeWithoutSecure } from '../shared/actions/process/ProductResource';
import { ACTION_MODULE } from '../shared/common';
import * as types from '../shared/constants/ActionTypeCommon';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import './ViewProduct.css';
import TableFile from '../shared/components/FileTable.component';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
let productCode = '';
function ViewProduct(props) {
    const [product, setProduct] = useState({});
    const [process, setProcess] = useState([]);
    const [loading, setLoading] = useState(true);

    let query = useQuery();
    if (!query.get("code") || query.get("code") === "") {
        //history.push("/admin/process/products");
    }
    else if (productCode !== query.get("code")) {
        productCode = query.get("code");
        props.findByCode(productCode);
        props.getProcessByCode(productCode);
    }

    useEffect(() => {
        if (props.propsData && props.propsData.type === `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_CODE_WITHOUT_SECURE_SUCCESS}`) {
            setProduct(props.propsData);
            setLoading(false);
        }
        if (props.propsData && props.propsData.type === `${ACTION_MODULE.PRODUCT}_${types.GET_PROCESSS_BY_CODE_WITHOUT_SECURE_SUCCESS}`) {
            setProcess(props.propsData.result.data);
            setLoading(false);
        }

    }, [props.propsData]);

    const bindDate = (data) => {
        let startDate = data.startDate ? moment(data.startDate).format(DateFormat) : "Bắt đầu";
        let endDate = data.endDate ? moment(data.endDate).format(DateFormat) : "Hiện nay";
        return (
            <span>{startDate + ' - ' + endDate}</span>
        )
    }

    const bindType = (type) => {
        if (type === 1) {
            return (<span>Phát triển</span>);
        }
        else if (type === 2) {
            return (<span>Sản xuất, chế biến</span>);
        }
        else if (type === 3) {
            return (<span>Vận chuyển</span>);
        }
        else {
            return (<span>Bày bán</span>);
        }
    }

    const bindContent = (type, item) => {
        if (type === 1) {
            return (
                <>
                    <p><b>Địa chỉ: </b>{item.address}</p>
                    <p><b>Nội dung: </b> {item.description}</p>
                </>
            );
        }
        else if (type === 2) {
            return (
                <>
                    <p><b>Khu sản xuất: </b>{item.factory}</p>
                    <p><b>Người quản lý: </b> {item.peopleProcessing}</p>
                </>
            );
        }
        else if (type === 3) {
            return (
                <>
                    <p><b>Số văn bản: </b>{item.documentNumber}</p>
                    <p><b>Vận chuyển từ: </b> {item.organizationSourceName} -> {item.organizationDescName}</p>
                    <p><b>Đánh giá: </b> {item.evaluation}</p>
                </>
            );
        }
        else {
            return (
                <>
                    <p><b>Nơi bày bán: </b>{item.factory}</p>
                    <p><b>Nội dung: </b> {item.peopleProcessing}</p>
                </>
            );
        }
    }

    return (
        <div>
            <Card style={{ width: '100%' }} loading={loading} className="card-viewer">

                <VerticalTimeline>
                    {
                        process ? process.map(item => (
                            <VerticalTimelineElement key={`${item.objectId}_${item.typeProcess}`}
                                className="vertical-timeline-element--work"
                                date={bindDate(item)}
                                iconClassName="icon-time-line"
                                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                            >
                                <h3 className="vertical-timeline-element-title"><b>Quá trình: </b>{bindType(item.typeProcess)}</h3>
                                {bindContent(item.typeProcess, item)}
                                <p><b>File đính kèm: </b></p>
                                <TableFile type="image" fileAttachment={item.fileAttachment}></TableFile>
                            </VerticalTimelineElement>
                        )) : ""
                    }
                </VerticalTimeline>
            </Card>

        </div>
    );
}

const mapStateToProps = state => ({
    propsData: state.productReducer,
});

const mapDispatchToProps = dispatch => {
    return {
        findByCode: (code) => dispatch(findByCodeWithoutSecure(code)),
        getProcessByCode: (code) => dispatch(getProcessByCodeWithoutSecure(code))
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewProduct);