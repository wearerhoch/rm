import request from '../utils/request'

/* 获取当前用户的频道列表 */
export const getUserChannels = () => {
  return request({
    method:'get',
    url:'/app/v1_0/user/channels'
  })
}

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method:'get',
    url:'/app/v1_0/channels'
  })
}

// 相关的文章 get请求中通常用params传递参数，这个参数会放在url后面跟随请求一起发出，post请求中通常用data来传递参数，这个参数会保存在请求体中向请求发出
export const getArticleById = params => {
  return request({
    method:'get',
    url:'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params
  })
}