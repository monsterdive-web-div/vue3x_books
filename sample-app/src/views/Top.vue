<script lang="ts">
import { defineComponent, ref } from "vue";
import NewsTab from "@/components/pages/NewsTab.vue";
import axios from "axios";

export default defineComponent({
  name: "Top",
  setup() {
    const newsData = ref([]);
    axios
      .get("/json/news.json")
      .then(response => {
        newsData.value = response.data.response;
      })
      .catch(error => {
        console.log("🚀 ~ file: Top.vue ~ line 16 ~ setup ~ error", error);
      });
    return { newsData };
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
