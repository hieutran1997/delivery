import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getDataPaging } from '../../actions';
import { dataPost, message } from '../../common';
import { GETUSER_PAGING_SUCCESS } from '../../constants/ActionTypes';
import { Table, Icon, Modal, Popconfirm, Row, Col } from 'antd';
import useForm from 'react-hook-form'

function User(props) {

  const [dataContent, setDataContent] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [dataSearch, setDataSearch] = useState(dataPost);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);

  const columns = [
    {
      title: 'STT',
      dataIndex: 'stt',
      width: '5%',
      render: (value, row, index) => {
        return index + 1;
      }
    },
    {
      title: 'Tên đăng nhập',
      dataIndex: 'username',
      width: '20%'
    },
    {
      title: 'Họ',
      dataIndex: 'firstname',
      width: '20%'
    },
    {
      title: 'Tên',
      dataIndex: 'lastname',
      width: '20%'
    },
    {
      title: 'Tuổi',
      dataIndex: 'age'
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Icon type="edit" onClick={() => { handleEdit(record) }} className="icon-action" />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Popconfirm
            title={message.messageConfirmDelete}
            icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
            onConfirm={() => { handleDelete(record) }}
          >
            <Icon type="delete" className="icon-action" />
          </Popconfirm>
        </span>
      ),
      width: '20%'
    },
  ];

  useEffect(() => {
    if (!props.dataUser) {
      setLoading(true);
      if (dataContent) {
        props.filterData(dataSearch);
      }
    } else {
      setLoading(false);
      switch (props.dataUser.type) {
        case GETUSER_PAGING_SUCCESS:
          setDataContent(props.dataUser.content);
          setPagination({
            current: props.dataUser.number + 1,
            pageSize: props.dataUser.size,
            total: props.dataUser.totalElements
          });
          break;
        default:
          console.log('1');
          break;
      }
    }
  }, [props, dataContent, dataSearch]);

  const handleTableChange = (pagination) => {
    setDataSearch(pagination);
    props.filterData(pagination);
  }

  const handleEdit = (data) => {
    setDataDetail(data);
    setIsEdit(true);
    console.log('data', data);
  }

  const handleDelete = (data) => {
    console.log('data', data);
  }

  return (
    <div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={dataContent}
        pagination={pagination}
        loading={isLoading}
        onChange={handleTableChange}
      />

      <Modal
        title={"Sửa thông tin tài khoản: " + dataDetail.username}
        centered
        visible={isEdit}
        onOk={() => onSubmit}
        onCancel={() => setIsEdit(false)}
        width={800}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row type="flex" justify="space-around">
            <input name="firstName" span={8} ref={register({ required: true, maxlength: 20 })} />
            <span className="error-message">{errors.firstName && 'First name is required'}</span>

            <input name="lastName" span={8} ref={register({ pattern: /^[A-Za-z]+$/i })} />
          </Row>
         
          <br/>
          <input name="age" span={12} type="number" ref={register({ min: 18, max: 99 })} />
        </form>
      </Modal>
    </div>
  );
}

const mapStateToProps = state => ({
  dataUser: state.userReducer
});

const mapDispatchToProps = dispatch => {
  return {
    filterData: (data) => dispatch(getDataPaging(data))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
