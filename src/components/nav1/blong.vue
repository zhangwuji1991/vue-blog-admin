<template>
  <div>
    <h1>vuex 测试</h1>
    Clicked: {{ getCount }} times
    <input type="file" ref="imgs">
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <br>
    <button @click="up">上传图片</button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  import { getbzs ,addbzs} from '@/api/api';


  export default {
    computed: {
  	// 使用对象展开运算符将 getters 混入 computed 对象中
    ...mapGetters([
      'getCount'
      // ...
    ])
    },
    methods: {
      ...mapActions([
        'increment', // 映射 this.increment() 为 this.$store.dispatch('increment')
        'decrement'
      ])
        //...mapActions({
        //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
        //})
      ,
      up() {
          let deviceFile  = this.$refs.imgs.files[0]; //获取input的图片file值
          let formData = new FormData(); // 创建form对象
          // for(let i=0;i<deviceFile.length;i++){
          //     formData.append('file', deviceFile[i]);
          //   }
          addbzs(deviceFile).then((res) => {
                console.log(res)
              });
        },
      }
    }

</script>