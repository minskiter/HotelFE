<template>
  <div class="login-box">
    <el-card>
      <h3 class="title">宾馆客房管理系统</h3>
      <el-form>
        <el-form-item>
          <el-input>
            <template slot="prepend">用户名</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password">
            <template slot="prepend">密码&nbsp;&nbsp;</template>
          </el-input>
        </el-form-item>
        <el-form-item class="login">
          <el-button round class="button">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  height: 80vh;
  .title {
    color: #909399;
  }

  .el-card {
    height: 280px;
    min-width: 360px;
    max-width: 540px;
    width: 50%;
    .login {
      .button {
        width: 80%;
        margin-left: 10%;
      }
    }
  }
}
</style>
