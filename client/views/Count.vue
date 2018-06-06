<template>
  <div>
    <h1>this is count page</h1>
    <hr>
    <p>hello, my name is ye</p>
    <p>
      <button @click="plus(1)">+</button>
    </p>
    <p>
      {{count}}
    </p>
    <p>{{count100}}</p>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'

  export default {
    name: 'count',
    computed: {
      ...mapState(['count']),
      ...mapGetters['count100']
    },
    methods: {
      ...mapMutations(['plus', 'minus']),
      ...mapActions(['plusAction', 'minusAction'])
    },
    asyncData ({store}) {
      return new Promise(resolve => {
        setTimeout(() => {
        }, 1000)
      })
    }
  }
</script>

<style scoped>
  h1 {
    color:darkred;
  }
  p {
    color: green;
  }
</style>