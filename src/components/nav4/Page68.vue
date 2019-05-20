<template>
 <div class="move">
  <button @click="submit">提交</button>
 </div>
</template>
<script>

  export default {
    data() {
      return {
        activeName: 'https://api.douban.com/v2/movie/in_theaters?'
      };
    },
    methods: {
	  submit() {
	   // 事件名字自定义，用不同的名字区别事件
	   this.$root.Bus.$emit('eventName', 123)
   }
 }
  }
</script>
<style>
	.el-tabs__content{
		display: none;
	}
</style>