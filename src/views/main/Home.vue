<template>
    <div class="home-container">
        <!-- 顶部标签 -->
        <van-nav-bar>
            <div slot="title" class="btn">
                <van-button round :border="false" size="small" icon="search" text="搜索" />
            </div>
        </van-nav-bar>
        <!-- 横向导航栏 -->
        <van-tabs :active="active" animated swipeable>
            <van-tab v-for="(channel,index) in (user?userChannel:allChannel)" :title="channel.name" :key="index"> 
                <!-- 频道列表 -->              
                <article-list :channel="channel"></article-list>
            </van-tab>
        </van-tabs>
        <!-- 吐司块 -->
        <div class="tusi">
            <van-icon name="wap-nav"></van-icon>
        </div>
    </div>
</template>

<script>
import {getUserChannels,getAllChannels} from '../../api/channels'
import articleList from '../../components/articlels/Articlelist.vue'
import {mapState} from 'vuex'
export default {
    name:'profile',
    data () {
        return {
            active:0 ,//激活的标签
            userChannel:'' ,//用户频道
            allChannel:'' //所有频道
        };
    },

    props: {},

    created (){
        this.onloading()
    },

    mounted (){},

    components: {
        articleList //文章列表
    },

    computed: {
        ...mapState(['user'])
    },

    methods: {
        // 创建加载调用
        async onloading (){
            try {
                const {data:ucres} = await getAllChannels()
                console.log(ucres,'所有的频道');
                this.allChannel = ucres.data.channels
                const {data:acres} = await getUserChannels()
                console.log(acres);
                this.userChannel = acres.data.channels
            } catch (error) {
                this.$toast.fail({
                    message:'请求错误，请稍候再试' 
                })
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.home-container{
    .van-nav-bar{
        background: #3296fa;
        .btn  {
            color: #fff;
            .van-icon-search::before{
                font-size: 14px;
                color: #fff;
                vertical-align: top;
            }
            .van-button--default{
                width: 218px;
                background: #52a8ff;
                color: #fff;
                border:none;
            }
        }
    }
    /deep/.van-tabs__nav{
        margin-right: 24px;
    }
    .tusi{
        position: absolute;
        top: 46px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 0;
        width: 30px;
        background: #fff;
        opacity: 0.75;
    }
}
</style>