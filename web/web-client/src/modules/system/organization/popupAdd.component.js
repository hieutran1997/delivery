import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, DatePicker } from 'antd';
import useForm from 'react-hook-form';
import moment from 'moment';
import { DateFormat } from '../../../shared/common';
import { Dropdown } from 'primereact/dropdown';

const toDay = new Date();

export function PopupAdd(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [effectiveTime, setEffectiveTime] = useState(toDay);
  const [expiredTime, setExpiredTime] = useState(toDay);
  const [lstOrg, setLstOrg] = useState([]);
  const [parentCode, setParentCode] = useState('');
  const onSaveEdit = data => {
    data.expireTime = expiredTime;
    data.effectiveTime = effectiveTime;
    data.parentCode = parentCode.value;
    props.onSave(data);
  };

  useEffect(() => {
    if (lstOrg.length === 0 && props.lstOrg.length > 0) {
      setLstOrg(props.lstOrg);
    }
    if (props.dataDetail) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("code", props.dataDetail.code);
        setValue("parentCode", props.dataDetail.parentCode);
        setValue("organizationName", props.dataDetail.organizationName);
        setValue("address", props.dataDetail.address);
        setValue("effectiveTime", props.dataDetail.effectiveTime);
        setValue("expireTime", props.dataDetail.expireTime);
      }, 100);
    }
    setIsShowAdd(props.isShowAdd);
  }, [props, dataDetail, setValue, lstOrg]);

  const changeEffectiveTime = (value, dateString) => {
    setEffectiveTime(value.toDate());
  }

  const changeExpiredTime = (value, dateString) => {
    setExpiredTime(value.toDate());
  }

  const changeOrg = (e) => {
    setParentCode(e.value);
  }

  return (
    <Modal
      title={"Thêm mới đơn vị: "}
      visible={isShowAdd}
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
            <DatePicker onChange={changeEffectiveTime} defaultValue={moment(toDay, DateFormat)} format={DateFormat} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <span>Ngày hết hiệu lực:</span><br/>
            <DatePicker onChange={changeExpiredTime} defaultValue={moment(toDay, DateFormat)} format={DateFormat} />
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