<template>
  <div class="CategoryList">
    <h1>用户列表</h1>
    <template>
      <el-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
      >
        <!-- <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option> -->
      </el-select>
      <el-button circle icon="el-icon-search"></el-button>
      <el-button
        circle
        icon="el-icon-plus"
        @click="dialogFormVisible = true"
      ></el-button>
      <Dialog :dialogFormVisible="dialogFormVisible" @dialog=dialog />
    </template>
    <el-table :data="items">
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="address" label="联系地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Dialog from "./Dialog.vue";
export default {
  props: {
    id: {},
  },
  data() {
    return {
      value: {},
      amend: {},
      items: [],
      dialogFormVisible:false
    };
  },
  components: {
    Dialog,
  },
  created() {
    this.fetch();
  },
  methods: {
    dialog(e) {
      console.log(e);
    },
    async fetch() {
      const res = await this.$http.get("rest/users");
      this.items = res.data;
    },
    async remove(row) {
      console.log(row);
      this.$confirm(`是否确定要删除"${row.userName}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete(`rest/users/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.el-button {
  margin-left: 10px;
}
</style>