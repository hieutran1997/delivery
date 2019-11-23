import React, { useEffect, useState } from 'react';
import { Modal, Row, Button } from 'antd';
import { PickList } from 'primereact/picklist';
import useForm from 'react-hook-form';

export function PopupAddRole(props){
    const { handleSubmit } = useForm();

    const [isShowAddRole, setIsShowAddRole] = useState(false);
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);

    const onSave = () => {
      let data = {
        username: props.dataDetail.username,
        pickList: target
      };
      props.onSave(data);
    };

    useEffect(() => {
      if (props.lstRole) {
        setSource(props.lstRole);
      }
      if(!(props.dataDetail === {} || props.dataDetail === null || typeof props.dataDetail === undefined)){
        console.log('props', props);
        props.getUserRole(props.dataDetail.username);
      }
      setIsShowAddRole(props.isShowAddRole);
    }, [props, setSource, setTarget]);

    const template = (item) => {
      return (
          <div className="p-clearfix">
              <div style={{}}>{item.name}</div>
          </div>
      );
    }
    
    return(
        <Modal
        title={"Gán vai trò "}
        visible={isShowAddRole}
        footer={null}
        width={800}
        onCancel={props.closePopup}
      >
        <form onSubmit={handleSubmit(onSave)}>
          <Row type="flex" justify="space-around">
            <PickList source={source} 
                      target={target}
                      onChange={(e) => {setSource(e.source); setTarget(e.target)}} 
                      responsive={true} 
                      sourceHeader="Danh sách vai trò" 
                      targetHeader="Danh sách vai trò đã chọn"
                      itemTemplate={template}
                      />
          </Row>

          <div className="footer-modal">
            <input type="submit" className="btn-save ant-btn btn-discard ant-btn-primary" value="Lưu lại"/>
            <Button type="danger" className="btn-discard" onClick={props.closePopup}>Hủy</Button>
          </div>
        </form>
      </Modal>
    );
}