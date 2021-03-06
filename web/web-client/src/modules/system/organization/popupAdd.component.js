import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { typeOfDynamicInput } from '../../../shared/common';
import { FormInput, FormAutoComplete } from '../../../shared/components';

const toDay = new Date();

export function PopupAdd(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [lstOrg, setLstOrg] = useState([]);
  const onSaveEdit = data => {
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
        //setValue("expireTime", props.dataDetail.expireTime);
      }, 100);
    }
    setIsShowAdd(props.isShowAdd);
  }, [props.dataDetail, props.lstOrg, props.isShowAdd, dataDetail, setValue, lstOrg]);

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
            <span>Mã <span className="label-required">*</span>:</span>
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
            <FormAutoComplete inputClassName="custom-input-as-ant-input"
              labelName="Đơn vị cha"
              valueName="parentCode"
              dataKey="value"
              options={lstOrg}
              optionLabel="name"
              filter={true}
              filterPlaceholder='Chọn đơn vị cha'
              filterBy="name"
              register={register}
              setValue={setValue}
              errors={errors}
              showClear={true} />
          </Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="effectiveTime" value={toDay} labelName="Ngày hiệu lực"
              register={register} validation={{ required: true }} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="expireTime" labelName="Ngày hết hiệu lực"
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
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