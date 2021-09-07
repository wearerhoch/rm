import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    name:'login',
    component:() => import('../views/Login.vue')
  },
  {
    path:'/',
    component:() => import('../views/Layout.vue'),
    children:[
      {
        path:'/',
        name:'home',
        component:()=>import('../views/main/Home.vue')
      },
      {
        path:'/qa',
        name:'qa',
        component:() => import('../views/main/Qa.vue')
      },
      {
        path:'/rmvd',
        name:'rmvd',
        component:() => import('../views/main/Video.vue')
      },
      {
        path:'/profile',
        name:'profile',
        component:() => import('../views/main/Profile.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

// 路由导航守卫
router.beforeEach( (to,from,next) => {
  document.title = to.name
  next()
})
export default router