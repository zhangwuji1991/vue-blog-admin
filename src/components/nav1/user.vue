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
				<el-table-column prop="isAdmin" label="是否为管理员" min-width="180" :formatter="formatAdmin" sortable>
				</el-table-column>
				
			</el-table>
			<el-pagination layout="prev, pager, next" :total=this.total :page-size=this.pages @current-change="handleCurrentChange"></el-pagination>

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
				users: [],
				total: 0,
				page: 1,
				pages: 8   //每页显示条数
			}
		},
		methods: {
			//管理员显示转换
			formatAdmin: function (row, column) {
				return row.isAdmin == true ? '是' : row.isAdmin == false ? '否' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUser();
			},
			//获取用户列表
			getUser: function () {
				console.log(1)
				let para = {
					username: this.filters.name,
					page:     this.page,
					pages:    this.pages
				};
				this.loading = true;
				NProgress.start();
				setTimeout(() => {
	                 getusers(para).then((res) => {
						console.log(res)
						this.users = res.data;
						this.total = res.lengths;
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