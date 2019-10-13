import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import { useSelector } from 'react-redux';

const { Header, Sider, Content } = Layout;
//const { SubMenu } = Menu;

const loginPage = {
  pathname: '/login',
  state: { firstPage: true }
}

function App(props) {

  const [collapsed, setCollapsed] = useState(false);

  const data = useSelector(state => state.authReducer);
  if (data && data.unauthorized) {
    props.history.replace(loginPage);
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="user" />
            <span>nav 1</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
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
            padding: 24,
            background: '#fff',
            minHeight: 280,
            overflow: 'initial' 
          }}
        >
          <div style={{ padding: 24, background: '#fff', textAlign: 'center' }}>
            ...
          <br />
            Really
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            long
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            ...
          <br />
            content
        </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
