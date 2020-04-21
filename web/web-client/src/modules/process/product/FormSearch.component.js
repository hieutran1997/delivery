import React from 'react';
import { Row, Col, Button, Icon } from 'antd';
import useForm from 'react-hook-form';
import { hasPermission, control, resourceCode, typeOfDynamicInput, appConfig } from '../../../shared/common';
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
                        <FormInput valueName="productCode" value="" labelName="Mã" inputClassName="ant-input"
                            register={register} setValue={setValue} errors={errors} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <FormInput valueName="productName" value="" labelName="Tên" inputClassName="ant-input"
                            register={register} setValue={setValue} errors={errors} />
                    </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <FormAutoComplete inputClassName="custom-input-as-ant-input"
                            labelName="Sản phẩm đã đăng ký"
                            valueName="merchandiseRegisterId"
                            dataKey="id"
                            options={props.lstMerchandise}
                            optionLabel="name"
                            filter={true}
                            filterPlaceholder='Chọn hàng hóa'
                            filterBy="value,name"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            showClear={true} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <FormInput valueName="status" labelName="Trạng thái"
                            inputClassName="ant-input custom-input-as-ant-input" dataKey="value" options={appConfig.PRODUCT_STATUS}
                            register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
                    </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <FormInput valueName="dateOfManufacture" labelName="Ngày sản xuất"
                            register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <FormInput valueName="typeOfManufacture" labelName="Trong loại hình" 
                        inputClassName="ant-input custom-input-as-ant-input" dataKey="value" 
                        options={appConfig.TYPE_OF_MANUFACTURE} showClear={true}
                        register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
                    </Col>
                </Row>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                    <FormAutoComplete inputClassName="custom-input-as-ant-input"
                            labelName="Đơn vị"
                            valueName="orgnizationId"
                            dataKey="id"
                            options={props.lstOrg}
                            optionLabel="name"
                            filter={true}
                            filterPlaceholder='Chọn đơn vị'
                            filterBy="name"
                            register={register} 
                            setValue={setValue} 
                            errors={errors} 
                            showClear={true}/>
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