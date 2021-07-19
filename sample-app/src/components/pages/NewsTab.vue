<script lang="ts">
import { defineComponent, PropType } from "vue";
import { NewsData, NewsCategories } from "@/store/app.config.ts";
import NewsList from "@/components/pages/NewsList.vue";

export default defineComponent({
  name: "NewsTab",
  data() {
    return {
      selectCategory: 0
    };
  },
  props: {
    newsData: {
      type: Object as PropType<NewsData[]>,
      required: true
    },
    newsCategories: {
      type: Object as PropType<NewsCategories[]>,
      required: true
    }
  },
  methods: {
    selectTab(tabName: number) {
      if (this.selectCategory !== tabName) this.selectCategory = tabName;
    }
  },
  components: {
    NewsList
  }
});
</script>

<template>
  <div class="News__tabs">
    <div class="News__tabList" role="tablist" aria-label="ニュース">
      <button v-for="data in newsCategories" :key="data.name" type="button" role="tab" class="News__tab" :class="{ '-active': selectCategory === (data.slug === 'all' ? 0 : data.id) }" @click="selectTab(data.slug === 'all' ? 0 : data.id)">
        {{ data.name }}
      </button>
    </div>
    <NewsList :select-category="selectCategory" :news-data="newsData" :news-categories="newsCategories" />
  </div>
</template>

<style lang="scss" scoped>
.News__tabs {
  margin-top: 30px;
  @include md(max) {
    margin-top: 15px;
  }
}

.News__tabList {
  display: flex;
  justify-content: space-between;
}

.News__tab {
  width: calc((100% - 70px) / 3);
  padding: 24px 0;
  font-family: $FONT_EN;
  font-size: em(20, 16);
  line-height: 1.6;
  color: $COLOR_MAIN;
  background-color: #fbfdf5;
  border: 0 none;
  border-radius: 10px;
  box-shadow: $SHADOW_BASE;
  cursor: pointer;
  transition: box-shadow $SEC ease;
  @include md(max) {
    width: calc((100% - 35px) / 3);
    padding: 8px 0;
    font-size: em(15, 16);
    border-radius: 5px;
    box-shadow: $SHADOW_BASE;
  }

  &:hover {
    box-shadow: $SHADOW_HOVER;
  }

  &.-active {
    color: #fff;
    background-color: $COLOR_MAIN;
  }
}
</style>
