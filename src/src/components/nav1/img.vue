<template>
  <div class="img-list">
    <ul id="container">
      <li v-for="(img,index) in imgslist">
        <img v-lazy= urls+img.path.slice(1)+img.filename>
        <p v-on:click="del(img)">删除</p>
      </li>
    </ul>
  </div>
<!--   <waterfall :line-gap="200" :watch="imgslist">
  <waterfall-slot
    v-for="(item, index) in imgslist"
    :width="400"
    :height="200"
    :order="index"
    :key=""
    >
    <img v-lazy= urls+item.path.slice(1)+item.filename>
  </waterfall-slot>
</waterfall> -->
</template>

<script>
	// import 'font-awesome/css/default.css'

	import { imgs,delimg } from '@/api/api'
	import Waterfall from 'vue-waterfall/lib/waterfall'
    import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

	export default {
		data() {
			return {
				urls: "http://localhost:8888",
				imgslist: []
			}
		},
		methods: {
			getUser: function () {
				this.loading = true;		
                imgs().then((res) => {
                	console.log(res.data)
					this.imgslist = res.data;
					this.loading = false;						
				});
			},
			del: function (img){
				// this.delimg.imgs = img.filename;
				let para = { name: img.filename };
				console.log(para)
				this.$confirm('确认删除吗？', '提示', {}).then(() => {
							
		            delimg(para).then((res) => {
		            	console.log(res)
		            	if (res.code==0) {
		            	   this.$message({
							 message: res.message,
							 type: 'success'
						   });
						    this.getUser()
		            	}else{
		            	   this.$message({
							 message: res.message,
							 type: 'error'
						   });
		            	}											
					});
			    });
			}
		},
		mounted() {
		  this.getUser()
		},
		components: {
		  Waterfall,
		  WaterfallSlot
		}
	}
</script>
<style lang="scss" scoped>
 ul{
 	display: flex;
 	flex-wrap: wrap;
 	li{
 		list-style: none;
 		img{
 			width: 300px;
 			height: 300px;
 			margin-left: 30px;
 			margin-top: 15px;
 		}
 		p{
 			text-align: center;
 			cursor: pointer;
 		}
 	}
 }
</style>
