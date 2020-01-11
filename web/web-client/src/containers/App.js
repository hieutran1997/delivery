import React, { useState } from 'react';
import { Layout, Icon, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useSelector, connect } from 'react-redux';
import MenuComponent from '../shared/components/MenuComponent';
import { Redirect } from 'react-router-dom';
import { openNotification, getCurrentUser, getPathMenu, hasMenu, getListTopic, getListPermission } from '../shared/common';
import { useHistory } from "react-router-dom";
import { BreadCrumb } from 'primereact/breadcrumb';
import { ScrollPanel } from 'primereact/scrollpanel';
import SockJsClient from "react-stomp";
import { environments_dev, url_services} from '../environment';

const { Header, Sider, Content } = Layout;

function App(props) {

  const [collapsed, setCollapsed] = useState(false);
  const [clientConnected, setClientConnected] = useState(false);
  const [client, setClient] = useState({});
  const [updateMenu, setUpdateMenu] = useState(false);

  const Component = props.component;
  const route = props.route;
  const topics = getListTopic();

  let history = useHistory();
  let data = useSelector(state => state.authReducer);
  if (data && data.unauthorized) {
    localStorage.removeItem('deliveryApp');
    localStorage.removeItem('deliveryAppScope');
    openNotification('error', 'Lỗi', 'Phiên đăng nhập hết hạn!');
    return <Redirect to='/login' />;
  }

  console.log('test dom', props);

  const checker = ()=>{
    if (props.currentUser) {
      if (!hasMenu(history.location.pathname.substring(1))
        && props.currentUser.typeOfUser !== 1
        && "/permission" !== history.location.pathname
        && "/" !== history.location.pathname) { //Loại bỏ dấu /
        history.push("/permission");
      }
    }else{
      history.push("/login");
    }
  }

  checker();

  const onMessageReceive = (msg, topic) => {
    let index = topics.indexOf(topic);
    if(index >= 0){
      getListPermission();
      setTimeout(function(){
        setUpdateMenu(true);
      }, 1000);
      checker();
    }
  }

  if(clientConnected) {
    console.log('client Connected', client.state);
  }

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onClickDropDownUser = ({ key }) => {
    if (key === "2") {
      localStorage.removeItem('deliveryApp');
      localStorage.removeItem('deliveryAppScope');
      history.push("/login");
    }
  };

  const dropDownUser = (
    <Menu onClick={onClickDropDownUser}>
      <Menu.Item key="1">
        <Icon type="user" /> {props.currentUser ? props.currentUser.username : 'Chưa đăng nhập'}
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="logout" />  Đăng xuất
      </Menu.Item>
    </Menu>
  );

  const home = { icon: 'pi pi-home', url: '/' }

  return (
    <Layout>
      <SockJsClient url={`${environments_dev.URL_SERVICE}/${url_services.WEBSOCKET}`} topics={topics}
        onMessage={onMessageReceive} ref={(client) => { setClient(client) }}
        onConnect={() => { setClientConnected(true) }}
        onDisconnect={() => { setClientConnected(false) }}
        debug={false} />
      <Sider
        className="sider"
        width={240}
        trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >
          <div className="currentInfo">
            {/* <img src={process.env.PUBLIC_URL + '/logo.png'} alt={message.titleApp}/> */}
          </div>
        </div>
        <MenuComponent pathUrl={route.location} updateMenu={updateMenu} setUpdateMenu={setUpdateMenu}/>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={() => toggle()}
          />
          <Dropdown overlay={dropDownUser} trigger={['click']}>
            <Icon type="user" className="icon-header-right" alt="User" />
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '10px 8px',
            minHeight: 350,
            overflow: 'initial'
          }}
        >
          <ScrollPanel style={{ width: '100%' }} className="custom-content">
            <BreadCrumb model={getPathMenu(history.location.pathname)} home={home} />
            <Component route={route} />
          </ScrollPanel>
        </Content>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = state => ({ currentUser: getCurrentUser() })

export default connect(mapStateToProps)(App)