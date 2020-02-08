import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Icon } from 'antd';
import { Dropdown } from 'primereact/dropdown';
import useForm from 'react-hook-form';
import { hasPermission, control, resourceCode } from '../../../shared/common';
import { FormInputComponent } from '../../../shared/components';

export function FormSearch(props) {
    const { register, handleSubmit, setValue } = useForm();
    const [dataDetail, setDataDetail] = useState({});
    const [lstOrg, setLstOrg] = useState([]);
    const [orgCode, setOrgCode] = useState({});

    const onSearch = data => {
        if (orgCode) {
            data.organizationCode = orgCode.value;
        }
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
            setTimeout(function () {
                setValue("firstname", props.dataDetail.firstname);
                setValue("lastname", props.dataDetail.lastname);
                setValue("organizationCode", props.dataDetail.organizationCode);
            }, 100);
        }
    }, [props, dataDetail, lstOrg, setValue, setLstOrg]);

    const changeOrg = (e) => {
        setOrgCode(e.value);
    }

    return (
        <div className="from-search">
            <form onSubmit={handleSubmit(onSearch)}>
                <Row type="flex" justify="space-around">
                    <Col span={11}>
                        {/* <span>Họ:</span>
                        <input name="firstname" className="ant-input" ref={register} /> */}
                        <FormInputComponent valueName="firstname" labelName="Họ:" inputClassName="ant-input" ref={register({ required: true, maxlength: 20 })} />
                    </Col>
                    <Col span={2}></Col>
                    <Col span={11}>
                        <span>Tên:</span>
                        <input name="lastname" className="ant-input" ref={register} />
                    </Col>
                </Row>
                <br />
                <Row type="flex" >
                    <Col span={11}>
                        <span>Đơn vị:</span>
                        <Dropdown 
                            className="custom-input-as-ant-input"
                            value={orgCode}
                            dataKey="value"
                            options={lstOrg}
                            optionLabel="name"
                            onChange={changeOrg}
                            filter={true}
                            filterPlaceholder='Chọn đơn vị'
                            filterBy="name"
                            showClear={true} 
                            width="100%"
                            />
                    </Col>
                </Row>

                <div className="footer-modal">
                    <button type="submit" className="ant-btn ant-btn-primary">
                        <Icon type="search" />
                        &nbsp;
                        Tìm kiếm
                    </button>
                    &nbsp;&nbsp;
                    {hasPermission(resourceCode.user, control.hasAdd) ===1 ? <Button type="primary" icon="plus" onClick={onCreate}>
                        Thêm mới
                    </Button> : ""}
                    
                </div>
            </form>
        </div>
    );
}