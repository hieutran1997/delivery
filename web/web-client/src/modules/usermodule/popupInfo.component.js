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
                setValue("username", props.dataDetail.username);
                setValue("age", props.dataDetail.age);
                setValue("firstname", props.dataDetail.firstname);
                setValue("lastname", props.dataDetail.lastname);
            }, 100);
        }
        setIsEdit(props.isEdit);
    }, [props, dataDetail, setValue]);

    return(
        <Modal
        title={"Sửa thông tin tài khoản: " + dataDetail.username}
        visible={isEdit}
        footer={null}
        width={800}
      >
        <form onSubmit={handleSubmit(onSaveEdit)}>
          <Row type="flex" justify="space-around">
            <Col span={11}>
              <span>Tên đăng nhập:</span>
              <input name="username" className="ant-input" ref={register({ required: true, maxlength: 20 })} />
              <span className="error-message">{errors.username && 'Username is required'}</span>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <span>Tuổi:</span>
              <input name="age" className="ant-input" ref={register} />
            </Col>
          </Row>
          <br/>
          <Row type="flex" justify="space-around">
            <Col span={11}>
              <span>Họ:</span>
              <input name="firstname" className="ant-input" ref={register({ required: true, maxlength: 20 })} />
              <span className="error-message">{errors.firstname && 'First name is required'}</span>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <span>Tên:</span>
              <input name="lastname" className="ant-input" ref={register({ required: true })} />
              <span className="error-message">{errors.lastname && 'Last name is required'}</span>
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