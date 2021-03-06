import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import useForm from 'react-hook-form';
import { hasPermission, control, resourceCode } from '../../../shared/common';

export function FormSearch(props) {
    const { register, handleSubmit, setValue } = useForm();
    const [dataDetail, setDataDetail] = useState({});

    const onSearch = data => {
        props.onSearch(data);
    };

    const onCreate = () =>{
        props.onCreate();
    }

    useEffect(() => {
        if (props.dataDetail) {
            setDataDetail(props.dataDetail);
            setTimeout(function () {
                setValue("code", props.dataDetail.code);
                setValue("name", props.dataDetail.resourceName);
            }, 100);
        }
    }, [props.dataDetail, dataDetail, setValue]);

    return (
        <div className="from-search">
            <form onSubmit={handleSubmit(onSearch)}>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <span>Mã:</span>
                        <input name="code" className="ant-input" ref={register} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <span>Tên:</span>
                        <input name="name" className="ant-input" ref={register} />
                    </Col>
                </Row>

                <div className="footer-modal">
                    <button type="submit" className="ant-btn ant-btn-primary">
                        <Icon type="search" />
                        &nbsp;
                        Tìm kiếm
                    </button>
                    &nbsp;&nbsp;
                    {hasPermission(resourceCode.resource, control.hasAdd) === 1?<Button type="primary" icon="plus" onClick={onCreate}>
                        Thêm mới
                    </Button>: ""}
                    
                </div>
            </form>
        </div>
    );
}