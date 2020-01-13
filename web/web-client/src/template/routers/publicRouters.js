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
        path: '/',
        moduleUrl: ''
    },
    User: {
        component: User,
        path: '/user',
        moduleUrl: '/admin/system'
    },
    SysResource: {
        component: SysResource,
        path: '/resource',
        moduleUrl: '/admin/system'
    },
    SysRole: {
        component: SysRole,
        path: '/role',
        moduleUrl: '/admin/system'
    },
    Organization:{
        component: Organization,
        path: '/org',
        moduleUrl: '/admin/system'
    },
    HasNotPermission: {
        component: HasNotPermission,
        path: '/hpermission',
        moduleUrl: '/admin/system'
    }
}