<template>
 <div class="move"  >
   <ul class="list-group">
            <li class="list-group-item" v-for="(item,index) in jsondata.subjects">
                
                <div class="media-left">
                    <router-link :to="{path:'/detail/'+item.id}">
                        <img class="media-object" :src="item.images.small" alt="">
                    </router-link>
                </div>
                <div class="media-body">
                  <span class="badge">{{item.rating.average}}</span>
                    <h3 class="media-heading">{{item.title}}</h3>
                    <p>
                        <span>类型：</span><span>{{item.genres.join('、')}}</span>
                    </p>
                    <p>
                        <span>导演：</span> <span v-for="(val,index) in item.casts">{{val.name + (index==item.casts.length-1?'':'、')}}</span>
                    </p>
                </div>
            </li>
        </ul>
 </div>
</template>
<script>
  import {movies} from '@/api/api';
  export default {
    props: {
       childmsg: '' //这样可以指定传入的类型，如果类型不对，会警告
    },
    data() {
      return {
        jsondata: []
      };
    },
    methods: {
        handleClick(tab, event) {
          let para = { 
            count: 10,
            start: 20
          };
           this.$jsonp(this.childmsg,para).then(json => {
  // 　　     console.log(json.subjects)
           this.jsondata = json;
           console.log(this.jsondata)
           }).catch(err => {
        　　console.log(err)
        }) 
      }
    },
    created() {
      this.$nextTick(function () {
        this.$on('handleClick', function () {
          console.log('监听成功')
        })
      })
      this.handleClick()
    }
  }
</script>
<style>
  .el-tabs__content{
    display: none;
  }
  li{
    list-style-type: none;
  }
  .list-group-item{
    position: relative;
    display: block;
    padding: 10px 15px;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid #ddd;
    width: 60%;
  }
  .badge{
        display: inline-block;
    min-width: 10px;
    padding: 3px 7px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    background-color: #777;
    border-radius: 10px;
  }
  .media-body{
    /*float: right;*/
  }
</style>