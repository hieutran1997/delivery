import React, { useEffect, useState } from 'react';
import { Modal, Row, Button } from 'antd';
import { PickList } from 'primereact/picklist';
import useForm from 'react-hook-form';

export function PopupAddPermission(props) {
  const { handleSubmit } = useForm();

  const [isShowAddPermission, setIsShowAddPermission] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [source, setSource] = useState([]);
  const [target, setTarget] = useState([]);
  const [onInitTarget, setOnInitTarget] = useState(true);
  const [onInitSource, setOnInitSource] = useState(true);

  const onSave = () => {
    let data = {
      roleCode: props.dataDetail.code,
      target: target
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
    if (props.isShowAddPermission) {
      if (props.dataDetail) {
        setDataDetail(props.dataDetail);
      }
      if (props.lstTarget && onInitTarget) {
        setTarget(props.lstTarget);
      }
      if(props.lstResource && onInitSource){
        setSource(props.lstResource);
      }
    }
    setIsShowAddPermission(props.isShowAddPermission);
  }, [props, source, target, setSource, setTarget, onInitTarget, onInitSource]);

  const template = (item) => {
    return (
      <div className="p-clearfix">
        <div style={{}}>
          {/* {item.resourceName} */}
        </div>
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
      title={`Gán quyền: ${dataDetail.username}`}
      visible={isShowAddPermission}
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
            sourceHeader="Danh sách tài nguyên"
            targetHeader="Danh sách tài nguyên đã chọn"
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