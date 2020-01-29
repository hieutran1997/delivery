import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, DatePicker } from 'antd';
import useForm from 'react-hook-form';
import moment from 'moment';
import { DateFormat } from '../../../shared/common';
import { Dropdown } from 'primereact/dropdown';

const toDay = new Date();

export function PopupInfo(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [effectiveTime, setEffectiveTime] = useState(moment(toDay, DateFormat));
  const [expiredTime, setExpiredTime] = useState(moment(toDay, DateFormat));
  const [lstOrg, setLstOrg] = useState([]);
  const [parentCode, setParentCode] = useState('');
  const onSaveEdit = data => {
    data.expireTime = expiredTime.toDate();
    data.effectiveTime = effectiveTime.toDate();
    data.parentCode = parentCode.value;
    props.onSave(data);
  };

  useEffect(() => {
    if (lstOrg.length === 0 && props.lstOrg.length > 0) {
      setLstOrg(props.lstOrg);
    }
    if (props.dataDetail && props.dataDetail.id) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("code", props.dataDetail.code);
        setValue("parentCode", props.dataDetail.parentCode);
        setValue("organizationName", props.dataDetail.organizationName);
        setValue("address", props.dataDetail.address);
        setValue("effectiveTime", props.dataDetail.effectiveTime);
        setValue("expireTime", props.dataDetail.expireTime);
        setParentCode({'value': props.dataDetail.parentCode});
      }, 100);
      let effTime = moment(new Date(props.dataDetail.effectiveTimeNumber), DateFormat);
      let expTime = moment(new Date(props.dataDetail.expireTimeNumber), DateFormat);
      setEffectiveTime(effTime);
      setExpiredTime(expTime);
    }
    setIsEdit(props.isEdit);
  }, [props, dataDetail, setValue, lstOrg, setEffectiveTime, setExpiredTime, setParentCode]);

  const changeEffectiveTime = (value, dateString) => {
    setEffectiveTime(value);
  }

  const changeExpiredTime = (value, dateString) => {
    setExpiredTime(value);
  }

  const changeOrg = (e) => {
    setParentCode(e.value);
  }

  return (
    <Modal
      title={"Sửa thông tin đơn vị: " + dataDetail.organizationName}
      visible={isEdit}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <span>Mã:</span>
            <input name="code" className="ant-input" ref={register({ required: true, maxlength: 10 })} />
            <span className="error-message">{errors.code && 'Bắt buộc nhập'}</span>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <span>Tên:</span>
            <input name="organizationName" className="ant-input" ref={register} />
          </Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <span>Địa chỉ:</span>
            <input name="address" className="ant-input" ref={register} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <span>Đơn vị cha:</span>
            <Dropdown 
              className="custom-input-as-ant-input"
              value={parentCode}
              dataKey="value"
              options={lstOrg}
              optionLabel="name"
              onChange={changeOrg}
              filter={true}
              filterPlaceholder='Chọn đơn vị cha'
              filterBy="name"
              showClear={true} 
              width="100%"
              />
          </Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <span>Ngày hiệu lực:</span><br/>
            <DatePicker value={effectiveTime} onChange={changeEffectiveTime} defaultValue={effectiveTime} format={DateFormat} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <span>Ngày hết hiệu lực:</span><br/>
            <DatePicker value={expiredTime} onChange={changeExpiredTime} defaultValue={expiredTime} format={DateFormat} />
          </Col>
        </Row>
        <div className="footer-modal">
          <input type="submit" className="btn-save ant-btn btn-discard ant-btn-primary" value="Lưu lại" />
          <Button type="danger" className="btn-discard" onClick={props.closePopup}>Hủy</Button>
        </div>
      </form>
    </Modal>
  );
}