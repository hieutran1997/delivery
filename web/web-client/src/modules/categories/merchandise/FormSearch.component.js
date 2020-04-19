import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import useForm from 'react-hook-form';
import { hasPermission, control, resourceCode } from '../../../shared/common';
import { FormInput, FormAutoComplete } from '../../../shared/components';

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
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <FormAutoComplete inputClassName="custom-input-as-ant-input"
                            labelName="Loại hàng"
                            valueName="catTypeMerchandiseId"
                            dataKey="id"
                            options={props.lstType? props.lstType: []}
                            optionLabel="name"
                            filter={true}
                            filterPlaceholder='Chọn loại hàng hóa'
                            filterBy="name"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            showClear={true} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <FormAutoComplete inputClassName="custom-input-as-ant-input"
                            labelName="Nhóm hàng"
                            valueName="catGroupMerchandiseId"
                            dataKey="id"
                            options={props.lstGroup? props.lstGroup: []}
                            optionLabel="name"
                            filter={true}
                            filterPlaceholder='Chọn nhóm hàng hóa'
                            filterBy="name"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            showClear={true} />
                    </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <FormAutoComplete inputClassName="custom-input-as-ant-input"
                            labelName="Đơn vị tính"
                            valueName="catUnitId"
                            dataKey="id"
                            options={props.lstUnit? props.lstUnit: []}
                            optionLabel="name"
                            filter={true}
                            filterPlaceholder='Chọn đơn vị tính'
                            filterBy="name"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            showClear={true} />
                    </Col>
                    <Col span={13}></Col>
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