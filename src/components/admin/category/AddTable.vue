<template>
  <el-dialog
    :visible="show"
    title="添加类别"
    @close="$emit('update:show', false)"
  >
    <el-form label-width="80px">
      <el-form-item label="类别名称">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button type="primary" @click="submit(data)" style="width:100%"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      data: {
        name: ""
      }
    };
  },
  methods: {
    submit(form) {
      this.$axios
        .post("/roomtype", form)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.$emit("update");
          this.$emit("update:show", false);
        })
        .catch(err => {
          this.$message({
            message: err.data.title,
            type: "danger"
          });
        });
    }
  }
};
</script>
