<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <div
        class="nav-item"
        :class="{ active: active === i }"
        v-for="(item, i) in categories"
        :key="i"
         @click="$refs.list.swiper.slideTo(i)"
      >
        <a href="javascript:;" class="nav-link">
          {{item.name}}
        </a>
      </div>
    </div>
    <div class="pt-2">
      <swiper ref="list" :options="{autoHeight: true}" @slide-change="()=>active =$refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
    title: {
      type: String,
    },
    categories: { type: Array },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
</style>