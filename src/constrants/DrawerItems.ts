

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import RegisterInfo from '../pages/RegisterInfo';


export default [
    {
        name: 'Home',
        component: Home,
        iconName: 'home',
    },
    {
        name: 'Orçamento',
        component: RegisterInfo,
        iconName: 'money',
    },
    {
        name: 'Perfil',
        component: Profile,
        iconName: 'user'
    },
    // {
    //     name:'Sair',
    //     component: 
    //     iconType:'FontAwesome',
    //     iconName:'sign-out-alt'
    // },
   
]