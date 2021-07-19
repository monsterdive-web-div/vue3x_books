<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { HeroData } from "@/store/app.config.ts";

export default defineComponent({
  name: "PageHeroInner",
  props: {
    heroData: {
      type: Object as PropType<HeroData>,
      required: true
    }
  },
  setup(props) {
    const hData = computed(() => props.heroData);
    return { hData };
  }
});
</script>

<template>
  <div class="PageHero__wrap" :class="hData.cls">
    <div class="PageHero__inner">
      <div class="PageHero__content">
        <h1 class="PageHero__heading" :class="hData.cls">
          <slot name="heading" />
        </h1>
        <p class="PageHero__description">
          <slot name="desc" />
        </p>
        <div class="PageHero__logo" :class="hData.cls">
          <img src="@/assets/images/logo-vue.svg" alt="ロゴ：Vue.js" />
        </div>
      </div>
      <div class="PageHero__scroll">
        <span class="PageHero__scrollDot"></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.PageHero__wrap {
  height: 100%;
  @include md(min) {
    padding: 0 20px;
  }

  &.-about {
    background-image: linear-gradient(to bottom, #47d193 0%, #349369 100%);
  }

  &.-author {
    background-image: linear-gradient(to bottom, #35495e 0%, #0b0f13 100%);
  }

  &.-note {
    background-image: linear-gradient(to bottom, #fcfcfc 0%, #cdebdd 100%);
  }

  &.-qa {
    background-image: linear-gradient(to bottom, #fff 0%, #fdfff7 100%);
  }
}

.PageHero__inner {
  max-width: 1366px;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;

  @include md(min) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.PageHero__content {
  position: relative;
  z-index: 0;
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
  padding-right: percentage(575 / 1326);
  box-sizing: border-box;
  @include md(min) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @include md(max) {
    height: 100%;
    padding: 130px 20px 0;
  }
}

.PageHero__heading {
  margin: 0 0 em(40, 110);
  font-family: $FONT_EN;
  font-size: em(110, 16);
  line-height: 0.8;
  color: $COLOR_MAIN;
  @include md(max) {
    margin: 0 0 em(40, 65);
    font-size: em(65, 16);
  }

  .PageHero__wrap.-home & {
    margin: 0 0 em(60, 36);
    font-size: em(36, 16);
    line-height: 1.15;
    color: $COLOR_BASE;
    @include lg(max) {
      font-size: em(26, 16);
    }
    @include md(max) {
      margin: 0 0 em(24, 20);
      font-size: em(20, 16);
    }

    b {
      font-size: em(54, 36);
      @include lg(max) {
        font-size: em(36, 26);
      }
      @include md(max) {
        font-size: em(25, 20);
      }
    }
  }

  .PageHero__wrap.-about & {
    color: #fff;
  }

  .PageHero__wrap.-author & {
    color: #fff;
  }

  .PageHero__wrap.-note & {
    @include md(max) {
      text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff;
    }
  }

  span {
    display: inline-block;
  }
}

.PageHero__headingEn {
  width: 100%;
  margin-bottom: em(24, 100);
  font-size: em(100, 36);
  line-height: 1.2;
  color: $COLOR_MAIN;
  text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff;
  @include lg(max) {
    font-size: em(80, 26);
  }
  @include md(max) {
    margin-bottom: em(8, 60);
    font-size: em(60, 20);
  }
}

.PageHero__description {
  margin: 0;
  font-size: em(20, 16);
  line-height: 2.3;
  @include lg(max) {
    font-size: em(18, 16);
  }
  @include md(max) {
    font-size: em(15, 16);
    line-height: 1.5625;
  }
  .PageHero__wrap.-about & {
    color: #fff;
  }

  .PageHero__wrap.-author & {
    color: #fff;
  }
}

.PageHero__logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-48px, -50%);
  z-index: -1;
  width: percentage(649 / 1113);
  @include md(max) {
    top: 38px;
    transform: translateX(-86px);
    width: 336px;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  .PageHero__wrap.-home & {
    &::after {
      right: -20px;
      bottom: 45px;
      width: 784px;
      height: 269px;
      background-image: url($PATH+"hero-bg-home.svg");
      @include md(max) {
        left: -36px;
        right: auto;
        bottom: -16px;
        width: 321px;
        height: 110px;
      }
    }
  }

  .PageHero__wrap.-about & {
    &::after {
      right: 8px;
      bottom: 99px;
      width: 779px;
      height: 208px;
      background-image: url($PATH+"hero-bg-about.svg");
      @include md(max) {
        left: -32px;
        right: auto;
        bottom: 14px;
        width: 319px;
        height: 85px;
      }
    }
  }

  .PageHero__wrap.-author & {
    &::after {
      right: 27px;
      bottom: 99px;
      width: 902px;
      height: 208px;
      background-image: url($PATH+"hero-bg-author.svg");
      @include md(max) {
        left: -65px;
        right: auto;
        bottom: 10px;
        width: 369px;
        height: 85px;
      }
    }
  }

  .PageHero__wrap.-note & {
    &::after {
      right: -16px;
      bottom: 63px;
      width: 709px;
      height: 228px;
      background-image: url($PATH+"hero-bg-note.svg");
      @include md(max) {
        right: -7px;
        bottom: -72px;
        width: 484px;
        height: 163px;
      }
    }
  }

  .PageHero__wrap.-qa & {
    &::after {
      right: -20px;
      bottom: 48px;
      width: 674px;
      height: 248px;
      background-image: url($PATH+"hero-bg-qa.svg");
      @include md(max) {
        right: 55px;
        bottom: -6px;
        width: 276px;
        height: 102px;
      }
    }
  }
}

.PageHero__scroll {
  position: absolute;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%);
  width: 2px;
  height: 60px;
  background-color: $COLOR_MAIN;
  @include md(max) {
    height: 40px;
    bottom: 10px;
  }

  .PageHero__wrap.-about & {
    background-color: #fff;
  }

  .PageHero__wrap.-author & {
    background-color: #fff;
  }
}

.PageHero__scrollDot {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background-color: $COLOR_MAIN;
  border-radius: 50%;
  animation-name: moveLongScrollDot;
  animation-duration: 3s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform;
  @include md(max) {
    top: 6px;
    animation-name: moveShortScrollDot;
  }

  .PageHero__wrap.-about & {
    background-color: #fff;
  }

  .PageHero__wrap.-author & {
    background-color: #fff;
  }

  @at-root {
    @keyframes moveLongScrollDot {
      0% {
        transform: translate(-50%, 0);
      }
      50% {
        transform: translate(-50%, 34px);
      }
      100% {
        transform: translate(-50%, 0);
      }
    }

    @keyframes moveShortScrollDot {
      0% {
        transform: translate(-50%, 0);
      }
      50% {
        transform: translate(-50%, 22px);
      }
      100% {
        transform: translate(-50%, 0);
      }
    }
  }
}
</style>
