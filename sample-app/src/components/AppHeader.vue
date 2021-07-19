<script lang="ts">
import { defineComponent, computed, onUpdated } from "vue";
import AppMenuTrigger from "@/components/header/AppMenuTrigger.vue";
import AppMenu from "@/components/AppMenu.vue";
import store from "@/store";
import anime from "animejs";

export default defineComponent({
  name: "AppHeader",
  setup() {
    const isMenuOpen = computed(() => store.getters.isMenuOpen);

    console.log(">>AppHeader >setup | isMenuOpen : " + isMenuOpen.value);

    onUpdated(() => {
      anime({
        targets: ".AppHeader__bgMorph",
        d: [
          {
            value: "M 7.7423617,6.5524041 C 0.14213171,13.241204 -0.28352929, 25.218399 6.5488487,32.446038 13.237649,40.04627 24.578354, 40.568996 32.442483,33.639553 39.813699,26.434583 40.216105, 14.96193 33.635997,7.7459191 26.935569,0.39795815 15.101951, -0.40029585 7.7423617,6.5524041 Z"
          },
          {
            value: "M 19.499615,1.5030295 C 15.341558,11.017856 5.4243459, 31.217087 1.2037966,39.132841 10.361482,39.005187 29.91693, 39.467197 38.833611,39.035804 34.978274,30.942616 24.624859, 11.418574 20.165144,1.5845618 18.73688,1.6665173 20.913606, 1.4728946 19.499615,1.5030295 Z"
          }
        ],
        easing: isMenuOpen.value ? "easeOutQuad" : "easeInQuad",
        duration: 400
      });
    });

    return {
      isMenuOpen
    };
  },
  components: {
    AppMenuTrigger,
    AppMenu
  }
});
</script>

<template>
  <header class="AppHeader" :class="{ '-open': isMenuOpen }">
    <nav class="AppHeader__nav" aria-label="グローバルメニュー">
      <AppMenuTrigger />
      <div class="AppHeader__list" role="list">
        <div class="AppHeader__home" role="listitem">
          <router-link to="/" class="AppHeader__homeLink">
            <span class="AppHeader__homeLogo">
              <img src="@/assets/images/logo-vue.svg" alt="ロゴ：Vue.js" />
            </span>
            <span class="AppHeader__homeText">
              <span class="AppHeader__homeTextMain">
                <span>現場で使える</span>
                <span>Vue.js 3.X</span>
              </span>
              <span class="AppHeader__homeTextSub">実践ガイド</span>
            </span>
            <span class="_VisuallyHidden">ホーム</span>
          </router-link>
        </div>
        <div class="AppHeader__note" role="listitem">
          <router-link to="/production-note" class="AppHeader__noteLink">
            <em class="AppHeader__noteText">Production note</em>
          </router-link>
        </div>
        <div class="AppHeader__content">
          <AppMenu />
        </div>
      </div>
      <div class="AppHeader__bg">
        <svg class="AppHeader__bgImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 50">
          <path
            class="AppHeader__bgMorph"
            style="transform:rotate(180deg) scaleX(1.2);transform-origin:41% 40%;"
            d="M 19.499615,1.5030295 C 15.341558,11.017856 5.4243459,
            31.217087 1.2037966,39.132841 10.361482,39.005187 29.91693,
            39.467197 38.833611,39.035804 34.978274,30.942616 24.624859,
            11.418574 20.165144,1.5845618 18.73688,1.6665173 20.913606,
            1.4728946 19.499615,1.5030295 Z"
          />
        </svg>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.AppHeader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(#fff, 0.9);
}

.AppHeader__nav {
  padding: 0 160px 0 38px;
  @include lg(max) {
    padding: 0 140px 0 38px;
  }
  @include md(max) {
    padding: 0 83px 0 24px;
  }
}

.AppHeader__list {
  height: 80px;
  display: flex;
  align-items: center;
  @include md(max) {
    height: 70px;
  }
}

.AppHeader__home {
  > a {
    &:focus {
      @include focus-base;
    }
  }
}

.AppHeader__homeLink {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.AppHeader__homeLogo {
  width: 58px;
  flex-shrink: 0;
  @include md(max) {
    width: 46px;
  }
}

.AppHeader__homeText {
  font-size: em(18, 16);
  color: $COLOR_BASE;
  @include lg(max) {
    font-size: em(16, 16);
  }
  @include md(max) {
    margin-left: em(6, 14);
    font-size: em(14, 16);
  }

  > span {
    display: inline-block;
    @include lg(max) {
      display: block;
    }
  }
}

.AppHeader__homeTextMain {
  margin-right: 20px;
  font-family: $FONT_EN;
  font-size: em(24, 18);
  color: $COLOR_MAIN;
  @include lg(max) {
    margin-right: 0;
    font-size: em(20, 16);
  }
  @include md(max) {
    font-size: 1em;
  }

  > span {
    @include md(max) {
      display: block;
    }
  }
}

.AppHeader__homeTextSub {
  @include md(max) {
    @include visually-hidden;
  }
}

.AppHeader__note {
  margin-left: auto;
  padding-left: 32px;
  flex-shrink: 0;
  @include md(max) {
    padding-left: 0;
  }

  > a {
    &:focus {
      @include focus-base;
    }
  }
}

.AppHeader__noteLink {
  position: relative;
  display: block;
  text-decoration: none;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -22px;
    transform: translateY(-50%);
    width: 35px;
    height: 34px;
    background-image: url($PATH+"icon-note.svg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    @include lg(max) {
      left: -20px;
      width: 32px;
      height: 30px;
    }
    @include md(max) {
      position: static;
      display: block;
      transform: none;
    }
  }
}

.AppHeader__noteText {
  padding: 0 20px;
  display: block;
  font-style: normal;
  font-family: $FONT_EN;
  font-size: em(20, 16);
  line-height: 1.5;
  color: #fff;
  background-color: $COLOR_MAIN;
  border-radius: 15px;
  @include lg(max) {
    padding: 0 14px;
    font-size: em(18, 16);
  }
  @include md(max) {
    @include visually-hidden;
  }
}

.AppHeader__content {
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(#fff, 0.8);
    pointer-events: none;
    opacity: 0;
  }

  .AppHeader.-open & {
    &::before {
      opacity: 1;
    }
  }
}

.AppHeader__bg {
  position: fixed;
  top: -4px;
  right: 13px;
  z-index: -1;
  width: 125px;
  height: 109px;
  pointer-events: none;

  transition-duration: 0.4s;
  transition-property: transform;

  @include md(max) {
    right: -12px;
    width: 96px;
    height: 83px;
  }

  .AppHeader.-open & {
    top: vw(283, $XL);
    left: vw(930, $XL);
    z-index: 1;
    width: vw(125, $XL);
    height: vw(109, $XL);
    transform: scale(19.5) rotate(-135deg);
    // transform-origin: center;
    right: auto;

    @include md(max) {
      top: vw(153, $XS);
      transform: scale(10) rotate(-143deg);
      left: vw(180, $XS);
      width: vw(125, $XS);
      height: vw(109, $XS);
    }
  }
}

.AppHeader__bgImage {
  width: 100%;
  height: 100%;
  display: block;
  fill: $COLOR_MAIN;
}
</style>
