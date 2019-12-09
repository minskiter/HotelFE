<template>
  <el-dialog :visible="show" title="添加会员" @close="close">
    <el-form label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="data.name"></el-input>
      </el-form-item>
      <el-form-item label="身份证号码">
        <el-input v-model="data.idcardnumber"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input-number v-model="data.age"></el-input-number>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="data.sex">
          <el-option label="男" :value="0"> </el-option>
          <el-option label="女" :value="1"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="data.phone"></el-input>
      </el-form-item>
      <el-form-item label="家庭地址">
        <el-input v-model="data.address"></el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button @click="submit(data)" type="primary" style="width:100%"
          >添加</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: "vip-table",
  data() {
    return {
      data: {
        name: "",
        idcardnumber: "",
        sex: 0,
        age: 20,
        address: "",
        phone: ""
      }
    };
  },
  methods: {
    submit(form) {
      this.$axios
        .post("/user", form)
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
    },
    close() {
      this.$emit("update:show", false);
    }
  },
  props: {
    show: {
      default: false,
      type: Boolean
    }
  }
};
</script>

<style></style>
