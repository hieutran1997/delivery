import React, { useEffect, useState } from 'react';
import { Modal, Row, Button } from 'antd';
import { PickList } from 'primereact/picklist';
import useForm from 'react-hook-form';

export function PopupAddRole(props) {
  const { handleSubmit } = useForm();

  const [isShowAddRole, setIsShowAddRole] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [onInitTarget, setOnInitTarget] = useState(true);
  const [onInitSource, setOnInitSource] = useState(true);

  const onSave = () => {
    let data = {
      username: props.dataDetail.username,
      pickList: target
    };
    setSource([]);
    setTarget([]);
    props.onSave(data);
  };

  const onClose = () => {
    setSource([]);
    setTarget([]);
    setOnInitTarget(true);
    setOnInitSource(true);
    props.closePopup();
  }

  useEffect(() => {
    if (props.isShowAddRole) {
      if (props.dataDetail) {
        setDataDetail(props.dataDetail);
      }
      if (props.lstRoleTarget && onInitTarget) {
        setTarget(props.lstRoleTarget);
        
      }
      if(props.lstRoleResource && onInitSource){
        setSource(props.lstRoleResource);
      }
    }
    setIsShowAddRole(props.isShowAddRole);
  }, [props, source, target, setSource, setTarget, onInitTarget, onInitSource]);

  const template = (item) => {
    return (
      <div className="p-clearfix">
        <div style={{}}>{item.name}</div>
      </div>
    );
  }

  const onChange = (e) =>{
    setOnInitTarget(false);
    setOnInitSource(false);
    setSource(e.source); 
    setTarget(e.target);
  }

  return (
    <Modal
      title={`Gán vai trò: ${dataDetail.username}`}
      visible={isShowAddRole}
      footer={null}
      width={800}
      onCancel={onClose}
    >
      <form onSubmit={handleSubmit(onSave)}>
        <Row type="flex" justify="space-around">
          <PickList source={source}
            target={target}
            onChange={(e) => {onChange(e)}}
            responsive={true}
            sourceHeader="Danh sách vai trò"
            targetHeader="Danh sách vai trò đã chọn"
            itemTemplate={template}
          />
        </Row>

        <div className="footer-modal">
          <input type="submit" className="ant-btn ant-btn-primary" value="Lưu lại" />
          <Button type="danger" className="btn-discard" onClick={onClose}>Hủy</Button>
        </div>
      </form>
    </Modal>
  );
}