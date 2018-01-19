

import Login from '@/components/login'
import NotFound from '@/components/404'
import Home from '@/components/home'
import Main from '@/components/Main'
import Bz from '@/components/nav1/Bz'
import Form from '@/components/nav1/form'
import user from '@/components/nav1/user'
import Page4 from '@/components/nav2/Page4'
import Page5 from '@/components/nav2/Page5'
import Page8 from '@/components/nav2/Page8'
import Page6 from '@/components/nav3/Page6'
import Page68 from '@/components/nav4/Page68'
import echarts from '@/components/charts/echarts'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '管理',
        iconCls: 'fa fa-address-card',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },

            { path: '/user', component: user, name: '用户' },
             { path: '/Bz', component: Bz, name: '壁纸' },
            { path: '/form', component: Form, name: 'Form' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'vuex',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' },
             { path: '/page8', component: Page8, name: '页面8' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '测试',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page68, name: '页面42' },
           
        ]
    },
    {
        path: '/',
        component: Home,
        name: '测试2',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '图标',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;