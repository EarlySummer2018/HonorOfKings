<template>
  <div class="CategoryEdit">
    <h1>{{ id ? "编辑" : "新建" }}装备/物品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },
  created() {
    this.id && this.fetch();
    this.equip()
  },
  methods: {

    // 添加数据并跳转
    async save() {
      if (this.id) {
        await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/items", this.model);
      }
      // this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 根据 id 获取对应的数据进行展示
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
        async equip() {
      const res = await this.$http.get(`rest/items/5fbb8599c207162bac0f3e34`);
      console.log(res);
    },

    // 获取上传图片的数据
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url)
      // this.model.icon = res.url
    }
  },
  
};
</script>
