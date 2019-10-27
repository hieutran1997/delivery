import User from '../../modules/userModule/User';
import Home from '../../modules/homeModule/Home';
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