<template>
  <div class="page-newsInfo" v-if="model">
    <div class="title d-flex py-3 px-2">
      <i class="back text-blue" @click="$router.go(-1)">&lt;</i>
      <div class="flex-1 ml-2 text-blue text-ellipsis">{{ model.title }}</div>
      <div class="text-grey fs-xs">2020-11-22</div>
    </div>
    <div v-html="model.body" class="px-3 model-body fs-xl pb-3 my-3"></div>
    <div class="related px-3">
      <div class="d-flex jc-center ai-center">
        <i class="sprite sprite-related"></i>
        <strong class="flex-1 fs-lg text-blue ml-2">相关资讯</strong>
      </div>
      <div class="related-body mt-3 mb-5">
        <router-link
          :to="`/newsInfo/${item._id}`"
          tag="div"
          v-for="item in model.related"
          :key="item._id"
          class="d-flex"
        >
          <div class="flex-1 text-ellipsis my-1 pr-3">{{ item.title }}</div>
          <span class="text-grey fs-xs">2020-11-22</span>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { required: true },
  },
  data() {
    return {
      model: null,
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    id: 'fetch'
    // id() {
    //   this.fetch()
    // }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`newsInfo/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>
<style lang="scss">
.page-newsInfo {
  .title {
    border-bottom: 2px solid rgba($color: #000000, $alpha: 0.2);
  }
  .back {
    font-weight: 200;
  }
  .model-body {
    border-bottom: 3px solid rgba($color: #000000, $alpha: 0.2);
    p {
      color: rgba($color: #000000, $alpha: 0.7);
      line-height: 2rem;
    }
    img {
      width: 100%;
      height: auto;
    }
    iframe {
      width: 100%;
      height: auto;
    }
  }
}
</style>
