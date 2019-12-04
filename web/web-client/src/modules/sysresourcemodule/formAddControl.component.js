import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Table, Icon, Popconfirm, Divider } from 'antd';
import useForm from 'react-hook-form';
import { message, openNotification } from '../../common';

export function PopupAddControl(props) {
    const { register, handleSubmit, errors, setValue } = useForm();
    const [isShowAddControl, setIsShowAddControl] = useState(false);
    const [dataDetail, setDataDetail] = useState(props);
    const [dataTable, setDataTable] = useState([]);
    const [onInit, setOnInit] = useState(true);

    const onSaveEdit = data => {
        let newArr = [...dataTable];
        let dataSave = {
            id: props.dataDetail.id,
            code: props.dataDetail.code,
            ortherControls: {}
        };
        if(data.controlCode){
            if(!data.controlName){
                openNotification('error', 'Lỗi', message.missingNameControlError);
                return;
            }
            dataSave.ortherControls[data.controlCode] = data.controlName;
            newArr.push(data);
        }
        dataTable.forEach(function(item){
            dataSave.ortherControls[item.controlCode] = item.controlName;
        });
        setDataTable(newArr);
        setOnInit(false);
        props.onSave(dataSave);
    };

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
            title: 'Mã',
            dataIndex: 'controlCode',
            width: '20%'
        },
        {
            title: 'Tên control',
            dataIndex: 'controlName',
            width: '30%'
        },
        {
            title: '#',
            key: 'action',
            render: (text, record, index) => (
                <span>
                    <Popconfirm
                        title={message.messageConfirmDelete}
                        okText={message.okText}
                        cancelText={message.cancelText}
                        icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                        onConfirm={() => { handleDelete(index) }}
                    >
                        <Icon type="delete" className="icon-action" title="Xóa" />
                    </Popconfirm>
                </span>
            ),
            width: '10%'
        },
    ];

    useEffect(() => {
        if (props.dataDetail && props.isShowAddControl && onInit) {
            setDataDetail(props.dataDetail);
            if (props.dataDetail.ortherControls) {
                let lstDataTable = [];
                let temp = JSON.parse(props.dataDetail.ortherControls);
                for (const [key, value] of Object.entries(temp)) {
                    let obj = {
                        controlCode: key,
                        controlName: value
                    }
                    lstDataTable.push(obj);
                }
                setDataTable(lstDataTable);
            }
        }
        setIsShowAddControl(props.isShowAddControl);
    }, [props, dataDetail, setValue, setDataTable, onInit]);

    const handleDelete = (index) => {
        let newArr = [...dataTable];
        newArr.splice(index, 1);
        setDataTable(newArr);
    }

    const onClose = () =>{
        setOnInit(true);
        setValue("controlCode", '');
        setValue("controlName", '');
        props.closePopup();
    }

    return (
        <Modal
            title={`Thêm mới hoạt động: ${props.dataDetail.resourceName}`}
            visible={isShowAddControl}
            footer={null}
            width={800}
            onCancel={props.closePopup}
        >
            <form onSubmit={handleSubmit(onSaveEdit)}>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <span>Mã:</span>
                        <input name="controlCode" className="ant-input" ref={register({ maxLength: 10 })} />
                        <span className="error-message">
                            {errors.controlCode && errors.controlCode.type === 'maxLength' && <span>Chỉ được nhập 10 ký tự</span> }
                        </span>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <span>Tên hoạt động: </span>
                        <input name="controlName" className="ant-input" ref={register({ maxLength: 100 })} />
                        <span className="error-message">
                            {errors.controlCode && errors.controlCode.type === 'maxLength' && <span>Chỉ được nhập 100 ký tự</span> }
                        </span>
                    </Col>
                </Row>
                <Divider dashed orientation="left">Danh sách control</Divider>
                <Table
                    columns={columns}
                    rowKey={record => record.controlCode}
                    dataSource={dataTable}
                />
                <div className="footer-modal">
                    <input type="submit" className="btn-save ant-btn btn-discard ant-btn-primary" value="Lưu lại" />
                    <Button type="danger" className="btn-discard" onClick={onClose}>Hủy</Button>
                </div>
            </form>
        </Modal>
    );
}