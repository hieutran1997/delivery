import { lazy } from 'react';
const User = lazy(() => import('../../modules/usermodule/User'));
const Home = lazy(() => import('../../modules/homeModule/Home'));
const SysResource = lazy(() => import('../../modules/sysresourcemodule/SysRersource'));
const SysRole = lazy(() => import('../../modules/sysrolemodule/SysRole'));
const Organization = lazy(() => import('../../modules/organizationmodule/Organization.component'));
const HasNotPermission = lazy(() => import('../../modules/invalidModule/HasNotPermission'));

export default{
    Home: {
        component: Home,
        path: '/'
    },
    User: {
        component: User,
        path: '/user'
    },
    SysResource: {
        component: SysResource,
        path: '/resource'
    },
    SysRole: {
        component: SysRole,
        path: '/role'
    },
    Organization:{
        component: Organization,
        path: '/org'
    },
    HasNotPermission: {
        component: HasNotPermission,
        path: '/permission'
    }
}