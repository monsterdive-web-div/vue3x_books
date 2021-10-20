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