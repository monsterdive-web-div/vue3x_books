<script lang="ts">
import { defineComponent } from "vue";
import NewsTab from "@/components/pages/NewsTab.vue";
import { AppData } from "@/store/app.data.ts";

export default defineComponent({
  name: "Top",
  data() {
    return {
      newsData: AppData.newsDataList
    };
  },
  components: {
    NewsTab
  }
});
</script>

<template>
  <div class="News">
    <h2 class="News__heading">News</h2>
    <NewsTab :newsData="newsData" />
  </div>
</template>

<style lang="scss" scoped>
.News {
  max-width: 1000px;
  margin: 98px auto 0;
  padding: 0 20px;
  @include md(max) {
    margin: 30px 0 0;
  }
}

.News__heading {
  margin: 0;
  font-family: $FONT_EN;
  font-size: em(60, 16);
  color: $COLOR_MAIN;
  @include md(max) {
    font-size: em(42, 16);
  }
}
</style>
