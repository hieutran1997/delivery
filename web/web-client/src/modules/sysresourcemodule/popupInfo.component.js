import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import useForm from 'react-hook-form';

export function PopupInfo(props){
    const { register, handleSubmit, errors, setValue } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [dataDetail, setDataDetail] = useState(props);
    const onSaveEdit = data => {
        props.onSave(data);
    };

    useEffect(()=>{
        if(props.dataDetail){
            setDataDetail(props.dataDetail);
            setTimeout(function(){
              setValue("code", props.dataDetail.code);
              setValue("resourceName", props.dataDetail.resourceName);
              setValue("icon", props.dataDetail.icon);
              setValue("path", props.dataDetail.path);
              setValue("parentCode", props.dataDetail.parentCode);
              setValue("component", props.dataDetail.component);
              setValue("typeOfResource", props.dataDetail.typeOfResource);
            }, 100);
        }
        setIsEdit(props.isEdit);
    }, [props, dataDetail, setValue]);

    return(
        <Modal
        title={"Sửa thông tin tài nguyên: " + dataDetail.resourceName}
        visible={isEdit}
        footer={null}
        width={800}
        onCancel={props.closePopup}
      >
        <form onSubmit={handleSubmit(onSaveEdit)}>
          <Row type="flex" justify="space-around">
            <Col span={11}>
              <span>Mã:</span>
              <input name="code" className="ant-input" readOnly ref={register({ required: true, maxlength: 20 })} />
              <span className="error-message">{errors.username && 'Code is required'}</span>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <span>Tên:</span>
              <input name="resourceName" className="ant-input" ref={register} />
            </Col>
          </Row>
          <br/>
          <Row type="flex" justify="space-around">
            <Col span={11}>
              <span>Icon:</span>
              <input name="icon" className="ant-input" ref={register} />
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <span>Đường dẫn:</span>
              <input name="pathUrl" className="ant-input" ref={register} />
            </Col>
          </Row>
          <br/>
          <Row type="flex" justify="space-around">
            <Col span={11}>
              <span>Mã cha:</span>
              <input name="parentCode" className="ant-input" ref={register} />
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <span>Thành phần:</span>
              <input name="component" className="ant-input" ref={register} />
            </Col>
          </Row>
          <br/>
          <Row type="flex" justify="space-around">
            <Col span={11}>
              <span>Kiểu tài nguyên:</span>
              <input name="typeOfResource" className="ant-input" ref={register} />
            </Col>
          </Row>
          <div className="footer-modal">
            <input type="submit" className="btn-save ant-btn btn-discard ant-btn-primary" value="Lưu lại"/>
            <Button type="danger" className="btn-discard" onClick={props.closePopup}>Hủy</Button>
          </div>
        </form>
      </Modal>
    );
}