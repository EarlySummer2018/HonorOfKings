<template>
  <div class="home">
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
    <m-list-card icon="news" title="新闻资讯" :categories="newsCats">
       <template #items="{category}">
         <div class="py-2" v-for="(item,i) in category.newsList" :key="i">
           <span>[{{item.categoryName}}]</span>
           <span>|</span>
           <span>{{item.title}}</span>
           <span>{{item.data}}</span>
         </div>
       </template>
    </m-list-card>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>

    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
    <p>aaaaaaa</p>
  </div>
</template>

<script>
export default {
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
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "热门",
            title: "11月19日体验服停机更新公告",
            data: "11/20",
          })),
        },
        {
          name: "新闻",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "新闻",
            title: "11月19日体验服停机更新公告",
            data: "11/20",
          })),
        },
        {
          name: "公告",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "11月19日体验服停机更新公告",
            data: "11/20",
          })),
        },
        {
          name: "活动",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "活动",
            title: "11月19日体验服停机更新公告",
            data: "11/20",
          })),
        },
        {
          name: "赛事",
          newsList: new Array(5).fill({}).map(() => ({
            categoryName: "赛事",
            title: "11月19日体验服停机更新公告",
            data: "11/20",
          })),
        },
      ],
    };
  },
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
</style>