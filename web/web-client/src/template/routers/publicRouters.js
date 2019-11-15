import User from '../../modules/usermodule/User';
import Home from '../../modules/homemodule/Home';
import SysResource from '../../modules/sysresourcemodule/SysRersource';
import SysRole from '../../modules/sysrolemodule/SysRole';
import Organization from '../../modules/organizationmodule/Organization.component';

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
    SysRole: {
        component: SysRole,
        path: '/roles'
    },
    Organization:{
        component: Organization,
        path: '/organization'
    }
}