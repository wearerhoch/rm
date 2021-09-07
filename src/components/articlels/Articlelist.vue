<template>
   <div class="arclist-container">
      <van-list
      :loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(artitem,index) in list" :key="index">
        <article-item :artitem="artitem"></article-item>
      </van-cell>
    </van-list>
   </div>
</template>

<script>
import {getArticleById} from '../../api/channels'
import articleItem from './Articleitem.vue'
export default {
   name:'articlelist',
   data () {
      return {
        loading:false, //加载
        finished:false, //结束
        list:[] //空列表数组
      };
   },

   props: {
     channel:{
       type:Object,
       required:true
     }
   },

   created (){},

   mounted (){},

   components: {
     articleItem 
   },

   computed: {},

   methods: {
    async onLoad (){
      // 异步更新数据
      // 请求获取文章数据
      try {
        const {data:res} = await getArticleById({
          channel_id:this.channel.id,
          timestamp:Date.now(),
          with_top:1
        })
        console.log(res);
        this.list.push(...res.data.results)
      } catch (error) {
        this.$toast.fail('请求异常，请稍后重试')
      }
      // 文章数据渲染至当前页面
      // 当前文章列表如果还有更多項，则继续加载更多，直到 加载完毕
      this.loading = false;
      this.finished = true;
    }
  }
}
</script>
<style lang='scss' scoped>
.arclist-container{

}
</style>