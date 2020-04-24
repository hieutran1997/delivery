import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput } from '../../../shared/components';
import FormFile from '../../../shared/components/FormFile.component';
import { typeOfDynamicInput } from '../../../shared/common';

const toDay = new Date();
export function PopupAddManufacture(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [fileAttachment, setFileAttachment] = useState({});

  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    setIsShowAdd(props.isShowAdd);
    setValue('startDate', toDay.toUTCString());
    setValue('address', '');
    setValue('description', '');
    setValue('files', '');
    setFileAttachment([]);
  }, [props.isShowAdd, setValue]);

  return (
    <Modal
      title={`Thêm mới quá trình chế biến, sản xuất`}
      visible={isShowAdd}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="startDate" value={toDay} labelName="Ngày bắt đầu"
              register={register} validation={{ required: true }} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="peopleProcessing" value="" labelName="Người quản lý" inputClassName="ant-input"
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