<template>
  <div>
  <router-link to="/moments">进入我的朋友圈</router-link>
   <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="外卖">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <!-- <img slot="icon" src="../assets/logo.png"> -->
        我的
      </mt-tab-item>
    </mt-tabbar>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      selected: '外卖'
    };
  },
};
</script>

<style scoped>
.page-tabbar {
    overflow: hidden;
    height: 100vh;
  }
 
.page-wrap {
    overflow: auto;
    height: 100%;
    padding-bottom: 100px;
  }

</style>
