<template>
  <div class="CategoryEdit">
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <!-- 英雄基本信息 -->
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(model, 'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="海报">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="(res) => $set(model, 'banner', res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 英雄各项评分 -->
          <el-form-item label="难度">
            <el-rate
              style="margin-top: 0.6rem"
              :max="10"
              show-score
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              style="margin-top: 0.6rem"
              :max="10"
              show-score
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              style="margin-top: 0.6rem"
              :max="10"
              show-score
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              style="margin-top: 0.6rem"
              :max="10"
              show-score
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <!-- 英雄出装与使用技巧 -->
          <!-- 顺风出装 -->
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" filterable multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 顺风出装结束 -->
          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" filterable multiple>
              <el-option
                v-for="item in items"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装结束 -->
          <el-form-item label="使用技巧">
            <el-input type="textare" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textare" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textare" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <!-- 英雄技能 -->
        <el-tab-pane label="技能" name="skills">
          <el-button size="samll" @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :headers="getAuthHeaders()"
                  :show-file-list="false"
                  :on-success="
                    (res) => (item.icon = $set(item, 'icon', res.url))
                  "
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cots"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textare"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.skills.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <!-- 英雄关系 -->
        <el-tab-pane label="英雄关系" name="partners">
          <!-- partners -->
          <el-button size="samll" @click="model.partners.push({})"
            ><i class="el-icon-plus"></i>添加最佳搭档</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, index) in model.partners"
              :key="index"
            >
              <el-form-item label="最佳搭档">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textare"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.partners.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>

          <!-- restrain -->
          <el-button size="samll" @click="model.restrain.push({})"
            ><i class="el-icon-plus"></i>添加克制谁</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, index) in model.restrain"
              :key="index"
            >
              <el-form-item label="克制谁">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textare"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.restrain.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>

          <!-- beRestrain -->
          <el-button size="samll" @click="model.beRestrain.push({})"
            ><i class="el-icon-plus"></i>添加被克制</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col
              :md="12"
              v-for="(item, index) in model.beRestrain"
              :key="index"
            >
              <el-form-item label="被谁克制">
                <el-select v-model="item.hero" filterable>
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :value="hero._id"
                    :label="hero.name"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textare"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  size="small"
                  type="danger"
                  @click="model.beRestrain.splice(index, 1)"
                  >删除</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
      model: {
        name: "",
        avatar: "",
        partners: [],
        restrain: [],
        beRestrain: [],
        partners1: [],
        restrain1: [],
        beRestrain1: [],
        scores: {
          difficult: 0,
        },
        skills: [],
        arr: [],
        arr1: [],
      },
      categories: [],
      heroes: [],
      items: [],
    };
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
    this.fetchItems();
    this.fetchHeroes();
  },
  methods: {
    // 添加数据并跳转
    async save() {
      let item1 = this.model.items1;
      let arr = [];
      for (const value of item1) {
        const res1 = await this.$http.get(`rest/items/${value}`);
        arr.push(res1.data);
      }
      this.model.arr = arr;
      let item2 = this.model.items2;
      let arr1 = [];
      for (const value of item2) {
        const res1 = await this.$http.get(`rest/items/${value}`);
        arr1.push(res1.data);
      }
      this.model.arr1 = arr1;
      // 格式化搭档的数据
      let partners = [];
      let p = this.model.partners
      for (const v of p) {
        let obj = {}
        obj.description = v.description
        obj._id = v._id
        const res = await this.$http.get(`rest/heroes/${v.hero}`);
        obj.hero = res.data.avatar
        partners.push(obj)
      }
      this.model.partners1 = partners;
      // 格式化克制谁的数据
      let restrain = [];
      let  R = this.model.restrain
      for (const v of R) {
        let obj = {}
        obj.description = v.description
        obj._id = v._id
        const res = await this.$http.get(`rest/heroes/${v.hero}`);
        obj.hero = res.data.avatar
        restrain.push(obj)
      }
      this.model.restrain1 = restrain;
            // 格式化被克制的数据
      let beRestrain = [];
      let  B = this.model.beRestrain
      for (const v of B) {
        let obj = {}
        obj.description = v.description
        obj._id = v._id
        const res = await this.$http.get(`rest/heroes/${v.hero}`);
        obj.hero = res.data.avatar
        beRestrain.push(obj)
      }
      this.model.beRestrain1 = beRestrain;
      if (this.id) {
        console.log(this.model);
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/heroes", this.model);
      }
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 根据 id 获取对应的数据进行展示
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },

    // 获取英雄类型
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      this.categories = res.data;
    },

    // 获取出装
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      this.items = res.data;
    },

    // 获取英雄
    async fetchHeroes() {
      const res = await this.$http.get(`rest/heroes`);
      this.heroes = res.data;
    },
    async equip(id) {
      let item1 = this.model.items1;
      for (const value of item1) {
        console.log(value);
      }
      const res = await this.$http.get(`rest/items/${id}`);
      return res.data;
    },
  },
};
</script>
<style>
.f_l label {
  text-align: left;
  width: 70px !important;
}
.f_l .el-form-item__content {
  margin-left: 0 !important;
}
</style>