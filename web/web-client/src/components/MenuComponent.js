import React, { useState, useEffect } from 'react';
import { menu } from '../environment';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { hasMenu, getCurrentUser } from '../common';

const { SubMenu } = Menu;
const currentUser = getCurrentUser();

function MenuComponent(props) {

    const [menus, setMenu] = useState([]);
    const [onInit, setOnInit] = useState(true);

    const filterMenu = () => {
        let data = [...menu];
        let result = [];
        for (var i = 0; i < data.length; i++) {
            let dataTmp = [];
            for (var j = 0; j < data[i].childs.length; j++) {
                if (hasMenu(data[i].childs[j].key)) {
                    dataTmp.push(data[i].childs[j]);
                }
            }
            if(dataTmp.length > 0){
                result.push({
                    key: data[i].key,
                    title: data[i].title,
                    component: data[i].component,
                    url_hash: data[i].url_hash,
                    icon: data[i].icon,
                    childs: dataTmp
                })
            }
            else if(hasMenu(data[i].key)){
                result.push({
                    key: data[i].key,
                    title: data[i].title,
                    component: data[i].component,
                    url_hash: data[i].url_hash,
                    icon: data[i].icon,
                    childs: []
                })
            }
        }
        setMenu(result);
        setOnInit(false);
    }

    useEffect(()=>{
        if (onInit) {
            if (currentUser && currentUser.typeOfUser === 1) {
                setMenu(menu);
                setOnInit(false);
            }
            else if (currentUser && currentUser.typeOfUser !== 1) {
                filterMenu();
            }
        }
        if(props.updateMenu){
            if (currentUser && currentUser.typeOfUser !== 1) {
                filterMenu();
                props.setUpdateMenu(!props.updateMenu);
            }
        }
    }, [props, onInit, setMenu, setOnInit]);

    const renderMenu = menus.map((item) =>
        item.childs.length > 0 ?
            <SubMenu
                key={`/${item.key}`}
                title={
                    <span>
                        <Icon type={item.icon} />
                        <span>{item.title}</span>
                    </span>
                }
            >
                {item.childs.map((subItem) =>
                    <Menu.Item key={`/${subItem.key}`}>
                        <Icon type={subItem.icon} />
                        <span>{subItem.title}</span>
                        <NavLink to={{
                            pathname: `/${subItem.url_hash}`,
                            state: { fromDashboard: true, key: subItem.key }
                        }}></NavLink>
                    </Menu.Item>)
                }
            </SubMenu>
            :
            <Menu.Item key={`/${item.key}`}>
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
            defaultOpenKeys={["/system"]}
            selectedKeys={[props.pathUrl.pathname]}
        >
            {renderMenu}
        </Menu>
    );
}

export default MenuComponent;
