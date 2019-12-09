<template>
  <div>
    <el-scrollbar>
      <el-table
        :data="
          data.filter(
            data =>
              !search ||
              data.user.name.toLowerCase().includes(search.toLowerCase())
          )
        "
      >
        <el-table-column label="姓名" prop="user.name"> </el-table-column>
        <el-table-column leabl="身份证号码" prop="user.idcardnumber">
        </el-table-column>
        <el-table-column label="手机号码" prop="user.phone"> </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ scope.row.user.sex == 0 ? "男" : "女" }}
          </template>
        </el-table-column>
        <el-table-column label="年龄" prop="user.age"> </el-table-column>
        <el-table-column label="房间类型" prop="room.type.name">
        </el-table-column>
        <el-table-column label="入住时间">
          <template slot-scope="scope">
            {{ scope.row.indate | dateFormat("yyyy-MM-dd") }}
          </template>
        </el-table-column>
        <el-table-column label="退房时间">
          <template slot-scope="scope">
            {{ scope.row.outdate | dateFormat("yyyy-MM-dd") }}
          </template>
        </el-table-column>
        <el-table-column label="收费金额">
          <template slot-scope="scope">
            {{
              Math.round(
                ((scope.row.outdate - scope.row.indate) /
                  (1000 * 60 * 60 * 24)) *
                  scope.row.room.price
              )
            }}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ getStatus(scope.row.status) }}
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入名字搜索" />
          </template>
          <template slot-scope="scope">
            <div>
              <el-button size="mini" type="primary" @click="edit(scope.row)"
                >修改</el-button
              >
              <el-button size="mini" type="danger" @click="cancel(scope.row)"
                >退订</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-btn">
        <el-button @click="show = true" type="primary" style="width:100%;">
          订房
        </el-button>
      </div>
    </el-scrollbar>
    <add-table :show.sync="show" @update="init"></add-table>
    <edit-table
      :show.sync="editshow"
      :data="editing"
      @update="init"
    ></edit-table>
  </div>
</template>

<script>
import AddTable from "@/components/admin/order/AddTable.vue";
import EditTable from "@/components/admin/order/EditTable.vue";
export default {
  components: {
    AddTable,
    EditTable
  },
  data() {
    return {
      search: "",
      data: [
        {
          user: {
            name: "",
            idcardnumber: "",
            phone: "",
            sex: "",
            age: ""
          },
          room: {
            type: {
              name: "Default"
            },
            price: 1000
          },
          indate: new Date(),
          outdate: new Date("2019/12/8"),
          status: 0
        }
      ],
      show: false,
      editshow: false,
      editing: {}
    };
  },
  methods: {
    getStatus(status) {
      if (status == 0) {
        return "入住中";
      } else if (status == 1) {
        return "退订";
      } else if (status == 2) {
        return "取消";
      }
    },
    init() {
      this.$axios.get("/order/list").then(res => {
        this.data = [];
        res.data.data.forEach(element => {
          element.indate = new Date(element.indate);
          element.outdate = new Date(element.outdate);
          this.data.push(element);
        });
      });
    },
    cancel(item) {
      item.status = 1;
      this.$axios
        .put("/order", item)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            message: err.data.title,
            type: "danger"
          });
        });
    },
    edit(item) {
      this.editing = item;
      console.log(this.editing);
      this.editshow = true;
    },
    getDate() {
      // console.log(this.data);
      return this.data;
    }
  },
  mounted() {
    this.init();
  },
  updated() {
    console.log(this.data);
  }
};
</script>

<style lang="scss" scoped>
.add-btn {
  margin: 10px 0;
  width: 100%;
}
</style>
