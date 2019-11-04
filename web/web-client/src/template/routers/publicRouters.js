import User from '../../modules/usermodule/User';
import Home from '../../modules/homemodule/Home';
export default{
    Home: {
        component: Home,
        path: '/'
    },
    User: {
        component: User,
        path: '/users'
    },
}