import Vue from 'vue'
import axios from 'axios'
import store from '../store/index'

Vue.prototype.$http = axios

const request = axios.create({
  baseURL:'http://ttapi.research.itcast.cn',
  timeout:5000,
  transformResponse:[function (data){
    try {
      return JSON.parse(data)
    } catch (error) {
      console.log(error);
      return {data}
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(function(config){
  //console.log(config);
  const userT = store.state.user
  if(userT){
    config.headers.Authorization = `Bearer ${userT.token}`
  }
  return config //处理完结果一定要将结果返回出去 因为你是拦截的请求
},function(err){
    console.log(err);
}) 
// 响应拦截器

export default request