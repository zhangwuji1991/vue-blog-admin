<template>
  <div>
  <div class="img-list">
    <ul id="container">
      <li v-for="(img,index) in imgslist">
        <img id="myphoto" v-on:click="myphotos()" rel="1" v-lazy= urls+img.path.slice(1)+img.filename>
        <p v-on:click="del(img)">删除</p>
      </li>
    </ul>
  </div>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">
        <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
        <div class="pswp__container">
            <!-- don't modify these 3 pswp__item elements, data is added later on -->
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
        </div>
        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
            <div class="pswp__top-bar">
                <!--  Controls are self-explanatory. Order can be changed. -->
                <div class="pswp__counter"></div>
                <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                <button class="pswp__button pswp__button--share" title="Share"></button>

                <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                <div class="pswp__share-tooltip"></div> 
            </div>
            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
            <div class="pswp__caption">
                <div class="pswp__caption__center"></div>
            </div>
          </div>
        </div>
</div>
</div>
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
			},
			openPhotoSwipe: function (){
				    var pswpElement = document.querySelectorAll('.pswp')[0];
                    // build items array
				    var items = [
				        {
				            src: 'http://localhost:8888/public/bzimg/1517385228355.jpg',
				            w: 950,
				            h: 534,
				            title: '特斯拉Semi卡车亮相：2019年生产'
				        },
				        {
				            src: 'http://localhost:8888/public/bzimg/1517385228355.jpg',
				            w: 800,
				            h: 500,
				            title: '12月3日，第四届世界互联网大会在浙江乌镇开幕。本届大会主题为“发展数字经济 促进开放共享——携手共建网络空间命运共同体”。'
				        },
				        {
				            src: 'http://localhost:8888/public/bzimg/1517385228355.jpg',
				            w: 516,
				            h: 712,
				            title: '阿里巴巴菜鸟网络的无人机群组，满载湄洲岛居民下单的六箱货品，仅耗时9分钟就成功飞越海峡，为农村淘宝提供物流服务。'
				        },
				        {
				            src: 'http://localhost:8888/public/bzimg/1517385228355.jpg',
				            w: 857,
				            h: 1200,
				            title: '长风破浪会有时'
				        }
				    ];   
				    // define options (if needed)
				    var options = {
				        loop: false,
				        closeOnScroll: false, 
				             // history & focus options are disabled on CodePen        
				        history: true,
				        focus: true,
				        showAnimationDuration: 0,
				        hideAnimationDuration: 0				        
				    };    
				    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
				    gallery.init();
			},
			myphotos: function (){
				var myphoto = document.getElementById('myphoto');
				var p_id = myphoto.getAttribute('rel');
                this.openPhotoSwipe(p_id);
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
