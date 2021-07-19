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

<style lang="scss" scoped>
.PageHero {
  height: calc(100vh - 80px);
  overflow: hidden;

  @include md(max) {
    height: calc(100vh - 70px);

    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  }
}

.PageHero__control {
  position: absolute;
  bottom: 30px;
  font-family: $FONT_EN;
  font-size: em(28, 16);
  font-weight: 600;
  line-height: 1.6;
  color: $COLOR_MAIN;
  background-color: rgba(#fff, 0.9);
  border: 0 none;
  box-shadow: $SHADOW_BASE;
  transition: box-shadow $SEC ease;
  cursor: pointer;
  @include md(max) {
    font-size: em(18, 16);
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 20px;
    fill: $COLOR_MAIN;
    transition: transform $SEC ease;
    @include md(max) {
      width: 8px;
      height: 16px;
    }
  }

  &:hover {
    box-shadow: $SHADOW_HOVER;
  }

  &.-prev {
    left: 0;
    padding: 10px 20px 10px 40px;
    border-radius: 0 10px 10px 0;
    @include md(max) {
      padding: 4px 14px 4px 20px;
    }

    svg {
      left: 20px;
      @include md(max) {
        left: 6px;
      }
    }

    &:hover {
      svg {
        @include md(min) {
          transform: translate(-6px, -50%);
        }
      }
    }
  }

  &.-next {
    right: 0;
    padding: 10px 40px 10px 20px;
    border-radius: 10px 0 0 10px;
    @include md(max) {
      padding: 4px 20px 4px 14px;
    }

    svg {
      right: 20px;
      @include md(max) {
        right: 6px;
      }
    }

    &:hover {
      svg {
        @include md(min) {
          transform: translate(6px, -50%);
        }
      }
    }
  }
}
</style>
