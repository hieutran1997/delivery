import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, Button, Checkbox } from 'antd';
import { Dropdown } from 'primereact/dropdown';
import useForm from 'react-hook-form';

export function PopupAdd(props) {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [dataDetail, setDataDetail] = useState(props);
  const [lstOrg, setLstOrg] = useState([]);
  const [orgCode, setOrgCode] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const onSaveEdit = data => {
    if (orgCode) {
      data.organizationCode = orgCode.value;
    }
    data.typeOfUser = isAdmin ? 1 : 0;
    props.onSave(data);
  };

  useEffect(() => {
    if (lstOrg.length === 0 && props.lstOrg.length > 0) {
      setLstOrg(props.lstOrg);
    }
    if (props.dataDetail) {
      setDataDetail(props.dataDetail);
      setTimeout(function () {
        setValue("username", props.dataDetail.username);
        setValue("age", props.dataDetail.age);
        setValue("firstname", props.dataDetail.firstname);
        setValue("lastname", props.dataDetail.lastname);
        setValue("organizationCode", props.dataDetail.organizationCode);
      }, 100);
    }
    setIsShowAdd(props.isShowAdd);
  }, [props, dataDetail, lstOrg, setLstOrg, setValue]);

  const changeOrg = (e) => {
    setOrgCode(e.value);
  }

  return (
    <Modal
      title={"Thêm mới tài khoản: "}
      visible={isShowAdd}
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
        <br />
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
        <br />
        <Row type="flex" >
          <Col span={11}>
            <span>Đơn vị:</span>
            <Dropdown
              className="custom-input-as-ant-input"
              value={orgCode}
              dataKey="value"
              options={lstOrg}
              optionLabel="name"
              onChange={changeOrg}
              filter={true}
              filterPlaceholder='Chọn đơn vị'
              filterBy="name"
              showClear={true}
              width="100%"
            />
          </Col>
          <Col span={2}></Col>
          <Col span={11} style={{top: '50%'}}>
            <Checkbox checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)}>Là quản trị viên</Checkbox>
          </Col>
        </Row>

        <div className="footer-modal">
          <input type="submit" className="btn-save ant-btn btn-discard ant-btn-primary" value="Lưu lại" />
          <Button type="danger" className="btn-discard" onClick={props.closePopup}>Hủy</Button>
        </div>
      </form>
    </Modal>
  );
}