<template>
  <div>
    <el-table :data="data">
      <el-table-column label="客房类型" prop="type.name"> </el-table-column>
      <el-table-column label="客房设备" prop="device"></el-table-column>
      <el-table-column label="推荐指数" prop="rate"></el-table-column>
      <el-table-column label="每日租金（元）" prop="price"></el-table-column>
      <el-table-column label="当前剩余" prop="rest"></el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn">
      <el-button type="primary" @click="show = true" style="width:100%"
        >添加客房</el-button
      >
    </div>
    <add-table :show.sync="show" @update="init"></add-table>
  </div>
</template>

<script>
import AddTable from "@/components/admin/room/AddTable.vue";
export default {
  components: {
    AddTable
  },
  data() {
    return {
      data: [
        {
          name: "",
          roomid: "",
          type: {
            name: ""
          },
          device: "",
          rate: "",
          price: 0,
          rest: 0
        }
      ],
      show: false
    };
  },
  methods: {
    init() {
      this.$axios.get("/room/list").then(res => {
        this.data = [];
        res.data.data.forEach(element => {
          this.data.push(element);
        });
      });
    },
    remove(item) {
      this.$axios
        .delete("/room?roomid=" + item.roomid)
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
        });
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 10px 0;
  width: 100%;
}
</style>
