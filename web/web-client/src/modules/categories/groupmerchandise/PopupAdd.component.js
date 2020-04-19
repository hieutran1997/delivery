import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';
import { FormInput, FormAutoComplete } from '../../../shared/components';

export function PopupAdd(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);

  const onSaveEdit = data => {
    props.onSave(data);
    
  };

  useEffect(()=>{
    setIsShowAdd(props.isShowAdd);
    setValue('code', '');
    setValue('name', '');
    setValue('typeCode', '');
  }, [props.isShowAdd, setValue]);

  return (
    <Modal
      title={`Thêm mới nhóm hàng`}
      visible={isShowAdd}
      footer={null}
      width={800}
      onCancel={props.closePopup}
    >
      <form onSubmit={handleSubmit(onSaveEdit)}>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormInput valueName="code" value="" validation={{ required: true }} labelName="Mã" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
          <FormInput valueName="name" value="" validation={{ required: true }} labelName="Tên nhóm hàng" inputClassName="ant-input"
              register={register} setValue={setValue} errors={errors} />
          </Col>
        </Row>
        <Row type="flex" justify="space-around">
          <Col span={11}>
            <FormAutoComplete inputClassName="custom-input-as-ant-input"
              labelName="Loại hàng"
              valueName="typeCode"
              dataKey="value"
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