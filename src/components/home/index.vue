<template>
  <el-row class="container">
    <Header :collapsed="collapsed" @collapse="collapse" :checkcolor="checkcolor" v-on:changeparentcolor="parentcolor"></Header>
    <el-col :span="24" class="main">
      <Aside :collapsed="collapsed" :checkcolor="checkcolor"></Aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <Slot/>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
  import Header from '@/common/header'
  import Aside  from '@/common/aside'
  import Slot  from '@/common/slots'
  export default {
    data() {
      return {
        collapsed:false,
        sysUserAvatar: '',
        checkcolor:'#20a0ff',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    created() {
      let checkcolors = sessionStorage.getItem('checkcolor');
      if(checkcolors){
        this.checkcolor = checkcolors
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      //折叠导航栏
      collapse:function(){
        this.collapsed=!this.collapsed;
      },
      parentcolor(event) {
        this.checkcolor = event
        sessionStorage.setItem('checkcolor', event);
      }
    },
    components:{
      Header,
      Aside,
      Slot
    }
  }
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      .content-container {
        /*// background: #f1f2f7;*/
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        /*padding: 20px;*/
        /*.breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }*/
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
          padding-top: 50px;
          padding-left:20px;
        }
      }
    }
  }
</style>


