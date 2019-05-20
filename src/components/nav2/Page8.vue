<template>
 <div class="move">
  <p @click="print">测试</p>
  <p>{{this.activeName}}</p>
 </div>
</template>
<script>

  export default {
    data() {
      return {
        activeName: ''
      };
    },
    created(){
	 this.$root.Bus.$on('eventName', value => {
	  this.print(value)
	 })
	},
 
	methods: {
	 print(value) {
	  console.log(value)
	  value=this.activeName 	 
	}
    }
  }
</script>
<style>
	.el-tabs__content{
		display: none;
	}
</style>