import React, { useState } from 'react';
import { Layout, Icon, Menu, Dropdown  } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useSelector, connect } from 'react-redux';
import MenuComponent from '../components/MenuComponent';
import { Redirect } from 'react-router-dom';
import { openNotification } from '../common';
import { useHistory } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const getCurrentUser = () =>{
  var info = localStorage.getItem('deliveryApp');
  if (info) {
    info = JSON.parse(info);
    return info;
  }
}

function App(props) {

  const [collapsed, setCollapsed] = useState(false);

  const Component = props.component;
  const route = props.route;

  let history = useHistory();
  let data = useSelector(state => state.authReducer);
  if (data && data.unauthorized) {
    localStorage.removeItem('deliveryApp');
    openNotification('error', 'Lỗi', 'Phiên đăng nhập hết hạn!');
    return <Redirect to='/login'/>;
  }

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onClickDropDownUser = ({ key }) => {
    if(key === "2"){
      localStorage.removeItem('deliveryApp');
      history.push("/login");
    }  
  };
  
  const dropDownUser = (
    <Menu onClick={onClickDropDownUser}>
      <Menu.Item key="1">
        <Icon type="user" /> {props.currentUser.username}
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="logout" />  Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Sider
        className="sider"
        trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <div className="currentInfo">
            {/* <img src={process.env.PUBLIC_URL + '/logo.png'} alt={message.titleApp}/> */}
          </div>
        </div>
        <MenuComponent />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => toggle()}
          />
          <Dropdown overlay={dropDownUser} trigger={['click']}>
            <Icon type="user" className="icon-header-right" alt="User"/>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            minHeight: 500,
            overflow: 'initial'
          }}
        >
          <div style={{ padding: 24, minHeight: 360 }}>
            <Component route={route}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => ({ currentUser: getCurrentUser() })

export default connect(mapStateToProps)(App)