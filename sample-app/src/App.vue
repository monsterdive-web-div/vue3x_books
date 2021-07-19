<script lang="ts">
import { defineComponent, computed } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppHero from "@/components/AppHero.vue";
import AppFooter from "@/components/AppFooter.vue";
import store from "@/store";
import { Page } from "@/router/index.ts";
import router from "@/router";
import "normalize.css";

export default defineComponent({
  setup() {
    const nowPage = computed(() => store.getters.nowPage);
    const isTop = computed(() => router.currentRoute.value.name === Page.TOP);

    return {
      nowPage,
      isTop
    };
  },
  components: {
    AppHeader,
    AppHero,
    AppFooter
  }
});
</script>

<template>
  <div class="App" :class="{ '-home': isTop }" :data-page="nowPage">
    <AppHeader />
    <main class="Main">
      <AppHero :nowPage="nowPage" />
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<style lang="scss">
.App {
  padding-top: 80px;
  @include md(max) {
    padding-top: 70px;
  }
}

.dg.ac {
  z-index: 1;
  right: 25%;
}
</style>
