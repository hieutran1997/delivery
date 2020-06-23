import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput, FormAutoComplete } from '../../../shared/components';
import FormFile from '../../../shared/components/FormFile.component';
import { typeOfDynamicInput, appConfig } from '../../../shared/common';
import FormAvatar from '../../../shared/components/FormAvatar.component';

let productId = 0;
const toDay = new Date();
export function PopupInfo(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [fileAttachment, setFileAttachment] = useState({});
  const [status, setStatus] = useState();
  const [typeOfManufacture, setTypeOfManufacture] = useState();
  const [merchandiseRegisterId, setMerchandiseRegisterId] = useState();

  const onSaveEdit = data => {
    data.productId = productId;
    props.onSave(data);
  };

  useEffect(() => {
    if (props.dataDetail) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue('productCode', props.dataDetail.productCode);
        setValue('productName', props.dataDetail.productName);
        setValue('dateOfManufacture', props.dataDetail.dateOfManufacture);
        setValue('quantity', props.dataDetail.quantity);
        setValue('merchandiseRegisterId', props.dataDetail.merchandiseRegisterId);
        setValue('typeOfManufacture', props.dataDetail.typeOfManufacture);
        setValue('status', props.dataDetail.status);
        setValue('parentId', props.dataDetail.parentId);
        setValue('productId', props.dataDetail.productId);
        setFileAttachment(props.dataDetail.fileAttachment);
        setTypeOfManufacture(props.dataDetail.typeOfManufacture);
        setStatus(props.dataDetail.status);
        productId = props.dataDetail.productId;
        setMerchandiseRegisterId(props.dataDetail.merchandiseRegisterId);
      }, 100);
    }

  }, [props.dataDetail, setValue]);

  useEffect(() => {
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  return (
    <Modal
      title={`Sửa thông tin hàng hóa sản xuất: ${dataDetail.productName}`}
      visible={isEdit}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormAutoComplete inputClassName="custom-input-as-ant-input"
              labelName="Sản phẩm đã đăng ký"
              valueName="merchandiseRegisterId"
              dataKey="id"
              value={merchandiseRegisterId}
              options={props.lstMerchandise}
              optionLabel="name"
              filter={true}
              filterPlaceholder='Chọn hàng hóa'
              filterBy="value,name"
              register={register}
              setValue={setValue}
              errors={errors}
              disabled={true}
              validation={{ required: true }}
              showClear={true} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
          <FormInput valueName="status" labelName="Trạng thái"
              inputClassName="ant-input custom-input-as-ant-input" dataKey="value" valueFilter={status} options={appConfig.PRODUCT_STATUS}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="productCode" value="" labelName="Mã" inputClassName="ant-input" disabled={true}
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="productName" value="" labelName="Tên HH" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="dateOfManufacture" value={toDay} labelName="Ngày sản xuất"
              register={register} validation={{ required: true }} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="typeOfManufacture" labelName="Trong loại hình"
              inputClassName="ant-input custom-input-as-ant-input" valueFilter={typeOfManufacture} dataKey="value" options={appConfig.TYPE_OF_MANUFACTURE} showClear={true}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormAvatar valueName="avatar" fileAttachment={fileAttachment} register={register} setValue={setValue}></FormAvatar>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormFile valueName="files" fileAttachment={fileAttachment} register={register} setValue={setValue}></FormFile>
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