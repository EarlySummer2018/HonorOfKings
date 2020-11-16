import axios from 'axios';

const http = axios.create({

  // 请求地址中的前缀部分
  baseURL: 'http://localhost:3000/admin/api'
})

export default http