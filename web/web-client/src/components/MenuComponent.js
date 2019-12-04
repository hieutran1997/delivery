import React, { useState } from 'react';
import { menu } from '../environment';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

const { SubMenu } = Menu;

function MenuComponent(props) {

    const [menus] = useState(menu);
    const renderMenu = menus.map((item) =>
        item.childs.length > 0 ?
            <SubMenu
                key={item.key}
                title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                }
            >
                {item.childs.map((subItem) =>
                    <Menu.Item key={subItem.key}>
                        <Icon type={subItem.icon} />
                        <span>{subItem.title}</span>
                        <NavLink to={{
                            pathname: `/${subItem.url_hash}`,
                            state: { fromDashboard: true }
                        }}></NavLink>
                    </Menu.Item>)
                }
            </SubMenu>
            :
            <Menu.Item key={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
                <NavLink to={{
                    pathname: `/${item.url_hash}`,
                    state: { fromDashboard: true }
                }}></NavLink>
            </Menu.Item>
    );

    return (
        <Menu theme="dark"
            mode="inline"
            selectable={true}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["system"]}
            selectedKeys={[props.pathUrl.pathname]}
        >
            {renderMenu}
        </Menu>
    );
}

export default MenuComponent;
