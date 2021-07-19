<script lang="ts">
import { defineComponent, onUpdated, onMounted, toRefs, reactive } from "vue";
import { getDataDateTime, findObjectByKey, getCategoryStr } from "@/store/app.utils.ts";
import { NewsData } from "@/store/app.config";
import axios from "axios";

export default defineComponent({
  name: "TopNews",
  props: ["id"],
  setup(props) {
    const state = reactive({
      detailDate: "",
      detailTitle: "",
      detailContent: "",
      detailCategory: 0
    });
    const getNewsDetailData = (detailId: number) => {
      axios
        .get("/json/news.json")
        .then(response => {
          const newsData: NewsData = findObjectByKey(response.data.response, "id" as keyof object, Number(detailId)) as NewsData;
          state.detailDate = newsData.date;
          state.detailTitle = newsData.title;
          state.detailContent = newsData.content;
          state.detailCategory = newsData.category;
        })
        .catch(error => {
          console.log("🚀 ~ file: TopNews.vue ~ line 30 ~ getNewsDetailData ~ error", error);
        });
    };
    onMounted(() => {
      getNewsDetailData(props.id);
    });
    onUpdated(() => {
      getNewsDetailData(props.id);
    });

    return {
      ...toRefs(state)
    };
  },
  methods: {
    getDateTime(dateStr: string): string {
      return getDataDateTime(dateStr);
    },
    getCategoryName(catNum: number): string {
      return getCategoryStr(catNum);
    }
  }
});
</script>

<template>
  <article class="NewsDetail">
    <div class="NewsDetail__content">
      <header class="NewsDetail__header">
        <p class="NewsDetail__date">
          <time>{{ getDateTime(detailDate) }}</time>
        </p>
        <h3 class="NewsDetail__title">{{ detailTitle }}</h3>
        <p class="NewsDetail__category">
          <span>{{ getCategoryName(detailCategory) }}</span>
        </p>
      </header>
      <div class="NewsDetail__body" v-html="detailContent"></div>
      <p class="NewsDetail__close">
        <router-link to="/" class="NewsDetail__closeLink">
          <span class="NewsDetail__closeText">トップページへ戻る</span>
        </router-link>
      </p>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.NewsDetail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(#fff, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.NewsDetail__content {
  position: relative;
  width: calc(100% - #{vw(366, $LG)});
  max-height: calc(100% - #{vw(264, $LG)});
  overflow: hidden;
  padding: 67px 60px 60px;
  display: flex;
  flex-direction: column;
  background-color: #fbfdf5;
  box-shadow: $SHADOW_BASE;
  box-sizing: border-box;
  @include md(max) {
    width: calc(100% - 30px);
    max-height: calc(100% - 120px);
    padding: 64px 30px 30px;
  }
}

.NewsDetail__header {
  margin-bottom: 30px;
}

.NewsDetail__date {
  font-size: em(16, 16);
  margin: 0;
  &:not(:last-child) {
    margin-bottom: 4px;
  }

  time {
    color: $COLOR_MAIN;
  }
}

.NewsDetail__title {
  margin: 0;
  font-size: em(20, 16);
  font-weight: 400;
  line-height: 1.7;
  &:not(:last-child) {
    margin-bottom: 20px;
  }
}

.NewsDetail__category {
  margin: 0;
  font-size: em(14, 16);

  > span {
    display: inline-block;
    padding: 0 10px;
    line-height: 1.6;
    color: #fff;
    background-color: $COLOR_MAIN;
  }
}

.NewsDetail__body {
  flex-grow: 1;
  overflow-y: auto;

  ::v-deep(p) {
    margin: 0;
    line-height: 1.875;
    word-break: break-word;
    a {
      color: $COLOR_MAIN;
      &:hover {
        text-decoration: none;
      }
    }
    &:not(:last-child) {
      margin-bottom: em(30, 16);
    }

    &:empty {
      display: none;
    }
  }
}

.NewsDetail__close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  margin: 0;
  @include md(max) {
    width: 24px;
    height: 24px;
  }
}

.NewsDetail__closeLink {
  position: relative;
  display: block;
  margin: 0;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    width: 3px;
    height: 42px;
    background-color: $COLOR_MAIN;
    border-radius: 1px;
    @include md(max) {
      width: 2px;
      height: 32px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    width: 3px;
    height: 42px;
    background-color: $COLOR_MAIN;
    border-radius: 1px;
    @include md(max) {
      width: 2px;
      height: 32px;
    }
  }
}

.NewsDetail__closeText {
  @include visually-hidden;
}
</style>
