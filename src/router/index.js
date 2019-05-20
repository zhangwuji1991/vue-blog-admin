

import Login from '@/components/login/index'
import NotFound from '@/components/error/404'
import Home from '@/components/home/index'
import Bz from '@/components/nav1/Bz'
import Imgs from '@/components/nav1/img'
import user from '@/components/nav1/user'
import blong from '@/components/nav1/blong'
import Page4 from '@/components/nav2/Page4'
import Page5 from '@/components/nav2/Page5'
import Page8 from '@/components/nav2/Page8'
import Page6 from '@/components/nav3/Page6'
import Page68 from '@/components/nav4/Page68'
import echarts from '@/components/charts/echarts'
import setting from '@/components/setting/set'

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
    {
        path: '/',
        component: Home,
        name: '统计',
        iconCls: 'el-icon-s-home',
        leaf: true,//只有一个节点
        children: [
            { path: '/home', component: Page6, name: '统计' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '管理',
        iconCls: 'el-icon-office-building',//图标样式class
        children: [
            { path: '/user',  component:  user, name: '用户' },
            { path: '/Bz',    component:  Bz,   name: '壁纸' },
            { path: '/imgs',  component:  Imgs, name: '图片' },
            { path: '/blong', component:  blong, name: '博客' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '娱乐',
        iconCls: 'el-icon-headset',
        children: [
            { path: '/music', component: Page4, name: '音乐' },
            { path: '/movie', component: Page5, name: '电影' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '前端',
        iconCls: 'el-icon-notebook-2',
        children: [
            { path: '/page4', component: Page68, name: 'vue' },
           
        ]
    },
    {
        path: '/',
        component: Home,
        name: '设置',
        iconCls: 'el-icon-setting',
        // leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '个人中心' },
             { path: '/setting', component: Page8, name: '设置' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '图标',
        iconCls: 'el-icon-sunny',
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