<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { NewsData } from "@/store/app.config.ts";
import { getCategoryNewsData, getDataDateTime } from "@/store/app.utils.ts";

export default defineComponent({
  name: "NewsList",
  props: {
    newsData: {
      type: Object as PropType<NewsData[]>,
      required: true
    },
    selectCategory: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    // フィルタリング
    const filteredData = computed(() => {
      return getCategoryNewsData(props.newsData, props.selectCategory);
    });
    return { filteredData };
  },
  methods: {
    getDateTime(dateStr: string): string {
      return getDataDateTime(dateStr);
    }
  }
});
</script>

<template>
  <div class="News__tabPanel">
    <ul class="News__list">
      <li v-for="data in filteredData" :key="data.title" class="News__item">
        <span class="News__itemInfo">
          <time class="News__itemDate" :datetime="getDateTime(data.date)">
            {{ data.date }}
          </time>
          <span class="News__itemCategory">
            {{ data.category }}
          </span>
        </span>
        <span class="News__itemTitle">
          {{ data.title }}
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.News__tabPanel {
  margin-top: 30px;
  @include md(max) {
    margin-top: 15px;
  }
}

.News__list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.News__item {
  padding: 26px 30px;
  font-size: 1rem;
  background-color: #fff;
  box-shadow: $SHADOW_BASE;
  @include md(min) {
    display: flex;
    align-items: baseline;
  }
  @include md(max) {
    padding: 16px 20px 20px;
  }

  &:not(:first-child) {
    margin-top: 10px;
    @include md(max) {
      margin-top: 20px;
    }
  }
}

.News__itemInfo {
  @include md(min) {
    display: flex;
    align-items: center;
  }
  @include md(max) {
    display: block;
  }
}

.News__itemDate {
  color: $COLOR_MAIN;
  font-weight: $FONT_WEIGHT_BASE_BOLD;
  @include md(max) {
    font-size: em(14, 16);
  }
}

.News__itemCategory {
  min-width: 70px;
  padding: 2px 0;
  font-size: em(14, 16);
  font-weight: $FONT_WEIGHT_BASE_BOLD;
  text-align: center;
  color: #fff;
  background-color: $COLOR_MAIN;
  @include md(max) {
    display: inline-block;
    font-size: em(12, 16);
  }

  &:not(:first-child) {
    margin-left: 20px;
    @include md(max) {
      margin-left: 15px;
    }
  }
}

.News__itemTitle {
  font-size: em(15, 16);
  font-weight: $FONT_WEIGHT_BASE_BOLD;
  line-height: 1.73;
  @include md(max) {
    display: block;
    font-size: em(14, 16);
    line-height: 1.64;
  }

  &:not(:first-child) {
    margin-left: 20px;
    @include md(max) {
      margin: 12px 0 0;
    }
  }
}
</style>
