<template>
    <div class="profile-container gary-bg">
        <!-- 个人信息 -->
        <div class="personinfo-content">
             <div v-if="user">
                <div class="personInfo marg-box">
                    <div class="reallyInfo">
                        <van-image class="img-icon" round :src="userI.photo" fit="cover"></van-image>
                        <div class="fif-fz rg">{{userI.intro}}</div>
                    </div>
                    <div class="reallyBtn">
                        <van-button round size="mini" class="ele-fz">编辑资料</van-button>
                    </div>
                </div>
                <van-grid :border="false">
                    <van-grid-item text="头条" >
                        <div slot="icon">{{userI.art_count}}</div>
                    </van-grid-item>
                    <van-grid-item text="关注" >
                        <div slot="icon">{{userI.follow_count}}</div>
                    </van-grid-item>
                    <van-grid-item text="粉丝" >
                        <div slot="icon">{{userI.fans_count}}</div>
                    </van-grid-item>
                    <van-grid-item text="获赞" >
                        <div slot="icon">{{userI.like_count}}</div>
                    </van-grid-item>
                </van-grid>
            </div> 
            <div class="notlogin-content" v-else @click="$router.push('/login')">
                <van-image class="img-icon" round src="https://img.yzcdn.cn/vant/cat.jpeg" fit="cover"></van-image>
                <div class="notlogin-text" >未登录</div>
            </div>
        </div>
        <!-- 收藏和历史 -->
        <van-cell class="marhis-content" :border="false">
            <div class="marhis">
                <van-icon name="star-o" class="mart-icon"></van-icon>
                <span>收藏</span>
            </div>
            <div class="marhis">
                <van-icon name="underway-o" class="history-icon"></van-icon>
                <span>历史</span>
            </div>
        </van-cell>
        <!-- 消息通知 -->
        <van-cell class="messages-content" :border="false" title="消息通知" is-link/>
        <!-- 小智同学 -->
        <van-cell class="messages-content" :border="false" title="小智同学" is-link/>
        <!-- 退出登录 -->
        <van-cell v-show="user" class="loginout messages-content" title="退出登录" @click="onLoginOut"></van-cell>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserDetail } from '../../api/user'
export default {
    name:'profile',
    data () {
        return {
            userI:'' //保存当前用户信息
        };
    },

    props: {},

    created (){
        console.log(this.user);
        this.onload()
    },

    mounted (){},

    components: {},

    computed: {
        ...mapState(['user'])        
    },

    methods: {
        // 获取用户信息
        async onload(){
            const {data} = await getUserDetail()
            console.log(data,'res');
            this.userI = data.data //存储信息至当前组件中
        },
        // 登录退出时的事件
        onLoginOut(){
            // 删除用户登录记录
            this.$dialog.confirm({
                title: '提示',
                message: '是否退出登录',
            })
            .then(() => {
                // on confirm、
                this.$store.commit('setUser',null)
            })
            .catch(() => {
                // on cancel
            });
        }
    }
}
</script>
<style lang='scss' scoped>
.profile-container{
    .personinfo-content{
        background: #3296fa;
        height: 216px;
        .personInfo{
            display: flex;
            align-items: center;
            padding-top: 15%;
            .reallyInfo{
                display: flex;
                flex: 1;
                align-items: center;
                .fif-fz{
                    margin-left: 10px;
                }            
            }
            .reallyBtn{
                margin: 0 5px;
                .van-button__text{
                    font-size: 11px;
                }
            }      
        }
        .van-grid{
            margin-top: 15px;
            .van-grid-item{
                /deep/.van-grid-item__content{
                    background: transparent;
                }
                /deep/.van-grid-item__icon-wrapper{
                    color: #fff;
                    font-size: 17px;
                }
                /deep/.van-grid-item__text{
                    color: #fff;
                    font-size: 17px;                   
                }
            }
        }
        .notlogin-content{
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            text-align: center;
            .notlogin-text{
                font-size: 17px;
                margin-top: 5px;
                color: #fff;
            }
        }
    }
    .marhis-content{
        /deep/.van-cell__value--alone{
            display: flex;
            .marhis{
                flex: 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                .history-icon{
                    color: #fcb580;
                }
                .mart-icon{
                    color: #e07d87;
                }
                .mart-icon,.history-icon{
                    font-size: 19px;
                }
            }
        }
    }
    .messages-content{
        margin-top: 5px;
        .van-cell__title{
            padding: 5px 0;
        }
    }
    .loginout{
        text-align: center;
        .van-cell__title{
            color: #eba7b8;
        }
    }
    /*图片icon*/
    .img-icon{
        width: 69px;
        height: 69px;
        box-sizing: border-box;
        box-shadow: 0 0 1px 1px rgba($color:#fff, $alpha: 0.9);
    }
}
</style>