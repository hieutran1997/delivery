import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import useForm from 'react-hook-form';
import { hasPermission, control, resourceCode } from '../../../shared/common';
import { FormInput, FormAutoComplete } from '../../../shared/components';

export function FormSearch(props) {
    const { register, handleSubmit, errors, setValue } = useForm();
    const [dataDetail, setDataDetail] = useState({});
    const [lstOrg, setLstOrg] = useState([]);

    const onSearch = data => {
        props.onSearch(data);
    };

    const onCreate = () => {
        props.onCreate();
    }

    useEffect(() => {
        if (lstOrg.length === 0 && props.lstOrg.length > 0) {
            setLstOrg(props.lstOrg);
        }
        if (props.dataDetail) {
            setDataDetail(props.dataDetail);
        }
    }, [props, dataDetail, lstOrg, setValue, setLstOrg]);

    return (
        <div className="from-search">
            <form onSubmit={handleSubmit(onSearch)}>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        <FormInput valueName="firstname" value="" labelName="Họ" inputClassName="ant-input"
                            register={register} setValue={setValue} errors={errors} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <FormInput valueName="lastname" value="" labelName="Tên" inputClassName="ant-input"
                            register={register} setValue={setValue} errors={errors} />
                    </Col>
                </Row>
                <br />
                <Row type="flex" >
                    <Col span={11}>
                        <FormAutoComplete inputClassName="custom-input-as-ant-input"
                            labelName="Đơn vị"
                            valueName="organizationCode"
                            dataKey="value"
                            options={lstOrg}
                            optionLabel="name"
                            filter={true}
                            filterPlaceholder='Chọn đơn vị'
                            filterBy="name"
                            register={register} 
                            setValue={setValue} 
                            errors={errors} 
                            showClear={true}/>
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