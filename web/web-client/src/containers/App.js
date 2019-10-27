import React, { useState } from 'react';
import { Layout, Icon } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useSelector } from 'react-redux';
import MenuComponent from '../components/MenuComponent';
import { Redirect } from 'react-router-dom';
import { openNotification } from '../common';

const { Header, Sider, Content } = Layout;

function App(props) {

  const [collapsed, setCollapsed] = useState(false);

  const Component = props.component;
  const route = props.route;

  let data = useSelector(state => state.authReducer);
  if (data && data.unauthorized) {
    localStorage.removeItem('deliveryApp');
    openNotification('error', 'Lỗi', 'Phiên đăng nhập hết hạn!');
    return <Redirect to='/login'/>;
  }

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        className="sider"
        trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <MenuComponent />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => toggle()}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: '8px 0px',
            background: '#fff',
            minHeight: 500,
            overflow: 'initial'
          }}
        >
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <Component route={route}/>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
