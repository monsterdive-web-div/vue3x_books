<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { AppData } from "@/store/app.data.ts";
import { Tabs, Tab, TabPanels, TabPanel } from "vue3-tabs";
import { getCategoryNewsData, getDataDateTime } from "@/store/app.utils.ts";
import { NewsData } from "@/store/app.config.ts";

const tabs = ["All", "Book", "Author"];

export default defineComponent({
  name: "Top",
  data() {
    return {
      newsData: AppData.newsDataList
    };
  },
  setup() {
    const state = reactive({
      selectedTab: tabs[0]
    });
    return {
      tabs,
      ...toRefs(state)
    };
  },
  methods: {
    getDateTime(dateStr: string): string {
      return getDataDateTime(dateStr);
    },
    getCategoryNewsData(data: NewsData[], category: string): NewsData[] {
      return getCategoryNewsData(data, category);
    }
  },
  components: {
    Tabs,
    Tab,
    TabPanels,
    TabPanel
  }
});
</script>

<template>
  <div class="News">
    <h2 class="News__heading">News</h2>

    <div class="vue3-tabs">
      <tabs v-model="selectedTab">
        <div class="vue3-tabs-tablist" role="tablist" aria-label="ニュース">
          <tab class="vue3-tabs-tab" v-for="(tab, i) in tabs" :key="`t${i}`" :val="tab" :label="tab" :indicator="true" role="tab" />
        </div>
      </tabs>
      <tab-panels v-model="selectedTab" :animate="true" :swipeable="true">
        <tab-panel v-for="(tab, i) in tabs" :key="`tp${i}`" :val="tab">
          <ul class="vue3-tabs-list">
            <li class="vue3-tabs-item" v-for="data in getCategoryNewsData(newsData, tab)" :key="data.title">
              <span class="vue3-tabs-info">
                <time :datetime="getDateTime(data.date)" class="vue3-tabs-date">
                  {{ data.date }}
                </time>
                <span class="vue3-tabs-category">
                  {{ data.category }}
                </span>
              </span>
              <span class="vue3-tabs-title">
                {{ data.title }}
              </span>
            </li>
          </ul>
        </tab-panel>
      </tab-panels>
    </div>
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

.vue3-tabs {
  margin: 30px -6px 0;
}

.tabs {
  display: block;
  padding: 0 6px;
}

.tab-panels {
  margin-top: 30px;
  padding: 0 0 6px;
}

.vue3-tabs-tablist {
  display: flex;
  justify-content: space-between;
}

.vue3-tabs-tab {
  width: calc((100% - 70px) / 3);
  padding: 14px 0;
  font-family: $FONT_EN;
  font-size: em(20, 16);
  line-height: 1.6;
  text-align: center;
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

  &.active {
    color: #fff;
    background-color: $COLOR_MAIN;
  }
}

.vue3-tabs-list {
  margin: 0;
  padding: 0 6px;
  list-style-type: none;
}

.vue3-tabs-item {
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

.vue3-tabs-info {
  @include md(min) {
    display: flex;
    align-items: center;
  }
  @include md(max) {
    display: block;
  }
}

.vue3-tabs-date {
  color: $COLOR_MAIN;
  font-weight: bold;
  @include md(max) {
    font-size: em(14, 16);
  }
}

.vue3-tabs-category {
  min-width: 70px;
  padding: 2px 0;
  font-size: em(14, 16);
  font-weight: bold;
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

.vue3-tabs-title {
  font-size: em(15, 16);
  font-weight: 700;
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
