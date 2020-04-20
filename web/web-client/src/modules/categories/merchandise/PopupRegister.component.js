import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput } from '../../../shared/components';
import { typeOfDynamicInput } from '../../../shared/common';
import FormFile from '../../../shared/components/FormFile.component';

const toDay = new Date();
export function PopupRegis(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowRegis, setIsShowRegis] = useState(false);
  const [merchandiseId, setMerchandiseId] = useState(0);
  const [merchandiseRegisterId, setMerchandiseRegisterId] = useState(0);
  const [fileAttachment, setFileAttachment] = useState({});
  const lstStatus = [
    {
      value: 1,
      name: 'Hoạt động'
    },
    {
      value: 2,
      name: 'Không hoạt động'
    }
  ];

  const onSaveEdit = data => {
    data.merchandiseId = merchandiseId;
    data.merchandiseRegisterId = merchandiseRegisterId;
    props.onSave(data);
  };

  useEffect(() => {
    if (props.dataDetail) {
      setValue('merchandiseId', props.dataDetail.merchandiseId);
      setValue('startDate', props.dataDetail.startDate);
      setValue('endDate', props.dataDetail.endDate);
      setValue('status', props.dataDetail.status);
      setValue('description', props.dataDetail.description);
      setValue('files', []);
      setMerchandiseId(props.dataDetail.merchandiseId);
      setMerchandiseRegisterId(props.dataDetail.merchandiseRegisterId);
      setFileAttachment(props.dataDetail.fileAttachment);
    }
  }, [props.dataDetail, setValue]);

  useEffect(() => {
    setIsShowRegis(props.isShowRegis);
  }, [props.isShowRegis]);

  return (
    <Modal
      title={`Đăng ký cung cấp mặt hàng`}
      visible={isShowRegis}
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
            <FormInput valueName="endDate" labelName="Ngày kết thúc"
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.DATE_TIME} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="status" value={1} placeholder="Chọn trạng thái" labelName="Trạng thái" inputClassName="ant-input custom-input-as-ant-input" options={lstStatus} showClear={true}
              register={register} setValue={setValue} errors={errors} type={typeOfDynamicInput.SELECT_FILTER} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="description" labelName="Mô tả" inputClassName="ant-input"
              register={register} setValue={setValue} validation={{ maxlength: 1000 }} type={typeOfDynamicInput.TEXT_AREA} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormFile valueName="files" fileAttachment={fileAttachment} register={register} setValue={setValue}></FormFile>
          </Col>
          <Col span={13}></Col>
        </Row>
        <div className="footer-modal">
          <input type="submit" className="btn-save ant-btn btn-discard ant-btn-primary" value="Lưu lại" />
          <Button type="danger" className="btn-discard" onClick={props.closePopup}>Hủy</Button>
        </div>
      </form>
    </Modal>
  );
}