<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUser">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" width="60">
				</el-table-column>
				<el-table-column prop="_id" label="id" width="120" sortable>
				</el-table-column>
				<el-table-column prop="username" label="用户名" width="100"  sortable>
				</el-table-column>
				<el-table-column prop="password" label="密码" width="100" sortable>
				</el-table-column>
				<el-table-column prop="headImg" label="头像" width="120" sortable>
				</el-table-column>
				<el-table-column prop="birth" label="注册时间" width="120" sortable>
				</el-table-column>
				<el-table-column prop="isAdmin" label="是否为管理员" min-width="180">
				</el-table-column>
			</el-table>
		</template>

	</section>
</template>
<script>
	import { getusers } from '@/api/api';
	import NProgress from 'nprogress'
	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: []
			}
		},
		methods: {
			//性别显示转换
			// formatSex: function (row, column) {
			// 	return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			// },
			//获取用户列表
			getUser: function () {
				console.log(1)
				let para = {
					username: this.filters.name
				};
				this.loading = true;
				console.log(para)
				NProgress.start();
				setTimeout(() => {
	                 getusers(para).then((res) => {
						console.log(res.data)
						this.users = res.data;
						this.loading = false;
						NProgress.done();
					});
                },300)				
			}
		},
		mounted() {
			this.getUser();
		}
	};
</script>