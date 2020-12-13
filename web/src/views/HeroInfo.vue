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
      <div class="skill">
        <a class="discern" href="javascript;">一图识英雄</a>
        <div class="nav">
          <div
            class="nav-item"
            v-for="(item, i) in model.skills"
            :key="i"
            @click="$refs.list.swiper.slideTo(i)"
          >
            <a href="javascript:;" class="nav-link">
              <img
                :src="item.icon"
                alt="技能丢失"
                :class="{ active: active === i }"
              />
            </a>
          </div>
        </div>
        <div class="pt-2">
          <swiper
            ref="list"
            :options="{ autoHeight: true }"
            @slide-change="() => (active = $refs.list.swiper.realIndex)"
          >
            <swiper-slide v-for="(category, i) in model.skills" :key="i">
              <div class="skill-title pl-3">
                <h3>{{ category.name }}</h3>
                <p>(冷却值: {{ category.delay }} 消耗:{{ category.cots }})</p>
              </div>
              <p class="pl-3">{{ category.description }}</p>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <card title="出装推荐" icon="icll11">
        <div class="favourable">
          <div>
            <p class="favourable-title fs-lg">顺风出装</p>
            <div class="mt-3 favourable-main d-flex">
              <div
                class="main"
                v-for="favourable in model.arr"
                :key="favourable._id"
              >
                <img :src="favourable.icon" alt="装备丢失" />
                <p class="mt-2">{{ favourable.name }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p class="against-title fs-lg mt-3">逆风出装</p>
          <div class="mt-3 against-main d-flex">
            <div class="main" v-for="against in model.arr1" :key="against._id">
              <img :src="against.icon" alt="装备丢失" />
              <p class="mt-2">{{ against.name }}</p>
            </div>
          </div>
        </div>
      </card>
      <card title="使用技巧" icon="icll13"
        ><p class="text">{{ model.usageTips }}</p></card
      >
      <card title="对抗技巧" icon="icll14"
        ><p class="text">{{ model.battleTips }}</p></card
      >
      <card title="团战思路" icon="icll15"
        ><p class="text">{{ model.teamTips }}</p></card
      >
      <card title="英雄关系" icon="icll08">
        <p class="fs-lg">最佳搭档</p>
        <div
          class="partner d-flex"
          v-for="item in model.partners1"
          :key="item._id"
        >
          <div class="avatar flex-1">
            <img :src="item.hero" alt="英雄头像逃跑了" />
          </div>
          <div class="description">
            <p>{{ item.description }}</p>
          </div>
        </div>
        <p class="fs-lg">被谁克制</p>
        <div
          class="beRestrain d-flex"
          v-for="item in model.beRestrain1"
          :key="item._id"
        >
          <div class="avatar flex-1">
            <img :src="item.hero" alt="英雄头像逃跑了" />
          </div>
          <div class="description">
            <p>{{ item.description }}</p>
          </div>
        </div>
        <p class="fs-lg">克制谁</p>

        <div
          class="restrain d-flex"
          v-for="item in model.restrain1"
          :key="item._id"
        >
          <div class="avatar flex-1">
            <img :src="item.hero" alt="英雄头像逃跑了" />
          </div>
          <div class="description">
            <p>{{ item.description }}</p>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import Card from "../components/Card.vue";
export default {
  components: { Card },
  props: {
    id: {
      required: true,
    },
  },
  data() {
    return {
      model: null,
      active: 0,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heroInfo/${this.id}`);
      this.model = res.data;
      console.log(this.model);
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
    .against-main,
    .favourable-main {
      .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 25%;
        img {
          width: 80%;
          border-radius: 50%;
        }
      }
    }
    .skill {
      padding-top: 0.3846rem;
      width: 100%;
      background-color: #fff;
      padding-bottom: 0.7692rem;
      .discern {
        margin-bottom: 0.7692rem;
        display: flex;
        width: 100%;
        height: 2.3077rem;
        background-color: #fcfcfc;
        border: 1px solid #eceef0;
        border-radius: 2px;
        justify-content: center;
        align-items: center;
        &::before {
          content: "";
          display: inline-block;
          margin-right: 0.7692rem;
          width: 1.5385rem;
          height: 1.5385rem;
          background: url(../assets/images/icon_07.png) no-repeat;
          background-size: 1.5385rem 1.5385rem;
        }
      }
      .nav {
        justify-content: space-around;
        align-items: center;
      }
      .nav-item {
        width: 15%;
        border-radius: 50%;
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border: 3px solid transparent;
          }
        }
      }
    }
    .skill-title {
      display: flex;
      justify-content: start;
      align-items: center;
      p {
        margin-left: 2.3077rem;
        color: #7a7a80;
      }
    }
    i {
      background-size: 1.1538rem 1.1538rem;
      width: 1.1538rem;
      height: 1.1538rem;
    }
    .text {
      line-height: 1.5385rem;
      color: #343440;
      font-size: 13px;
    }
    .beRestrain + .beRestrain,
    .partner + .partner {
      border-bottom: 1px solid #ccc;
    }
    .beRestrain,
    .restrain,
    .partner {
      padding-bottom: 0.7692rem;
      margin-bottom: 0.7692rem;
    }
    .beRestrain,
    .restrain,
    .partner {
      margin-top: 0.7692rem;
      .description {
        font-size: 13px;
        color: #343440;
        p {
          line-height: 18px;
        }
      }
      .avatar {
        img {
          width: 3.8462rem;
          height: 3.8462rem;
          border-radius: 0.7692rem;
          margin-right: 0.7692rem;
        }
      }
    }
    .card:last-child {
      margin-bottom: 0;
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
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
.nav-item img.active {
  border-color: #db9e4f !important;
  border-radius: 50%;
}
</style>