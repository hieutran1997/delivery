import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { typeOfDynamicInput } from '../../../shared/common';
import { FormInput, FormAutoComplete } from '../../../shared/components';

const toDay = new Date();

export function PopupInfo(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState(props.dataDetail);
  const [lstOrg, setLstOrg] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState(null);
  const [expriedDate, setExpiredDate] = useState(null);
  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    if (props.lstOrg.length > 0) {
      let lstOrgTemp = props.lstOrg;
      if(props.dataDetail.code){
        let index = props.lstOrg.findIndex(x=>x.value === props.dataDetail.code);
        if(index >= 0){
          lstOrgTemp.splice(index, 1);
        }
      }
      setLstOrg(lstOrgTemp);
    }
    if (props.dataDetail && props.dataDetail.id) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("code", props.dataDetail.code);
        setValue("parentCode", props.dataDetail.parentCode);
        setValue("organizationName", props.dataDetail.organizationName);
        setValue("address", props.dataDetail.address);
        if(props.dataDetail.effectiveTimeNumber){
          setValue("effectiveTime", props.dataDetail.effectiveTimeNumber);
          setEffectiveDate(new Date(props.dataDetail.effectiveTimeNumber));
        }
        if(props.dataDetail.expireTimeNumber){
          setValue("expireTime", props.dataDetail.expireTimeNumber);
          setExpiredDate(new Date(props.dataDetail.expireTimeNumber));
        }
        
      }, 100);
    }
    setIsEdit(props.isEdit);
  }, [props.dataDetail, props.lstOrg, props.isEdit, setValue, dataDetail, lstOrg]);


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
              value={props.dataDetail.parentCode}
              errors={errors}
              showClear={true} />
          </Col>
        </Row>
        <br />
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="effectiveTime" value={effectiveDate} labelName="Ngày hiệu lực"
              register={register} validation={{ required: true }} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="expireTime" value={expriedDate} labelName="Ngày hết hiệu lực"
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