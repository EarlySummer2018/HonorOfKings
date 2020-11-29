<template>
  <div class="page-heroInfo" v-if="model">
    <div class="topbar bg-black p-3 py-2 d-flex ai-center text-white">
      <img src="../assets/logo.png" class="logo_img" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/heroList" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="heroInfo-main">
      <div class="top" :style="{ 'background-image': `url(${model.banner})` }">
        <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
          <p class="fs-sm">{{ model.title }}</p>
          <strong class="fs-xl my-1">{{ model.name }}</strong>
          <p class="fs-sm mb-1">
            {{ model.categories.map((v) => v.name).join("/") }}
          </p>
          <div class="d-flex jc-between">
            <div class="scores" v-if="model.scores">
              <span>难度</span>
              <span class="badge bg-primary">{{ model.scores.difficult }}</span>
              <span>技能</span>
              <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
              <span>攻击</span>
              <span class="badge bg-danger">{{ model.scores.attack }}</span>
              <span>生存</span>
              <span class="badge bg-dark-2">{{ model.scores.survive }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      model: null,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroInfo/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>
<style lang="scss">
.page-heroInfo {
  .heroInfo-main {
    margin-top: 3.2308rem;
    .top {
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: auto 100%;
    }
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      span:nth-child(even) {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6px;
        border: 1px solid rgba(255, 255, 255, .2);
      }
    }
  }
}
</style>
