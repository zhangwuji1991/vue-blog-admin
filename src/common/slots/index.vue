<template>
	<el-col :span="24" class="breadcrumb-container">
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
</template>

<style scoped lang="scss">
	.breadcrumb-container {
     background-color: white;
     height: 50px;
     line-height: 50px;
   	 margin-left: 20px;
     position: fixed;
     z-index: 10;
      .el-breadcrumb{
      	line-height: 3;
      }
      .breadcrumb-inner {
		line-height: 3;
      }
    }
</style>>
