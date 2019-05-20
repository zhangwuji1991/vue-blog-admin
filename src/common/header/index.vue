<template>
	<el-col :span="24" class="header" :style="{'background-color':checkcolor}">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?lgos:sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <!-- 切换主题颜色 -->
 <!--        <el-dropdown> 
          <div class="btn-fullscreen" @click="handleFullScreen">
               <el-tooltip effect="dark" :content="fullscreen ? `取消全屏`:`全屏`" placement="bottom">
                  <i class="el-icon-rank"></i>
               </el-tooltip>
          </div>
        </el-dropdown> -->
        <!-- 切换主题颜色 -->
        <el-dropdown> 
          <el-color-picker v-model= checkcolor @change="changecolor" size="medium"></el-color-picker>
        </el-dropdown>
        <!-- 切换主题颜色 -->
        <el-dropdown trigger="hover" >
          <span class="el-dropdown-link userinfo-inner">
            <img :src="'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1557983835&di=3a18118d62da02ced294300c5c49caac&src=http://img1.qq.com/book/20051028/2548359.jpg'" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/page6')">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/page8')">设置</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
</template>

<script>
  export default {
  	props:['collapsed','checkcolor'],
    data() {
      return {
        sysName:'后台管理',
        lgos:'',
        color1:'',
        fullscreen:false,
        user: []
      }
    },
    created() {
      // 告诉外部组件
    },
    methods: {
      //退出登录
      logout: function () {
        var _this = this;
        this.$confirm('确认退出吗?', '提示', {
          //type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      //折叠导航栏
      collapse:function(){
        this.$emit('collapse');
      },
      changecolor: function(event){
        console.log(event)
         this.$emit('changeparentcolor', event)
      },
      handleFullScreen(){
                let element = document.documentElement;
                if (this.fullscreen) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                } else {
                    if (element.requestFullscreen) {
                        element.requestFullscreen();
                    } else if (element.webkitRequestFullScreen) {
                        element.webkitRequestFullScreen();
                    } else if (element.mozRequestFullScreen) {
                        element.mozRequestFullScreen();
                    } else if (element.msRequestFullscreen) {
                        // IE11
                        element.msRequestFullscreen();
                    }
                }
                this.fullscreen = !this.fullscreen;
            },
    },
    mounted() {
      
      // var user = sessionStorage.getItem('user');
      // if (user) {
      //   user = JSON.parse(user);
      //   this.user = user || '';
      //   console.log(this.user.username)
      // }

    }
  }
</script>


<style lang="scss" scoped>
    .header {
      height: 60px;
      line-height: 60px;
      background: #21EAB4;
      color:#fff;
      display: table-cell;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        vertical-align: middle;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin-left:10px;
            margin-top: 10px;
            float: right;
          }
        }
        .btn-fullscreen{
          /*border: 1px solid red;*/
          width:30px;
          height:60px;
          font-size: 24px;
          line-height: 60px;
          color:red;
 
        }
      }
      .logo {
        width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
</style>