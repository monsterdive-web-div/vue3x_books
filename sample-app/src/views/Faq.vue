<script lang="ts">
import { defineComponent } from "vue";
import PageBreadcrumbs from "@/components/pages/PageBreadcrumbs.vue";
import PageAccordion from "@/components/pages/PageAccordion.vue";
import { AppData } from "@/store/app.data.ts";

export default defineComponent({
  name: "Faq",
  data() {
    return {
      faqData: AppData.faqDataList
    };
  },
  components: {
    PageBreadcrumbs,
    PageAccordion
  }
});
</script>

<template>
  <PageBreadcrumbs label="Q&A" />
  <section class="QA">
    <h2 class="QA__heading">よくある質問</h2>
    <div class="QA__contents">
      <div class="QA__item" v-for="data of faqData" :key="data.question">
        <PageAccordion>
          <template #head>
            <span v-html="data.question"></span>
          </template>
          <template #body>
            <span class="Accordion__text" v-html="data.answer"></span>
          </template>
        </PageAccordion>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.QA {
  max-width: 1000px;
  margin: 36px auto 0;
  @include lg(max) {
    padding: 0 20px;
  }
}

.QA__heading {
  margin: 0;
  font-size: em(30, 16);
  color: $COLOR_MAIN;
  font-weight: $FONT_WEIGHT_BASE_DEMIBOLD;
  @include md(max) {
    font-size: em(24, 16);
  }
}

.QA__contents {
  margin-top: 60px;
  @include md(max) {
    margin-top: 20px;
  }
}

.QA__item {
  & + & {
    margin-top: 20px;
  }
}

.Accordion__text {
  position: relative;
  margin: 0;
  line-height: 1.875;
  @include md(max) {
    font-size: em(14, 16);
    line-height: 1.64;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -64px;
    transform: translateY(-50%);
    width: 23px;
    height: 22px;
    background-image: url($PATH+"faq-a.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    @include md(max) {
      top: 6px;
      left: -40px;
      width: 21px;
      height: 20px;
    }
  }

  ::v-deep(a) {
    color: $COLOR_MAIN;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
