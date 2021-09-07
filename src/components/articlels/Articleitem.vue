<template>
   <div class="artitem-container">
      <van-cell>
        <div slot="title">{{artitem.title}}</div>
        <div slot="label" class="label">
          <div v-if="artitem.cover.type === 3" class="art-imgs">
            <van-image :src="img" v-for="(img,index) in artitem.cover.images" :key="index"></van-image>
          </div>
          <span>{{artitem.aut_name}}</span>
          <span>{{artitem.comm_count}}评论</span>
          <span>{{artitem.pubdate}}</span>
        </div>
        <div v-if="artitem.cover.type < 3 && artitem.cover.type >= 1">
          <van-image :src="artitem.cover.images[0]" fit="cover"></van-image>
        </div>
      </van-cell>
   </div>
</template>

<script>
export default {
   name:'articleitem',
   data () {
      return {

      };
   },

   props: {
     artitem:{
       typef:Object,
       required:true
     }
   },

   created (){},

   mounted (){},

   components: {},

   computed: {},

   methods: {},

}
</script>
<style lang='scss' scoped>
.artitem-container{
  .van-cell{
    margin: 0;
    padding: 0;
    .van-image{
      width: 106px;
      height: 60px;
    }
    .label{
      span{
        margin-right: 6px;
      }
    }
    .van-cell__value{
      flex: unset;
      width: 106px;
      height: 60px;
    }
    .van-cell__title{
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .art-imgs{
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>