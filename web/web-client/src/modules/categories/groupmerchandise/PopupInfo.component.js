import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput, FormAutoComplete } from '../../../shared/components';

export function PopupInfo(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [typeCode, setTypeCode] = useState({});

  const onSaveEdit = data => {
    props.onSave(data);
  };

  useEffect(() => {
    if (props.dataDetail) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("code", props.dataDetail.code);
        setValue("name", props.dataDetail.name);
        setValue("typeCode", props.dataDetail.typeCode);
        setTypeCode(props.dataDetail.typeCode);
      }, 100);
    }

  }, [props.dataDetail, setValue, setTypeCode]);

  useEffect(() => {
    setIsEdit(props.isEdit);
  }, [props.isEdit]);

  return (
    <Modal
      title={`Sửa thông tin nhóm: ${dataDetail.name}`}
      visible={isEdit}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="code" value="" labelName="Mã" validation={{ required: true }} inputClassName="ant-input" disabled={true}
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormInput valueName="name" value="" labelName="Tên nhóm hàng" validation={{ required: true }} inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormAutoComplete inputClassName="custom-input-as-ant-input"
              labelName="Loại hàng"
              valueName="typeCode"
              dataKey="value"
              value={typeCode}
              options={props.lstType}
              optionLabel="name"
              filter={true}
              filterPlaceholder='Chọn loại hàng hóa'
              filterBy="name"
              register={register}
              setValue={setValue}
              errors={errors}
              validation={{ required: true }}
              showClear={true} />
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