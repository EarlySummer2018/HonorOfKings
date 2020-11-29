<template>
  <div class="page-home">
    <!-- swiper -->
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/3.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/2.jpeg" />
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 px-1"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end off swiper -->
    <!-- nav-icons -->
    <div class="nav-icons bg-white mt-3 pt-3">
      <ul class="d-flex flex-wrap text-dark">
        <li
          v-for="(item, index) in list"
          :key="index"
          class="nav-icons-item d-flex flex-column jc-center ai-center mb-3"
        >
          <i :class="'sprite ' + 'sprite-' + index + ' mb-2'"></i>
          <p>{{ item }}</p>
        </li>
      </ul>
      <div class="bg-light py-2 fs-sm d-flex jc-center ai-center">
        <i class="sprite sprite-arrow mr-1"></i><span>收起</span>
      </div>
    </div>
    <!-- news list -->
    <m-list-card icon="news" title="新闻资讯" :categories="newsCats">
      <template #items="{ category }">
        <router-link
        tag="div"
        :to="`/newsInfo/${item._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(item, i) in category.newsList"
          :key="i"
        >
          <span class="text-blue">[{{ item.categoryName }}]</span>
          <span class="px-2">|</span>
          <span class="text-dark flex-1 text-ellipsis pr-2">{{ item.title }}</span>
          <!-- <span>{{ item.createdAt | formatDate }}</span> -->
          <span class="text-lightgrey fs-sm">11/22</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end off news list -->
    <hero-list></hero-list>
    <!-- end off heroes list -->
    1
  </div>
</template>

<script>
import dayjs from 'dayjs'
import HeroList from '../components/HeroList.vue'
export default {
  filters: {
    formatDate(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  data() {
    return {
      list: [
        "爆料站",
        "故事站",
        "周边商城",
        "体验服",
        "新人专区",
        "王者·传承",
        "同人社区",
        "王者营地",
        "公众号",
        "版本介绍",
      ],
      swiperOptions: {
        loop: true,
        observer: true,
        observeParents: true, //修改swiper的父元素时，自动初始化swiper
        autoplay: {
          disableOnInteraction: false, // 手动滑动后继续自动播放
        },
        pagination: {
          el: ".pagination-home",
        },
      },
      newsCats: []
    };
  },
  created() {
    this.fetchNewsCats()
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list');
      this.newsCats = res.data
    },

  },
  components: {
    HeroList
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variables";
.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($map: $colors, $key: "white");
    &.swiper-pagination-bullet-active {
      background: map-get($map: $colors, $key: "blue");
    }
  }
}
.nav-icons {
  width: 100%;
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-icons-item {
    width: 25%;
    height: 4rem;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
  }
}
.hero-list {
  margin: 0 -0.3077rem;
  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 0.3077rem;
    padding: 0.3077rem;
    width: 20%;
    height: 6.1538rem;
    img {
      width: 100%;
      border-radius: 0.4615rem;
    }
    span {
      margin-top: 0.3077rem;
    }
  }
}
</style>