<template>
  <div>
    <h1>this is hello page</h1>
    <hr>
    <p>my name is gudongping.</p>
    <p>{{count}}</p>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    mounted () {
      // this.$store.dispatch('getDataAction', {data: '333', msg: 'world'})
    },
    asyncData ({store}) {
      return new Promise(resolve => {
        setTimeout(() => {
          // store.dispatch('getDataAction', {data: '222', msg: 'hello'})
          resolve()
        }, 1000)
      })
    },
    computed: {
      ...mapState(['count'])
    }
  }
</script>

<style scoped>
  h1 {
    color:deeppink;
  }
  p {
    color:deepskyblue;
  }
</style>