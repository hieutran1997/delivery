import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import useForm from 'react-hook-form';
import { hasPermission, control, resourceCode } from '../../../shared/common';
import { FormInput } from '../../../shared/components';

export function FormSearch(props) {
    const { register, handleSubmit, errors, setValue } = useForm();

    const onSearch = data => {
        props.onSearch(data);
    };

    const onCreate = () => {
        props.onCreate();
    }

    return (
        <div className="from-search">
            <form onSubmit={handleSubmit(onSearch)}>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <FormInput valueName="code" value="" labelName="Mã" inputClassName="ant-input"
                            register={register} setValue={setValue} errors={errors} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <FormInput valueName="name" value="" labelName="Tên" inputClassName="ant-input"
                            register={register} setValue={setValue} errors={errors} />
                    </Col>
                </Row>

                <div className="footer-modal">
                    <button type="submit" className="ant-btn ant-btn-primary">
                        <Icon type="search" />
                        &nbsp;
                        Tìm kiếm
                    </button>
                    &nbsp;&nbsp;
                    {hasPermission(resourceCode.user, control.hasAdd) === 1 ? <Button type="primary" icon="plus" onClick={onCreate}>
                        Thêm mới
                    </Button> : ""}
                </div>
            </form>
        </div>
    );
}