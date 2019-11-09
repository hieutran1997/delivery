import User from '../../modules/usermodule/User';
import Home from '../../modules/homemodule/Home';
import SysResource from '../../modules/sysresourcemodule/SysRersource';
export default{
    Home: {
        component: Home,
        path: '/'
    },
    User: {
        component: User,
        path: '/users'
    },
    SysResource: {
        component: SysResource,
        path: '/resources'
    },
}