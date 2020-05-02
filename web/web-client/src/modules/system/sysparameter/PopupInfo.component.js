import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput } from '../../../shared/components';
import { typeOfDynamicInput, appConfig } from '../../../shared/common';

export function PopupInfo(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);

  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    if (props.dataDetail) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("code", props.dataDetail.code);
        setValue("value", props.dataDetail.value);
        setValue("status", props.dataDetail.status);
        setValue("description", props.dataDetail.description);
        setValue("name", props.dataDetail.name);
      }, 100);
    }

  }, [props.dataDetail, setValue]);

  useEffect(() => {
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  return (
    <Modal
      title={`Sửa thông tin tham số: ${dataDetail.name}`}
      visible={isEdit}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="code" value="" labelName="Mã" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="name" value="" labelName="Tên loại hàng" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="value" value="" labelName="Giá trị" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="status" labelName="Trạng thái"
              inputClassName="ant-input custom-input-as-ant-input" dataKey="value" options={appConfig.STATUS} showClear={true}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={24}>
            <FormInput valueName="description" value="" labelName="Mô tả" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.TEXT_AREA} />
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