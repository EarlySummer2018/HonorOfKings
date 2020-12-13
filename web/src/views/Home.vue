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
      <ul class="ul-box d-flex flex-wrap text-dark" ref="ul">
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//pvp.qq.com/m/m201706/coming/index.htm">
            <i class="sprite sprite-0 mb-2"></i>
            <p>爆料站</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//pvp.qq.com/act/a20160510story/index.htm?ADTAG=PC.QrCode.TG">
            <i class="sprite sprite-1 mb-2"></i>
            <p>故事站</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//pvp.qq.com/mall/m">
            <i class="sprite sprite-2 mb-2"></i>
            <p>周边商城</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//pvp.qq.com/cp/a20161116tyf/page01.htm">
            <i class="sprite sprite-3 mb-2"></i>
            <p>体验服</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//pvp.qq.com/m/m201606/goCenter.shtml">
            <i class="sprite sprite-4 mb-2"></i>
            <p>新人专区</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="https://pvp.qq.com/m/memory/index.shtml">
            <i class="sprite sprite-5 mb-2"></i>
            <p>王者·传承</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//image.ttwz.qq.com/wzry/wzryzs_download_4001.htm?ADTAG=mpvp.qq.com">
            <i class="sprite sprite-6 mb-2"></i>
            <p>王者营地</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//game.weixin.qq.com/cgi-bin/comm/openlink?noticeid=90102708&appid=wx95a3a4d7c627e07d&url=https%3A%2F%2Fgame.weixin.qq.com%2Fcgi-bin%2Fh5%2Fstatic%2Fsubscribe%2Findex.html%3Fappid%3Dwx95a3a4d7c627e07d#wechat_redirect">
            <i class="sprite sprite-8 mb-2"></i>
            <p>公众号</p>
          </a>
        </li>
        <li class="nav-icons-item d-flex flex-column jc-center ai-center mb-3">
          <a href="//pvp.qq.com/cp/a20190320bbgxsmm/index.html">
            <i class="sprite sprite-9 mb-2"></i>
            <p>版本介绍</p>
          </a>
        </li>
      </ul>
      <div
        class="pack-up bg-light py-2 fs-sm d-flex jc-center ai-center"
        @click="packUp()"
      >
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
          <span class="text-dark flex-1 text-ellipsis pr-2">{{
            item.title
          }}</span>
          <!-- <span>{{ item.createdAt | formatDate }}</span> -->
          <span class="text-lightgrey fs-sm">11/22</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end off news list -->
    <hero-list></hero-list>
    <!-- end off heroes list -->
  </div>
</template>

<script>
import dayjs from "dayjs";
import HeroList from "../components/HeroList.vue";
export default {
  filters: {
    formatDate(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
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
      newsCats: [],
      flag: false,
    };
  },
  created() {
    this.fetchNewsCats();
  },
  methods: {
    packUp() {
      let ul = this.$refs.ul;
      let lc = ul.parentNode.lastChild;
      if (this.flag === false) {
        ul.style.height = 65 + "px";
        this.flag = true;
        lc.firstChild.style.transform = "rotateZ(180deg)";
        lc.lastChild.innerHTML = "展开";
      } else {
        ul.style.height = 195 + "px";
        this.flag = false;
        lc.firstChild.style.transform = "rotateZ(0deg)";
        lc.lastChild.innerHTML = "收起";
      }
    },
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
  },
  components: {
    HeroList,
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
  overflow: hidden;
  .nav-icons-item {
    width: 25%;
    height: 4rem;
    border-left: 1px solid $border-color;
    &:nth-child(4n + 1) {
      border-left: none;
    }
    a {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .pack-up {
    position: relative;
    z-index: 2;
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