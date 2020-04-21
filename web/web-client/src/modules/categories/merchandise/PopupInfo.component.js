import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput, FormAutoComplete } from '../../../shared/components';
import { typeOfDynamicInput } from '../../../shared/common';

const toDay = new Date();
export function PopupInfo(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const lstStatus = [
    {
      value: 0,
      name: 'Tạo mới'
    },
    {
      value: 1,
      name: 'Đã duyệt'
    },
    {
      value: 2,
      name: 'Đang sử dụng'
    },
    {
      value: 3,
      name: 'Không sử dụng'
    },
  ];

  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    if (props.dataDetail) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("catGroupMerchandiseId", props.dataDetail.catGroupMerchandiseId);
        setValue("catTypeMerchandiseId", props.dataDetail.catTypeMerchandiseId);
        setValue("catUnitId", props.dataDetail.catUnitId);
        setValue("description", props.dataDetail.description);
        setValue("effectiveDate", props.dataDetail.effectiveDate);
        setValue("expiredDate", props.dataDetail.expiredDate);
        setValue("merchandiseCode", props.dataDetail.merchandiseCode);
        setValue("merchandiseId", props.dataDetail.merchandiseId);
        setValue("merchandiseName", props.dataDetail.merchandiseName);
        setValue("status", props.dataDetail.status);
      }, 100);
    }

  }, [props.dataDetail, setValue]);

  useEffect(() => {
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  const changeTypeMer = (ev) => {
    if(ev){
      props.getNewCode(ev.value.value);
    }
  }

  return (
    <Modal
    title={`Sửa thông tin hàng hóa: ${dataDetail.merchandiseName}`}
    visible={isEdit}
    footer={null}
    width={800}
    onCancel={props.closePopup}
  >
    <form onSubmit={handleSubmit(onSaveEdit)}>
      <Row type="flex" justify="space-around">
        <Col span={11}>
          <FormInput valueName="merchandiseCode" value="" labelName="Mã" inputClassName="ant-input"
            register={register} setValue={setValue} validation={{ required: true }} disabled={true} errors={errors} />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <FormInput valueName="merchandiseName" value="" labelName="Tên hàng" inputClassName="ant-input"
            register={register} setValue={setValue} validation={{ required: true }} errors={errors} />
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={11}>
          <FormAutoComplete inputClassName="custom-input-as-ant-input"
            labelName="Loại hàng"
            valueName="catTypeMerchandiseId"
            dataKey="id"
            value={dataDetail.catTypeMerchandiseId}
            options={props.lstType}
            optionLabel="name"
            filter={true}
            filterPlaceholder='Chọn loại hàng hóa'
            filterBy="name"
            register={register}
            setValue={setValue}
            errors={errors}
            onChange={changeTypeMer}
            validation={{ required: true }}
            showClear={true} />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <FormAutoComplete inputClassName="custom-input-as-ant-input"
            labelName="Nhóm hàng"
            valueName="catGroupMerchandiseId"
            dataKey="id"
            value={dataDetail.catGroupMerchandiseId}
            options={props.lstGroup}
            optionLabel="name"
            filter={true}
            filterPlaceholder='Chọn nhom hàng hóa'
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
            value={dataDetail.catTypeMerchandiseId}
            dataKey="id"
            options={props.lstUnit}
            optionLabel="name"
            filter={true}
            filterPlaceholder='Chọn đơn vị tính'
            filterBy="name"
            register={register}
            setValue={setValue}
            errors={errors}
            showClear={true} />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <FormInput valueName="status" valueFilter={dataDetail.status} labelName="Trạng thái" disabled={dataDetail.status ===0} 
            inputClassName="ant-input custom-input-as-ant-input" options={lstStatus} showClear={true}
            register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={11}>
          <FormInput valueName="effectiveDate" value={toDay} labelName="Ngày hiệu lực"
            register={register} validation={{ required: true }} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
        </Col>
        <Col span={2}></Col>
        <Col span={11}>
          <FormInput valueName="expiredDate" labelName="Ngày hết hiệu lực"
            register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
        </Col>
      </Row>
      <Row type="flex" justify="space-around">
        <Col span={24}>
          <FormInput valueName="description" value="" labelName="Mô tả" inputClassName="ant-input"
            register={register} setValue={setValue} validation={{ maxlength: 1000 }} type={typeOfDynamicInput.TEXT_AREA} errors={errors} />
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