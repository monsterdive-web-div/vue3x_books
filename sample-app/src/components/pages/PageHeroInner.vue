<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { HeroData } from "@/store/app.config.ts";

export default defineComponent({
  name: "PageHeroInner",
  props: {
    heroData: {
      type: Object as PropType<HeroData>,
      required: true
    }
  },
  setup(props) {
    const hData = computed(() => props.heroData);
    return { hData };
  }
});
</script>

<template>
  <div class="PageHero__wrap" :class="hData.cls">
    <div class="PageHero__inner">
      <div class="PageHero__content">
        <h1 class="PageHero__heading">
          <slot name="heading" />
        </h1>
        <p class="PageHero__description">
          <slot name="desc" />
        </p>
        <div class="PageHero__logo">
          <img src="@/assets/images/logo-vue.svg" alt="ロゴ：Vue.js" />
        </div>
      </div>
      <div class="PageHero__scroll">
        <span class="PageHero__scrollDot"></span>
      </div>
    </div>
  </div>
</template>
