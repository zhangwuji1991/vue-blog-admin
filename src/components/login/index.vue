<template>
  <div class="login">
    <div class="videos_res">
      <video preload="metadata" autoplay loop >
            <source src="https://t.alipayobjects.com/images/T1T78eXapfXXXXXXXX.mp4" type="video/mp4">
      </video>
    </div>
    <div style="height: 260px;"></div>
    <div style="z-index: 2000;">
      <el-form :model="dl" :rules="rules2" ref="dl" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">昨夜星辰昨夜风</h3>
        <el-form-item prop="username">
          <el-input type="text" v-model="dl.username" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="dl.password" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="logins" :loading="logining">登录</el-button>
        </el-form-item>
      </el-form>
    </div>  
  </div>
</template>
<script>
import { requestLogin } from '@/api/api';
export default {
  data () {
    return {
      logining: false,
      checked: true,
      dl: {
        username: '',
        password: ''
      },
      rules2: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
    }
  },
  methods: {
    logins() {
      var _this = this;
        this.$refs.dl.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.dl.username, password: this.dl.password };
            requestLogin(loginParams).then(data => {
              let { message, code, userInfo } = data;
              if (code !== 0) {
                this.$message({
                  message: data.message,
                  type: 'error'
                });
                this.logining = false; 
              } else {
                sessionStorage.setItem('user', JSON.stringify(userInfo));
                // 成功之后跳转页面
                setTimeout(() => {
                  this.$router.push({ path: '/home' });
                },500)
              }
            }).catch((error)=> {
              this.$message({
                  message: "网络链接失败",
                  type: 'error'
                });
              this.logining = false; 
            });
          } else {
            return false;
          }
        });
    }
  }
}
</script>
<style lang="scss" scoped>
  .login{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .login-container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      margin: 0 auto;
      width: 350px;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;      
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .remember {
        margin: 0px 0px 35px 0px;
      }
    }
  }
  video{
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 100% 100%; 
    display: inline-block ;
    position: absolute;
    z-index: -1;
  }
</style>
