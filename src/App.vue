<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/" class="route">电商网站实例</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/Cart" class="route">购物车</router-link>
      </el-menu-item>
    </el-menu>
    <div class="wrapper">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      activeIndex: '1',
    }
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
}
.wrapper {
  padding: 0 3rem;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .route {
    display: block;
    width: 100%;
    height: 100%;
  }
  a {
    text-decoration: none;
  }
}
</style>
