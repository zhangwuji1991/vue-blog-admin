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
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<template>
			<el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" >
				</el-table-column>
				<el-table-column prop="_id" label="id"  sortable>
				</el-table-column>
				<el-table-column prop="username" label="用户名"   sortable>
				</el-table-column>
				<el-table-column prop="password" label="密码"  sortable>
				</el-table-column>
				<el-table-column prop="headImg" label="头像"  sortable>
				</el-table-column>
				<el-table-column prop="registerDate" :formatter="dateFormat"   label="注册时间"  sortable>
				</el-table-column>
				<el-table-column prop="isAdmin" label="是否为管理员" min-width="180" :formatter="formatAdmin" sortable>
				</el-table-column>
				<el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
			</el-table>
			<el-pagination layout="prev, pager, next" :total=this.total :page-size=this.pages @current-change="handleCurrentChange"></el-pagination>
			<!--编辑界面-->
			<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
				<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
					<el-form-item label="id" prop="_id">
						<el-input v-model="editForm._id" :disabled="true"> auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="姓名" prop="username">
						<el-input v-model="editForm.username" :disabled="true"> auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input v-model="editForm.password" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="管理员">
						<el-radio-group v-model="editForm.isAdmin">
							<el-radio class="radio" :label="true">是</el-radio>
							<el-radio class="radio" :label="false">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="editFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
				</div>
			</el-dialog>

			<!-- 新增页面 -->
			<el-dialog title="新增用户" v-model="addFormVisible" :close-on-click-modal="false">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="用户名" prop="username">
						<el-input v-model="addForm.username" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="管理员">
						<el-radio-group v-model="addForm.isAdmin">
							<el-radio class="radio" :label="true">是</el-radio>
							<el-radio class="radio" :label="false">否</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="密码"  prop="password">
						<el-input v-model="addForm.password" auto-complete="off"></el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click.native="addFormVisible = false">取消</el-button>
					<el-button type="primary" @click.native="addSubmit" :loading="addLoading" :disabled=this.addbutton>提交</el-button>
				</div>
			</el-dialog>
		</template>	
	</section>
</template>
<script>
	import { getusers,editusers,Delusers,Addusers} from '@/api/api';
	import NProgress from 'nprogress';
	import Moment  from 'moment'
	export default {
		filters: {
		   data:function (input) {
		       var d = new Date(input);
		       var year = d.getFullYear();
		       var month = d.getMonth() + 1;
		       var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
		       var hour = d.getHours();
		       var minutes = d.getMinutes();
		       var seconds = d.getSeconds();
		       return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
		   }
		},   
		data() {
			return {
				filters: {
					name: ''
				},
				loading: false,
				users: [],
				total: 0,
				page: 1,
				pages: 5,   //每页显示条数
				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				addbutton:false,//提交按钮
				//编辑界面数据
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				editForm: {
					_id: 0,
					username: '',
				},
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					username: [
						{ required: true, message: '请输入用户名', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					isAdmin:false
				}
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
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row._id };
					// console.log(para)
					Delusers(para).then((res) => {
						console.log(res)
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUser();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					console.log(valid)
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							NProgress.start();
							let para = Object.assign({}, this.editForm);
							// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							// console.log(para)
							editusers(para).then((res) => {
								this.editLoading = false;
								// console.log(res)
								//NProgress.done();
								this.$message({
									message: res.message,
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUser();
							});
						});
					}
				});
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					username:'',
					isAdmin:false,
					password:''
				};
			},
			//新增
			//时间格式化  
            dateFormat: function(row, column) {  
              var date = row[column.property];  
	          if (date == undefined) {  
	             return "";  
	          }  
	          return Moment(date).format("YYYY-MM-DD HH:mm:ss");  
	        },  
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							// para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							Addusers(para).then((res) => {
								console.log(res)
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: res.message,
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUser();
							});
						});
					}
				});
			},
			//获取用户列表
			getUser: function () {
				let para = {
					username: this.filters.name,
					page:     this.page,
					pages:    this.pages
				};
				this.loading = true;
				NProgress.start();
				setTimeout(() => {
	                 getusers(para).then((res) => {
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