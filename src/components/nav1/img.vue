<template>
  <div class="img-list">
    <ul id="container">
      <li v-for="(img,index) in this.imgslist">
        <img v-lazy= urls+img.path.slice(1)+img.filename>
      </li>
    </ul>
  </div>
</template>

<script>
	import { imgs } from '@/api/api';
	export default {
		data() {
			return {
				urls: "http://localhost:8888",
				imgslist: [],
			}
		},
		methods: {
			getUser: function () {
				this.loading = true;		
                imgs().then((res) => {
					this.imgslist = res.data;
					this.loading = false;						
				});
			}
		},
		mounted() {
		  this.getUser()
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
 			width: 400px;
 			height: 400px;
 			margin-left: 30px;
 			margin-top: 15px;  
 		}
 	}
 }
</style>
