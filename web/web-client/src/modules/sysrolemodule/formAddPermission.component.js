import React, { useEffect, useState } from 'react';
import { Modal, Button, Checkbox, Collapse } from 'antd';
import useForm from 'react-hook-form';
import { Row, Col } from 'antd';
import { ScrollPanel } from 'primereact/scrollpanel';

const { Panel } = Collapse;

export function PopupAddPermission(props) {
  const { handleSubmit } = useForm();

  const [isShowAddPermission, setIsShowAddPermission] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [target, setTarget] = useState([]);
  const [onInitTarget, setOnInitTarget] = useState(true);
  const [onInitDetail, setOnInitDetail] = useState(true);

  const onSave = () => {
    let dataSave = [];
    target.forEach(function(item){
      if(item.hasView === 1 || item.hasAdd === 1 || item.hasApprove === 1 || item.hasDelete === 1 || item.hasEdit === 1 || checkValueSelect(item.ortherControls) ){
        dataSave.push({
          hasView: item.hasView? item.hasView: 0, 
          hasAdd: item.hasAdd? item.hasAdd: 0,
          hasApprove: item.hasApprove? item.hasApprove: 0,
          hasDelete: item.hasDelete? item.hasDelete: 0,
          hasEdit: item.hasEdit? item.hasEdit: 0,
          ortherControls: getValue(item.ortherControls),
          resourceCode: item.resourceCode,
          roleCode: dataDetail.code
        });
      }
    });
    props.onSave({
      roleCode: dataDetail.code,
      data: dataSave
    });
  };

  const checkValueSelect = (item) =>{
    Object.values(item).forEach(function(tmp){
      if(tmp.value === 1){
        return true;
      }
    })
    return false;
  }

  const getValue = (item) =>{
    let result = {};
    for (const [key, value] of Object.entries(item)){
      result[key] = value.value;
    }
    return JSON.stringify(result);
  }

  const onClose = () => {
    setTarget([]);
    setOnInitTarget(true);
    setOnInitDetail(true);
    props.closePopup();
  }

  useEffect(() => {
    if (props.isShowAddPermission) {
      if (props.dataDetail && onInitDetail) {
        setDataDetail(props.dataDetail);
        setOnInitDetail(false);
      }
      if (props.lstTarget && onInitTarget) {
        setTarget(props.lstTarget);
      }
    }
    setIsShowAddPermission(props.isShowAddPermission);
  }, [props, target, setTarget, onInitTarget, onInitDetail, setOnInitDetail]);

  const changeValueView = index => e => {
    let newArr = [...target];
    newArr[index].hasView = e.target.checked === true? 1: 0;
    setTarget(newArr);
  }

  const changeValueAdd = index => e => {
    let newArr = [...target];
    newArr[index].hasAdd = e.target.checked === true? 1: 0;
    newArr[index].hasView = 1;
    setTarget(newArr);
  }

  const changeValueEdit = index => e => {
    let newArr = [...target];
    newArr[index].hasEdit = e.target.checked === true? 1: 0;
    newArr[index].hasView = 1;
    setTarget(newArr);
  }

  const changeValueDelete = index => e => {
    let newArr = [...target];
    newArr[index].hasDelete = e.target.checked === true? 1: 0;
    newArr[index].hasView = 1;
    setTarget(newArr);
  }

  const changeValueApprove = index => e => {
    let newArr = [...target];
    newArr[index].hasApprove = e.target.checked === true? 1: 0;
    newArr[index].hasView = 1;
    setTarget(newArr);
  }

  const changeValueDynamic = (key, index) => e => {
    let newArr = [...target];
    newArr[index].ortherControls[key].value = e.target.checked === true? 1: 0;
    newArr[index].hasView = 1;
    setTarget(newArr);
  }

  const renderRow = target.map((item, index) => {
    let arrKeyOrtherControl = Object.keys(item.ortherControls);
    return (
      <Panel header={item.resourceName} key={item.resourceCode}>
        <Row >
          <Col span={5}>
            <Checkbox checked={item.hasView} onChange={changeValueView(index)}>Xem</Checkbox>
          </Col>
          <Col span={5}>
            <Checkbox checked={item.hasAdd} onChange={changeValueAdd(index)}>Thêm mới</Checkbox>
          </Col>
          <Col span={5}>
            <Checkbox checked={item.hasEdit} onChange={changeValueEdit(index)}>Sửa</Checkbox>
          </Col>
          <Col span={5}>
            <Checkbox checked={item.hasDelete} onChange={changeValueDelete(index)}>Xóa</Checkbox>
          </Col>
          <Col span={4}>
            <Checkbox checked={item.hasApprove} onChange={changeValueApprove(index)}>Duyệt</Checkbox>
          </Col>
        </Row>
        <br />
        <Row >
          {
            arrKeyOrtherControl.length ? arrKeyOrtherControl.map((subItem) =>
              <Col span={5} key={subItem}>
                <Checkbox checked={item.ortherControls[subItem].value} onChange={changeValueDynamic(subItem, index)}>{item.ortherControls[subItem].title}</Checkbox>
              </Col>) : ""
          }
        </Row>
      </Panel>); 
    });


  return (
    <Modal
      title={`Gán quyền: ${dataDetail.sysRoleName}`}
      visible={isShowAddPermission}
      footer={null}
      width={800}
      onCancel={onClose}
    >
      <form onSubmit={handleSubmit(onSave)}>
        <ScrollPanel style={{ width: '100%' }} className="custom-content-popup">
          <Collapse expandIconPosition={"right"}>
            {renderRow}
          </Collapse>
        </ScrollPanel>
        <div className="footer-modal">
          <input type="submit" className="ant-btn ant-btn-primary" value="Lưu lại" />
          <Button type="danger" className="btn-discard" onClick={onClose}>Hủy</Button>
        </div>
      </form>
    </Modal>
  );
}