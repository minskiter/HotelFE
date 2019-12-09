<template>
  <el-container>
    <el-header>
      <div class="icon"></div>
      <h3 class="header">宾馆客房管理系统</h3>
    </el-header>
    <el-main>
      <el-tabs type="border-card">
        <el-tab-pane label="入住管理" name="accommodation">
          <router-view></router-view>
        </el-tab-pane>
        <el-tab-pane label="客房管理" name="room">
          <router-view name="room"></router-view>
        </el-tab-pane>
        <el-tab-pane label="客房类别管理" name="category">
          <router-view name="category"></router-view>
        </el-tab-pane>
        <el-tab-pane label="会员管理" name="vip">
          <router-view name="vip"></router-view>
        </el-tab-pane>
        <el-tab-pane label="订房信息管理" name="order">
          <router-view name="order"></router-view>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
export default {
  mounted() {}
};
</script>

<style lang="scss" scoped>
header {
  color: #fff;
}
</style>
