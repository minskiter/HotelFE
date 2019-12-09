<template>
  <div>
    <el-table :data="data">
      <el-table-column label="类别名称" prop="name"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button @click="remove(scope.row)" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn">
      <el-button @click="show = true" type="primary" style="width:100%;">
        添加新类别
      </el-button>
    </div>
    <add-table :show.sync="show" @update="init"></add-table>
  </div>
</template>

<script>
import AddTable from "@/components/admin/category/AddTable.vue";
export default {
  data() {
    return {
      data: [
        {
          name: "test"
        }
      ],
      show: false
    };
  },
  components: {
    AddTable
  },
  methods: {
    init() {
      this.$axios.get("/roomtype/list").then(res => {
        this.data = [];
        res.data.data.forEach(element => {
          this.data.push(element);
        });
      });
    },
    remove(item) {
      this.$axios
        .delete("/roomtype?name=" + item.name)
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
