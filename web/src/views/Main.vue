<template>
  <div>
    <div class="topbar bg-black p-3 py-2 d-flex ai-center">
      <img src="../assets/logo.png" class="logo_img" />
      <div class="px-2 flex-1">
        <h1 class="text-white fs-md">王者荣耀</h1>
        <p class="text-grey-1 fs-xxs">团队成就更多</p>
      </div>
      <button type="button" class="btn bg-primary">立即下载</button>
    </div>
    <div class="bg-primary pt-3 pb-2">
      <div class="nav jc-around nav-inverse pd-1">
        <div class="nav-item active">
          <router-link class="nav-link" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class="nav-link" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
h1,
p {
  margin: 0;
  padding: 0;
}
.topbar {
  .logo_img {
    height: 30px;
  }
}
</style>>