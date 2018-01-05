import axios from 'axios';

let base = 'http://localhost:8888';

export const getusers = params => { return axios.post(`${base}/api/users`,  params).then(res => res.data); };
// export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }) };
