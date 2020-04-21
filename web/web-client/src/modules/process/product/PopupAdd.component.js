import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput, FormAutoComplete } from '../../../shared/components';
import { getNewInstance } from '../../../shared/actions/process/MerchandiseRegisterResource';
import { connect } from 'react-redux';
import { ACTION_MODULE, typeOfDynamicInput, appConfig } from '../../../shared/common';
import * as types from '../../../shared/constants/ActionTypeCommon';
import FormFile from '../../../shared/components/FormFile.component';


export const mapDispatchToProps = dispatch => {
  return {
    getNewInstance: id => dispatch(getNewInstance(id))
  }
}

export const maptStateToProps = state => {
  return {
    merchandiseData: state.merchandiseRegisReducer
  }
}

const toDay = new Date();
function PopupAdd(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [fileAttachment, setFileAttachment] = useState({});

  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    setIsShowAdd(props.isShowAdd);
    setValue('productCode', '');
    setValue('productName', '');
    setValue('dateOfManufacture', '');
    setValue('quantity', '');
    setValue('merchandiseRegisterId', '');
    setValue('typeOfManufacture', '');
    setValue('status', '');
    setValue('parentId', '');
    setFileAttachment([]);
  }, [props.isShowAdd, setValue]);

  useEffect(() => {
    if (props.merchandiseData && props.merchandiseData.type === `${ACTION_MODULE.MERCHANDISE_REGISTER}_${types.GET_NEW_INSTANCE_SUCCESS}`) {
      setValue('productCode', props.merchandiseData.productCode);
      setValue('productName', props.merchandiseData.productName);
    }
  }, [props.merchandiseData, setValue]);

  const changeMerchandise = (data) => {
    if (data) {
      props.getNewInstance(data.value.id);
      setValue('merchandiseRegisterId', data.value.id);
    }
  }

  return (
    <Modal
      title={`Thêm mới mặt hàng`}
      visible={isShowAdd}
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
              options={props.lstMerchandise}
              optionLabel="name"
              filter={true}
              filterPlaceholder='Chọn hàng hóa'
              filterBy="value,name"
              register={register}
              setValue={setValue}
              errors={errors}
              onChange={changeMerchandise}
              validation={{ required: true }}
              showClear={true} />
          </Col>
          <Col span={13}></Col>
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
              inputClassName="ant-input custom-input-as-ant-input" dataKey="value" options={appConfig.TYPE_OF_MANUFACTURE} showClear={true}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
          <FormInput valueName="status" labelName="Trạng thái"
              inputClassName="ant-input custom-input-as-ant-input" dataKey="value" valueFilter={1} options={appConfig.PRODUCT_STATUS} disabled={true}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
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

export default connect(maptStateToProps, mapDispatchToProps)(PopupAdd);