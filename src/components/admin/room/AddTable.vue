<template>
  <el-dialog
    :visible="show"
    @close="$emit('update:show', false)"
    title="添加客房"
  >
    <el-form label-width="120px">
      <!-- <el-form-item label="客房名称">
        <el-input v-model="data.name"></el-input>
      </el-form-item> -->
      <el-form-item label="客房类型">
        <el-select v-model="data.type.name">
          <el-option
            v-for="item in typeOption"
            :key="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客房设备">
        <el-input v-model="data.device"></el-input>
      </el-form-item>
      <el-form-item label="推荐指数">
        <el-input v-model="data.rate"></el-input>
      </el-form-item>
      <el-form-item label="每日租金">
        <el-input-number v-model="data.price"></el-input-number> 元
      </el-form-item>
      <el-form-item label="当前剩余">
        <el-input-number v-model="data.rest"></el-input-number>
      </el-form-item>
      <el-form-item label-width="0">
        <template>
          <el-button @click="submit(data)" type="primary" style="width:100%">
            <i class="el-icon-plus"></i> 添加
          </el-button>
        </template>
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
      typeOption: [
        {
          name: "test"
        }
      ],
      data: {
        name: "",
        roomid: "",
        type: {
          name: "Default"
        },
        device: "",
        rate: "",
        price: 0,
        rest: 0
      }
    };
  },
  methods: {
    options() {
      this.typeOption = [];
      this.$axios.get("/roomtype/list").then(res => {
        this.typeOption = res.data.data;
      });
    },
    submit(item) {
      this.$axios
        .post("/room", item)
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
  },
  mounted() {
    this.options();
  }
};
</script>
