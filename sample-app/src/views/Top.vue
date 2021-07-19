<script lang="ts">
import { defineComponent, ref } from "vue";
import NewsTab from "@/components/pages/NewsTab.vue";
import { AppData } from "@/store/app.data.ts";
import axios from "axios";

export default defineComponent({
  name: "Top",
  setup() {
    const newsData = ref([]);
    const newsCategories = ref([]);
    axios
      .get(AppData.newsPath)
      .then(response => {
        newsData.value = response.data;
      })
      .catch(error => {
        console.log("🚀 ~ file: Top.vue ~ line 18 ~ setup ~ error", error);
      });
    axios
      .get(AppData.newsCategoriesPath)
      .then(response => {
        newsCategories.value = response.data;
      })
      .catch(error => {
        console.log("🚀 ~ file: Top.vue ~ line 26 ~ setup ~ error", error);
      });
    return { newsData, newsCategories };
  },
  components: {
    NewsTab
  }
});
</script>

<template>
  <div class="News" id="News">
    <h2 class="News__heading">News</h2>
    <router-view />
    <NewsTab :newsData="newsData" :newsCategories="newsCategories" />
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
