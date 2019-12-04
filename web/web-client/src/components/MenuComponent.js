import React, { useState } from 'react';
import { menu } from '../environment';
import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom';
import { hasMenu, getCurrentUser } from '../common';

const { SubMenu } = Menu;

function MenuComponent(props) {

    const [menus, setMenu] = useState([]);
    const [onInit, setOnInit] = useState(true);

    const filterMenu = () => {
        let data = [...menu];
        let dataTmp = data;
        for(var i = 0; i< dataTmp.length; i++){
            if(hasMenu(dataTmp[i].key) || dataTmp[i].childs.length > 0){
                for(var j = 0; j< dataTmp[i].childs.length; j++){
                    if(!hasMenu(dataTmp[i].childs[j].key)){
                        data[i].childs.splice(j, 1);
                        j--;
                    }
                }
            }else{
                data.splice(i, 1);
            }
        }
        setMenu(data);
        setOnInit(false);
    }

    if(onInit){
        var currentUser = getCurrentUser();
        if(currentUser && currentUser.typeOfUser === 1){
            setMenu(menu);
            setOnInit(false);
        }
        else if(currentUser && currentUser.typeOfUser !== 1){
            filterMenu();
        }
    }
    
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
