<template>
  <div id="app">
    <keep-alive
      exclude="Home,Login,ULogin,UHome,Register,UpdateInfo,updatePassword"
    >
      <!-- isRouterAlive 实现局部刷新的变量 -->
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // 控制局部刷新的变量
      isRouterAlive: true
    };
  },
  mounted() {
    //增加监听刷新事件
    // 第二个参数是一个方法
    window.addEventListener("unload", this.saveState);
  },
  //实现页面的局部刷新
  // 简单的来说就是在父组件中通过provide来提供变量，然后在子组件中通过inject来注入变量
  provide() {
    return {
      //一个对象，值是下方的方法
      reload: this.reload
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      // 延时调用用v-if达到局部刷新的效果
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    },
    //  监听页面是否刷新，如果页面刷新了，将state对象存入到sessionStorage中，页面打开之后，
    //  判断sessionStorage中是否存在state对象，
    //  如果存在，则说明页面是被刷新过，
    //  将sessionStorage中存的数据取出来给vuex中的state赋值。
    //  如果不存在，说明时第一次打开，则取vuex中的state初始值
    // 第二个参数为JSON字符串
    saveState() {
      sessionStorage.setItem("state", JSON.stringify(this.$store.state));
    }
  }
};
</script>

<style scoped>
html{
  height: 100%;
}
body{
  height: 100%;
}
#app{
  height: 100%;
}
</style>
