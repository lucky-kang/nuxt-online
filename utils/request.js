import axios from 'axios';

// 创建axios实例
const service = axios.create({
  baseURLL: '',
  timeout: 15000, // 请求超时时间
  headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

// request interceptor
service.interceptors.request.use(config => {
  if (config.method === 'post') {
   /* let timestamp = Date.parse(new Date());
    let user = '';
    let sign = md5((user + user + timestamp));
    config.data = {
      ...config.data,
      user: user,
      timestamp: timestamp,
      sign: sign
    };*/
//  console.log('请求参数', JSON.stringify(config.data))
  }
  return config
}, error => {
  // Do something with request error
  console.log(error); // for debug
  return Promise.reject(error)
});

// response interceptor
service.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log('err' + error); // for debug
  // 判断请求超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    console.info('请求超时');
    // mui.toast('请求超时，刷新试试');
    // return service.request(originalRequest); // 再重复请求一次
  }
  return Promise.reject(error)
});

export default service
