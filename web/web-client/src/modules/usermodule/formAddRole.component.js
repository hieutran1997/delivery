import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button } from 'antd';
import {PickList} from 'primereact/picklist';
import useForm from 'react-hook-form';

export function PopupAdd(props){
    const { register, handleSubmit, errors, setValue } = useForm();
    
    return(
        <Modal
        title={"Gán vai trò "}
        visible={isShowAddRole}
        footer={null}
        width={800}
        onCancel={props.closePopup}
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