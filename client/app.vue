<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <p class="center">
      <router-link to="/">TODO</router-link>
      <router-link to="/hi">Hi</router-link>
      <router-link to="/count">Count</router-link>
    </p>
    <hr>
    <p class="center">
      <router-view></router-view>
    </p>
    <notification content="test notify"></notification>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './layout/Head'
  import Footer from './layout/Footer'
  export default {
    metaInfo: {
      title: "Gudp's todo app",
      link: [
        { rel: 'favicon', href: 'public/favicon.ico' }
      ]
    },
    data () {
      return {
      }
    },
    components: {
      Header,
      Footer
    }
  }
</script>

<style scoped lang="stylus">
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .9
    z-index -1
  }
  .center
    text-align center
</style>