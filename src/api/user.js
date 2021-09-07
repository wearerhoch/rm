import request from "../utils/request";

// 请求用户登录地址
export const getUserInfo = data => {
  return request({
    url:'/app/v1_0/authorizations',
    method:'post',
    data
  })
}

// 请求验证码
export const getSMSCode = mobile => {
  return request({
    url:`http://ttapi.research.itcast.cn/app/v1_0/sms/codes/${mobile}`,
    method:'get'
  })
}

// 请求user个人信息
export const getUserDetail = () => {
  return request({
    url:'/app/v1_0/user',
    method:'get'
  })
}