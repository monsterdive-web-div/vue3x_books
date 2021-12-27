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
