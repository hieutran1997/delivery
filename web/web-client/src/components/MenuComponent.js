import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { menu } from '../environment';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';

function MenuComponent() {

    const [menus] = useState(menu);

    const renderMenu = menus.map((item) =>
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            {renderMenu}
        </Menu>
    );
}

export default MenuComponent;
