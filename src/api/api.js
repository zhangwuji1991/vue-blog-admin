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


export const requestLogin = params => { return axios.post(`${base}/login`, qs.stringify(params),heads).then(res => res.data); };

export const getusers = params => { return axios.post(`${base}/users`,  qs.stringify(params),heads).then(res => res.data); };

export const editusers = params => { return axios.post(`${base}/edituser`,  qs.stringify(params),heads).then(res => res.data); };

export const Delusers = params => { return axios.post(`${base}/deluser`,  qs.stringify(params),heads).then(res => res.data); };

export const Addusers = params => { return axios.post(`${base}/adduser`,  qs.stringify(params),heads).then(res => res.data); };
         