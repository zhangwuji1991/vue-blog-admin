<template>
  <div>
   Clicked: {{ getCount }} times
   <button @click="foom"></button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
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
      'foom'
     ])
    }
  }

</script>