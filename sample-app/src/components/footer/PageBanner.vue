<script lang="ts">
import { defineComponent } from "vue";
import { AppData } from "@/store/app.data.ts";

export default defineComponent({
  name: "PageBanner",
  data() {
    return {
      bannerData: AppData.bannerDataList
    };
  }
});
</script>

<template>
  <aside class="PageBanner">
    <div class="PageBanner__inner">
      <ul class="PageBanner__list">
        <li class="PageBanner__item" v-for="banner of bannerData" :key="banner.src">
          <a :href="banner.href" target="_blank" rel="noopener noreferrer">
            <img :src="banner.src" :alt="banner.alt" />
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.PageBanner {
  margin-top: 120px;
  @include md(max) {
    margin-top: 60px;
  }
}

.PageBanner__inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
}

.PageBanner__list {
  margin: 0 -13px;
  padding: 0;
  @include md(min) {
    display: flex;
    justify-content: center;
  }
  @include md(max) {
    margin: 0;
  }
}

.PageBanner__item {
  width: calc(100% / 2);
  padding: 0 13px;
  list-style-type: none;
  box-sizing: border-box;
  @include md(max) {
    width: 100%;
    padding: 0;
    text-align: center;
  }

  &:not(:last-child) {
    @include md(max) {
      margin-bottom: 15px;
    }
  }

  > a {
    overflow: hidden;
    display: block;
    border: 4px solid #e5e5e5;
    border-radius: 10px;
    box-shadow: $SHADOW_BASE;
    transition: box-shadow $SEC ease;
    box-sizing: border-box;
    @include md(max) {
      max-width: 340px;
      display: inline-block;
      vertical-align: top;
    }

    &:hover {
      box-shadow: $SHADOW_HOVER;
    }
  }
}
</style>
