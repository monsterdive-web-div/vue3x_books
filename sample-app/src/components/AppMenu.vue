<script lang="ts">
import { defineComponent } from "vue";
import AppMenuLink from "@/components/AppMenuLink.vue";
import { menuRoutes } from "@/router/index.ts";

export default defineComponent({
  name: "AppMenu",
  data() {
    return {
      href: "",
      pages: menuRoutes
    };
  },
  components: {
    AppMenuLink
  }
});
</script>

<template>
  <div class="AppMenu">
    <div class="AppMenu__inner">
      <div class="AppMenu__list">
        <div v-for="page in pages" :key="page" class="AppMenu__item" role="listitem">
          <AppMenuLink :href="page.path">{{ page.name }}</AppMenuLink>
        </div>
      </div>
      <div class="AppMenu__logo">
        <div class="AppMenu__logoImage">
          <img src="@/assets/images/logo-vue.svg" alt="ロゴ：Vue.js" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.AppMenu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  visibility: hidden;

  .AppHeader.-open & {
    visibility: visible;
  }
}

.AppMenu__inner {
  position: relative;
  z-index: 2;
  padding-left: vw(700, $XL);
  @include md(max) {
    width: 100%;
    height: 100%;
    padding: 278px 0 0;
    box-sizing: border-box;
  }
}

.AppMenu__list {
}

.AppMenu__item {
  @include md(max) {
    text-align: center;
  }
}

.AppMenu__logo {
  position: absolute;
  top: 50%;
  left: vw(170, $XL);
  transform: translateY(-50%);
  width: vw(420, $XL);
  height: vw(420, $XL);
  display: flex;
  justify-content: center;
  background-color: #fff;
  border-radius: 50%;
  @include md(max) {
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    width: 158px;
    height: 158px;
  }
}

.AppMenu__logoImage {
  width: vw(322, $XL);
  padding-top: vw(106, $XL);
  @include md(max) {
    width: 120px;
    padding-top: 38px;
  }
}
</style>
