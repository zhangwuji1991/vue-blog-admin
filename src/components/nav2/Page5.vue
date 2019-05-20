<template>
 <div class="move">
   <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
     <el-tab-pane label="正在热映" name="https://api.douban.com/v2/movie/in_theaters?">正在热映</el-tab-pane>
     <el-tab-pane label="即将上映" name="https://api.douban.com/v2/movie/coming_soon?">即将上映</el-tab-pane>
     <el-tab-pane label="Top" name="https://api.douban.com/v2/movie/top250?">Top</el-tab-pane>
     <!-- <el-tab-pane label="搜索" name="fourth">搜索</el-tab-pane> -->
   </el-tabs>
  <Move :childmsg="activeName" ref="Moves"></Move>
 </div>
</template>
<script>
  import Move from '@/components/nav2/move.vue'	

  export default {
    data() {
      return {
        activeName: 'https://api.douban.com/v2/movie/in_theaters?'
      };
    },
    methods: {
      handleClick(tab, event) {
        var _this=this;
        _this.$refs.Moves.handleClick()
      }
    },
    components: {
      Move
    }
  }
</script>
<style>
	.el-tabs__content{
		display: none;
	}
</style>