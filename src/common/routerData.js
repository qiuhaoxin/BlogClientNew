
import {lazy} from 'react';
import MainPage from '../views/MainPage';
const PublishPage=lazy(()=>import("../views/Publish")); //()=>lazy('../views/Publish');
const AboutPage= lazy(()=>import("../views/About"));//()=>lazy('../views/About');
const WriteAnyTimePage=lazy(()=>import('../views/WriteAnyTime'));
export default [
    {
        name:'首页',
        path:'/main',
        component:MainPage,
    },{
        name:'发表文章',
        path:'/publish',
        component:PublishPage,
    },{
        name:'随手记',
        path:'writeAnyTime',
        component:WriteAnyTimePage,
    },{
        name:'关于作者',
        path:'/about',
        component:AboutPage,
    }
]