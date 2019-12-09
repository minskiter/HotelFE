<template>
  <el-dialog
    :visible="show"
    @close="$emit('update:show', false)"
    title="修改订单"
  >
    <el-form label-width="100px">
      <el-form-item label="房间类型">
        <el-select v-model="data.room">
          <el-option
            v-for="item in roomList"
            :key="item.roomid"
            :label="item.type.name + '(' + item.roomid + ')'"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="入住时间">
        <el-date-picker v-model="data.indate"></el-date-picker>
      </el-form-item>
      <el-form-item label="退房时间">
        <el-date-picker v-model="data.outdate"></el-date-picker>
      </el-form-item>
      <el-form-item label-width="0">
        <el-button @click="submit(data)" type="primary" style="width:100%"
          >修改</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      roomList: []
    };
  },
  props: {
    data: {
      default: function() {
        return {
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
        };
      },
      type: Object
    },
    show: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    submit(form) {
      form.user.sex = parseInt(form.user.sex);
      form.user.age = parseInt(form.user.age);
      form.room.price = parseInt(form.room.price);
      this.$axios
        .put("/order", form)
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.$emit("update");
          this.close();
        })
        .catch(err => {
          this.$message({
            message: err.data.title,
            type: "danger"
          });
        });
    },
    getRooms() {
      this.$axios.get("/room/list").then(res => {
        this.roomList = res.data.data;
      });
    },
    close() {
      this.$emit("update:show", false);
    }
  },
  mounted() {
    this.getRooms();
  }
};
</script>
