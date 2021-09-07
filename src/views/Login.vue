<template>
   <div class="login-container" >
   <!-- navbar导航按钮 -->
    <van-nav-bar
      title="登录/注册"
      left-arrow
      @click-left="onClickLeft"
      class="navbar-globle"
    />
    <!-- form表单 -->
    <van-form validate-first :show-error="false" :show-error-message="false" @submit="onlogin" @failed="onFailed" 
      ref="mobileRef">
      <van-field
        v-model="user.mobile"
        left-icon="smile-o"
        center
        :rules="formRules.mobile"
        placeholder="请输入手机号码"
        name="mobile"
      />
      <van-field
        v-model="user.code"
        left-icon="music-o"
        center
        :rules="formRules.code"
        placeholder="请输入短信验证码"
      > 
         <template #button>
            <div class="btnnochange">
              <van-count-down :time="time" format="ss s" v-if="isShowCutdown" @finish="isShowCutdown=!isShowCutdown"/>
              <van-button round size="mini" type="default" class="getCode" v-else @click.prevent="getCode" :loading="isLoading">获取验证码</van-button>
            </div>
         </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn">
        <van-button type="info" block>登录</van-button>
      </div>
    </van-form>
   </div>
</template>

<script>
import { getUserInfo,getSMSCode } from '../api/user.js'
export default {
    name:'login',
    data () {
        return {
          user:{
            mobile:'13911111111',
            code:'246810'
          },
          formRules:{
            mobile:[
              {required:'true',message:'请输入手机号',tigger:'onBlur'},
              {pattern:/^1\d{10}$/,message:'请输入合法的手机号',tigger:'onBlur'}
            ],
            code:[
              {required:'true',message:'请输入验证码',tigger:'onBlur'},
              {pattern:/^\d{6}$/,message:'请输入正确的验证码',tigger:'onBlur'}
            ]
          },
          time:5 * 1000 ,//倒计时时间
          isShowCutdown:false ,//控制倒计时控件的显示与否 
          isLoading:false ,//控制获取验证码的加载效果【防止多次点击】
        };
    },

    props: {},

    created (){},

    mounted (){},

    components: {},

    computed: {},

    methods: {
      //返回上一个路由事件
      onClickLeft(){
        this.$router.back()
      },
      //登录提交事件
      async onlogin(){
        //  console.log(1);
        // 进入申请qian
        this.$toast.loading({
          message: '加载中...',
          forbidClick: true,
          position:'top'
        });
        // 进入判断阶段
        try {
          const {data:res} = await getUserInfo({
            mobile:this.user.mobile,
            code:this.user.code
          })
          this.$toast.success({
            position:'top',
            message:'登录成功，请稍后'
          })          
          console.log(res.data);
          // 将用户的token信息存储至vuex中
          this.$store.commit('setUser',res.data)
          // localStorage.setItem('user',123)
          this.$router.back()
          console.log('登录成功后返回');
        } catch (err) {
          // console.dir(err);
          if( err.response.status === 400 ){
            this.$toast.fail({
              message:'手机号或验证码有误，请重新输入',
              position:'top'
            })
          }else if(err.response.status === 507 ){
            this.$toast.fail({
              message:'服务器异常，请稍后再试',
              position:'top'
            })
          }else {
            this.$toast.fail({
              message:'登录异常，请稍后重试',
              position:'top'
            })
          }
        }
      },
        //检校不通过事件  
      onFailed(err){
        // console.log(err.errors);
        // console.log(err.errors[0].message);
        if(err){
          this.$toast.fail({
            message:err.errors[0].message,
            position:'top'
          })
        }
      },
      // 获取验证码
      async getCode(){
        try {
          await this.$refs.mobileRef.validate('mobile')
          this.isLoading = true     
          const {data:res} = await getSMSCode(this.user.mobile)
          console.log(res); 
        } catch (error) {
          console.log(error);
          this.$toast.fail({
            message:error.message,
            position:'top'
          })
        }
        this.isLoading = false
      }
    }
}
</script>
<style lang='scss' scoped>
$top-main-fs:15px;
.login-container{
  .van-cell-group{
    /deep/.van-field__left-icon{
      margin-right: 10px;
    }
  }
  .login-btn{
    font-size: $top-main-fs;
    border:none;  
    margin: 8px 16px;
  }
  .btnnochange{
    display: flex;
    justify-content: center;    
    width: 68px;
    height: 29px;
    align-items: center;
  }
}
</style>