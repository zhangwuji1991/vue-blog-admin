<template>
    <div>
    	<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
            <span>{{item.name}}</span>
        </li>
    </div>
</template>


<style lang="scss" scoped>
    .page-container {
        font-size: 20px;
        text-align: center;
        color: rgb(192, 204, 218);
    }
</style>