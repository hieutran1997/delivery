import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Input } from 'antd';
import useForm from 'react-hook-form';

const { TextArea } = Input;

export function PopupInfo(props){
    const { register, handleSubmit, errors, setValue } = useForm();
    const [isEdit, setIsEdit] = useState(false);
    const [dataDetail, setDataDetail] = useState(props);
    const [textHtml, setTextHtml] = useState('');

    const onSaveEdit = data => {
        data.textHtml = textHtml;
        props.onSave(data);
    };
    useEffect(()=>{
        if(props.dataDetail){
            setDataDetail(props.dataDetail);
            setTimeout(function(){
              setValue("code", props.dataDetail.code);
              setValue("actionName", props.dataDetail.actionName);
              setTextHtml(props.dataDetail.textHtml)
            }, 100);
        }
        setIsEdit(props.isEdit);
    }, [props, dataDetail, setValue, setTextHtml]);

    return(
        <Modal
        title={"Sửa thông tin hoạt động: " + dataDetail.actionName}
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
              <span className="error-message">{errors.code && 'Code is required'}</span>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <span>Tên:</span>
              <input name="actionName" className="ant-input" ref={register} />
            </Col>
          </Row>
          <br/>
          <Row type="flex" justify="space-around">
            <Col span={24}>
              <span>Html:</span>
              <TextArea name="textHtml" ref={register} value={textHtml} rows={4} onChange={(e) => setTextHtml(e.target.value)} />
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