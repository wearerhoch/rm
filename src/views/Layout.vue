<template>
      <div>           
         <!-- 二级路由出口 -->
         <router-view/>
         <!-- 底部标签 -->
         <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/rmvd">视频</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/profile">{{user?'我的':'未登录'}}</van-tabbar-item>
         </van-tabbar>
      </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
   name:'layout',
   data () {
      return {
         active:0 //被激活
      };
   },

   props: {},

   created (){
   },

   mounted (){},

   components: {},

   computed: {
      ...mapState(['user'])
   },

   methods: {}
}
</script>
<style lang='scss' scoped>

</style>