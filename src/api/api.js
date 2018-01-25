import axios from 'axios';
import qs    from 'qs';

//请求ip地址
let base = 'http://localhost:8888/vue';
//设置跨域
let heads = {
				 headers: {
			                'Content-Type': 'application/x-www-form-urlencoded'
			              }
            }

//登录接口
export const requestLogin = params => { return axios.post(`${base}/login`, qs.stringify(params),heads).then(res => res.data); };

//用户数据增删改查
export const getusers = params => { return axios.post(`${base}/users`,  qs.stringify(params),heads).then(res => res.data); };

export const editusers = params => { return axios.post(`${base}/edituser`,  qs.stringify(params),heads).then(res => res.data); };

export const Delusers = params => { return axios.post(`${base}/deluser`,  qs.stringify(params),heads).then(res => res.data); };

export const Addusers = params => { return axios.post(`${base}/adduser`,  qs.stringify(params),heads).then(res => res.data); };

//壁纸增，查接口
export const getbzs = params => { return axios.post(`${base}/bzdata`,  qs.stringify(params),heads).then(res => res.data); };         
// 增添壁纸
export const addbzs = params => { return axios.post(`${base}/bzadds`,  qs.stringify(params),heads).then(res => res.data); };         

export const imgs = params => { return axios.post(`${base}/imgs`,  qs.stringify(params),heads).then(res => res.data); };         

