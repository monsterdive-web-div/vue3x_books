<script lang="ts">
import { defineComponent, computed } from "vue";
import router from "@/router";
import PageHeroInner from "@/components/pages/PageHeroInner.vue";
import { AppData } from "@/store/app.data.ts";

export default defineComponent({
  name: "AppHero",
  props: {
    nowPage: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const pageList: string[] = [];
    const pages = computed(() => router.options.routes);
    for (const page of pages.value) {
      if (typeof page.name == "string") pageList.push(page.name);
    }
    const currentPageIndex = computed(() => pageList.indexOf(props.nowPage));
    const heroDataList = computed(() => AppData.heroDataList);
    const prevPage = computed(() => {
      let num: number;
      if (currentPageIndex.value - 1 < 0) {
        num = pageList.length - 2;
      } else {
        num = currentPageIndex.value - 1;
      }
      return pageList[num];
    });
    const nextPage = computed(() => {
      let num: number;
      if (pageList.length - 1 <= currentPageIndex.value + 1) {
        num = 0;
      } else {
        num = currentPageIndex.value + 1;
      }
      return pageList[num];
    });

    /**
     * 前へ
     */
    const onClickPagePrev = () => {
      let prev = currentPageIndex.value - 1;
      // prevが0未満の場合最後へ
      if (prev < 0) {
        prev = pageList.length - 2;
      }
      router.push({ name: pageList[prev] });
    };

    /**
     * 次へ
     */
    const onClickPageNext = () => {
      let next = currentPageIndex.value + 1;
      // nextがpathList.length以上の場合最初へ
      if (pageList.length - 1 <= next) {
        next = 0;
      }
      router.push({ name: pageList[next] });
    };
    return {
      currentPageIndex,
      heroDataList,
      onClickPagePrev,
      onClickPageNext,
      prevPage,
      nextPage
    };
  },
  components: {
    PageHeroInner
  }
});
</script>

<template>
  <div class="PageHero">
    <transition name="slide-up">
      <PageHeroInner :heroData="heroDataList[currentPageIndex]">
        <template #heading>
          <span v-html="heroDataList[currentPageIndex].headingHtml"></span>
        </template>
        <template #desc>
          <span v-html="heroDataList[currentPageIndex].descHtml"></span>
        </template>
      </PageHeroInner>
    </transition>

    <button class="PageHero__control -prev" @click="onClickPagePrev">
      <svg role="img">
        <use xlink:href="#svg-prev" />
      </svg>
      <span>{{ prevPage }}</span>
    </button>

    <button class="PageHero__control -next" @click="onClickPageNext">
      <svg role="img">
        <use xlink:href="#svg-next" />
      </svg>
      <span>{{ nextPage }}</span>
    </button>
  </div>
</template>
