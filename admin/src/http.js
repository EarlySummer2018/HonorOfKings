import axios from 'axios';
import Vue from 'vue'
import router from './router'
const http = axios.create({
  // 请求地址中的前缀部分
  baseURL: 'http://localhost:3000/admin/api'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token || '';
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (res) {
  return res
}, function (error) {
  if (error.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: error.response.data.message
    })
    if (error.response.status === 401) {
      router.push('/login')
    }
  }
  return Promise.reject(error);
});

export default http