import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Checkbox } from 'antd';
import useForm from 'react-hook-form';

export function PopupAddPermission(props) {
  const { handleSubmit } = useForm();

  const [isShowAddPermission, setIsShowAddPermission] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [target, setTarget] = useState([]);
  const [onInitTarget, setOnInitTarget] = useState(true);

  const columns = [
    {
      title: 'Tên tài nguyên',
      dataIndex: 'resourceName',
    },
    {
      title: 'Thêm mới',
      dataIndex: 'hasAdd',
      render: (text, record) => {
        if( record && record.hasAdd){
          record.hasAdd = (record.hasAdd === 1);
        }else{
          record.hasAdd = false;
        }
        const changeValue = (e) =>{
          record.hasAdd = e.target.checked;
        }
        return <Checkbox checked={record.hasAdd} onChange={changeValue}></Checkbox>
      }
    },
    {
      title: 'Sửa',
      dataIndex: 'hasEdit',
    },
    {
      title: 'Xóa',
      dataIndex: 'hasDelete',
    },
    {
      title: 'Duyệt',
      dataIndex: 'hasApprove',
    },

  ];

  const onSave = () => {
    let data = {
      roleCode: props.dataDetail.code,
      target: target
    };
    console.log('target', target);
    setTarget([]);
    //props.onSave(data);
  };

  const onClose = () => {
    setTarget([]);
    setOnInitTarget(true);
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
    }
    setIsShowAddPermission(props.isShowAddPermission);
  }, [props, target, setTarget, onInitTarget]);

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
  };

  return (
    <Modal
      title={`Gán quyền: ${dataDetail.sysRoleName}`}
      visible={isShowAddPermission}
      footer={null}
      width={800}
      onCancel={onClose}
    >
      <form onSubmit={handleSubmit(onSave)}>
        <Table rowSelection={rowSelection} columns={columns} dataSource={target} scroll={{ y: 240 }} pagination={false} />
        <div className="footer-modal">
          <input type="submit" className="ant-btn ant-btn-primary" value="Lưu lại" />
          <Button type="danger" className="btn-discard" onClick={onClose}>Hủy</Button>
        </div>
      </form>
    </Modal>
  );
}