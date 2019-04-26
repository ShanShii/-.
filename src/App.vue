<template>
  <div id="app">
      <div id="nav">
        <router-link to="/">电商网站实例</router-link> |
        <router-link to="/Cart">购物车</router-link>
      </div>
      <div class="wrapper">
        <router-view/>
      </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  .wrapper {
    padding: 0 3rem;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    #nav {
      height: 50px;
      background-color: #eee;
      line-height: 50px;
    }
    a {
      text-decoration: none;
    }
  }
</style>
