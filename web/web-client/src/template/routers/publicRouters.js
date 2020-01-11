import { lazy } from 'react';
const User = lazy(() => import('../../modules/system/user/User'));
const Home = lazy(() => import('../../modules/system/home/Home'));
const SysResource = lazy(() => import('../../modules/system/sysresource/SysRersource'));
const SysRole = lazy(() => import('../../modules/system/sysrole/SysRole'));
const Organization = lazy(() => import('../../modules/system/organization/Organization'));
const HasNotPermission = lazy(() => import('../../modules/system/invalid/HasNotPermission'));

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
        path: '/hpermission'
    }
}