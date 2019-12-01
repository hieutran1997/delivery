import { lazy } from 'react';
const User = lazy(() => import('../../modules/usermodule/User'));
const Home = lazy(() => import('../../modules/homeModule/Home'));
const SysResource = lazy(() => import('../../modules/sysresourcemodule/SysRersource'));
const SysRole = lazy(() => import('../../modules/sysrolemodule/SysRole'));
const Organization = lazy(() => import('../../modules/organizationmodule/Organization.component'));
// const Control = lazy(() => import('../../modules/controlmodule/Control'));

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
    },
    // Control: {
    //     component: Control,
    //     path: '/control'
    // }
}