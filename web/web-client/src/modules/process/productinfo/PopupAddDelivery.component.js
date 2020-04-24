import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput, FormAutoComplete } from '../../../shared/components';
import FormFile from '../../../shared/components/FormFile.component';
import { typeOfDynamicInput, appConfig } from '../../../shared/common';

const toDay = new Date();
export function PopupAddDelivery(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [fileAttachment, setFileAttachment] = useState({});

  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    setIsShowAdd(props.isShowAdd);
    setFileAttachment([]);
  }, [props.isShowAdd, setValue]);

  return (
    <Modal
      title={`Thêm mới quá trình vận chuyển`}
      visible={isShowAdd}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="deliveryBy" value="" labelName="Người chuyển" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="documentNumber" value="" labelName="Số văn bản" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="startDate" value={toDay} labelName="Ngày bắt đầu"
              register={register} validation={{ required: true }} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="address" value="" labelName="Địa chỉ" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="factory" value="" labelName="Khu sản xuất" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormFile valueName="files" fileAttachment={fileAttachment} register={register} setValue={setValue}></FormFile>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormAutoComplete inputClassName="custom-input-as-ant-input"
              labelName="Từ đơn vị: "
              valueName="organizationSourceId"
              dataKey="id"
              options={props.lstOrg}
              optionLabel="name"
              filter={true}
              filterPlaceholder='Chọn đơn đi'
              filterBy="name"
              register={register}
              setValue={setValue}
              errors={errors}
              showClear={true} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormAutoComplete inputClassName="custom-input-as-ant-input"
              labelName="Đến"
              valueName="organizationDescId"
              dataKey="id"
              options={props.lstOrg}
              optionLabel="name"
              filter={true}
              filterPlaceholder='Chọn đơn đến'
              filterBy="name"
              register={register}
              setValue={setValue}
              errors={errors}
              showClear={true} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="verifiedBy" value="" labelName="Người xác nhận" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="status" labelName="Trạng thái"
              inputClassName="ant-input custom-input-as-ant-input" dataKey="value" options={appConfig.STATUS_DELIVERY} showClear={true}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={24}>
            <FormInput valueName="evaluation" labelName="Đánh giá" inputClassName="ant-input custom-input-as-ant-input"
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.TEXT_AREA} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={24}>
            <FormInput valueName="description" labelName="Mô tả" inputClassName="ant-input custom-input-as-ant-input"
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