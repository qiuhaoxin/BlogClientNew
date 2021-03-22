
import {lazy} from 'react';
import MainPage from '../views/MainPage';
const PublishPage=lazy(()=>import("../views/Publish")); //()=>lazy('../views/Publish');
const AboutPage= lazy(()=>import("../views/About"));//()=>lazy('../views/About');
const WriteAnyTimePage=lazy(()=>import('../views/WriteAnyTime'));
const ArticlePage=lazy(()=>import('../views/MainPage/article'))
export default [
    {
        name:'首页',
        path:'/main',
        showAsNav:true,
        component:MainPage,
    },{
        name:'发表文章',
        path:'/publish',
        showAsNav:true,
        component:PublishPage,
    },{
        name:'随手记',
        path:'writeAnyTime',
        showAsNav:true,
        component:WriteAnyTimePage,
    },{
        name:'关于作者',
        path:'/about',
        showAsNav:true,
        component:AboutPage,
    },{
        name:'文章详情',
        path:'/article/:articleId',
        showAsNav:false,
        component:ArticlePage,
    }
]