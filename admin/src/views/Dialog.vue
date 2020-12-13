<template>
  <div class="dialog">
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="用户名">
          <el-input v-model="model.userName"></el-input>
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="model.phone"></el-input>
        </el-form-item>
        <el-form-item label="联系地址">
          <el-input v-model="model.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialog()">取 消</el-button>
          <el-button type="primary" @click="dialog" native-type="submit"
            >添加</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dialogFormVisible:{
      type: Boolean,
    }
  },
  data() {
    return {
      dialogForm: this.dialogFormVisible,
      model: {},
      formLabelWidth: "120px",
    };
  },
  methods: {
    dialog() {
      this.$emit('dialog', false)
      console.log(this.dialogFormVisible);
    },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/users/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/users", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
  },
};
</script>

<style>
</style>