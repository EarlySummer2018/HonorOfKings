<template>
  <div class="hero_list">
    <m-list-card icon="hreoes" title="英雄列表" :categories="hreoesCats">
      <template #items="{ category }">
        <ul class="hero-list d-flex flex-wrap">
          <router-link
          tag="li"
          :to="`/heroInfo/${item._id}`"
          class="py-2"
          v-for="(item, i) in category.heroList"
          :key="i"
        >
         <img :src="item.avatar" alt="英雄头像">
         <span>{{item.name}}</span>
          </router-link>
        </ul>
      </template>
    </m-list-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hreoesCats: []
    }
  },
  created() {
    this.fetchHeroesCats()
  },
  methods: {
        async fetchHeroesCats() {
      const res = await this.$http.get('heroes/list');
      this.hreoesCats = res.data
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    margin-top: 0;
    margin-bottom: 0;
  }
</style>
