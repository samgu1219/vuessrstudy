<template>
  <div id="footer">
    <span>Written by {{this.author}}</span>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        author: 'Gudp'
      }
    }
  }
</script>

<style scoped lang="stylus">
  #footer{
    margin-top 40px
    text-align center
    color: #bfbfbf;
    font-size: 10px;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  }
</style>