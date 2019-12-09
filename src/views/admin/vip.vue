<template>
  <div>
    <el-table :data="data">
      <el-table-column label="会员ID" prop="userid"> </el-table-column>
      <el-table-column label="会员真实姓名" prop="name"></el-table-column>
      <el-table-column label="身份证号码" prop="idcardnumber"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">
          <span>{{ scope.row.sex == 0 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="联系方式" prop="phone"></el-table-column>
      <el-table-column label="家庭住址" prop="address"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button type="danger" style="width:100%" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn">
      <el-button @click="show = true" type="primary" style="width:100%"
        >添加会员</el-button
      >
    </div>
    <add-dialog :show.sync="show" @update="init"></add-dialog>
  </div>
</template>

<script>
import AddDialog from "@/components/admin/vip/AddTable.vue";
export default {
  data() {
    return {
      data: [
        {
          userid: "loading",
          name: "loading",
          idcardnumber: "loading",
          sex: 0,
          age: 0,
          phone: 111111111,
          address: "loading"
        }
      ],
      show: false
    };
  },
  components: {
    AddDialog
  },
  methods: {
    init() {
      this.$axios.get("/user/list").then(res => {
        this.data = [];
        res.data.data.forEach(element => {
          this.data.push(element);
        });
      });
    },
    remove(item) {
      this.$axios
        .delete("/user?userid=" + item.userid)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.init();
        })
        .catch(err => {
          this.$message({
            message: err.data.title,
            type: "danger"
          });
          this.init();
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style></style>
