<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="城市"></el-input>
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
			<el-table :data="bz" highlight-current-row v-loading="loading" style="width: 100%;">
				<el-table-column type="index" >
				</el-table-column>
				<el-table-column prop="_id" label="id"  >
				</el-table-column>
				<el-table-column prop="city" label="城市"   >
				</el-table-column>
				<el-table-column prop="content" label="独白"  >
				</el-table-column>
				<el-table-column prop="bzImg"  label="壁纸">		
				</el-table-column>
				<el-table-column prop="addTime" :formatter="dateFormat"   label="发表时间"  sortable>
				</el-table-column>
				<!-- <el-table-column label="操作" width="150">
				<template scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template> -->
			    <!-- </el-table-column> -->
			</el-table>
			<!-- 分页 -->
			<el-pagination layout="prev, pager, next" :total=this.total :page-size=this.pages @current-change="handleCurrentChange"></el-pagination>
			<!-- 新增页面 -->
			<el-dialog title="新增壁纸" v-model="addFormVisible" :close-on-click-modal="false">
				<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
					<el-form-item label="城市" prop="city">
						<el-input v-model="addForm.city" disabled="disabled" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="独白"  prop="content">
						<el-input v-model="addForm.content" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="壁纸">
						<el-upload
						  class="avatar-uploader"
						  name="avatar"
						  action="http://localhost:8888/vue/bzadd"
						  :show-file-list="true"
						  
						  :on-success="handleAvatarSuccess"
						  :on-preview="bzadds"
						  :before-upload="beforeAvatarUpload">
						  <img v-if="imageUrl" :src="imageUrl" class="avatar">
						  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>
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
	import { getbzs ,addbzs} from '@/api/api';
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
				imageUrl: '',
				loading: false,
				bz: [],
				total: 0,
				page: 1,
				pages: 5,   //每页显示条数
				addbutton:false,//提交按钮
				addFormVisible: false,//新增界面是否显示
				isdata:false,//添加时是否有数据
				addLoading: false,
				addFormRules: {
					username: [
						{ required: true, message: '', trigger: 'blur' }
					],
					content: [
						{ required: true, message: '不能为空', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					imgurl:''
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
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				var city = remote_ip_info['city'];
                this.addForm.city = city + '市'
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
	        //添加壁纸
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.isdata = true;
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addbzs(para).then((res) => {
								console.log(res)
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: res.message,
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								 this.imageUrl=''
								this.getUser();
							});
						});
					}
				});
			},
			//壁纸
			onSubmit() {
				console.log('submit!');
			},
			handleAvatarSuccess(res, file,response) {
				console.log(URL.createObjectURL(file.raw))
		        this.imageUrl = URL.createObjectURL(file.raw);
		        console.log(file.response.data)//获得上传后的照片
		        this.addForm.imgurl = file.response.data
		    },
			beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;
		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
			},
			bzadds(file) {
				alert('a')
				console.log(file.response)
			},
			//获取用户列表
			getUser: function () {
				let para = {
					city: this.filters.name,
					page:     this.page,
					pages:    this.pages
				};

				this.loading = true;
				NProgress.start();
                getbzs(para).then((res) => {
					this.bz = res.data;
					this.total = res.lengths;
					this.loading = false;
					NProgress.done();
				});			
			}
		},
		mounted() {
			this.getUser();
		}
	};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
   
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>