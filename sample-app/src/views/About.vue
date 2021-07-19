<script lang="ts">
import { defineComponent } from "vue";
import PageBreadcrumbs from "@/components/pages/PageBreadcrumbs.vue";
import PageModal from "@/components/pages/PageModal.vue";
import { AppData } from "@/store/app.data.ts";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/vue";
import { DispatchType } from "@/store/app.config.ts";
import store from "@/store";
import "swiper/swiper.scss";

SwiperCore.use([Navigation]);

export default defineComponent({
  name: "About",
  data() {
    return {
      selectChapterIndexList: [0, 0, 0, 0, 0],
      chapterData: AppData.chapterDataList,
      chapterDetailData2: AppData.chapterDetailDataList2,
      carouselAboutData: AppData.carouselAboutDataList,
      swiperCtrl: { realIndex: 0 },
      nowCarouselNum: 0,
      maxCarouselNum: AppData.chapterDetailDataList2.length
    };
  },
  methods: {
    selectChapter(chapterIndex: number, detailIndex: number) {
      this.selectChapterIndexList[chapterIndex] = detailIndex;
    },
    onSwiper(e: SwiperCore) {
      console.log(e);
      this.swiperCtrl = e;
    },
    onSlideChange() {
      this.nowCarouselNum = this.swiperCtrl.realIndex;
    },
    onOpenModal(id: number) {
      store.dispatch(DispatchType.MODAL_OPEN);
      store.dispatch(DispatchType.SET_MODAL, id);
    },
    onClickCarouselPrev() {
      this.nowCarouselNum--;
      if (this.nowCarouselNum < 0) this.nowCarouselNum = this.maxCarouselNum - 1;
    },
    onClickCarouselNext() {
      this.nowCarouselNum++;
      if (this.nowCarouselNum > this.maxCarouselNum - 1) this.nowCarouselNum = 0;
    }
  },
  components: {
    PageBreadcrumbs,
    PageModal,
    Swiper,
    SwiperSlide
  }
});
</script>

<template>
  <PageBreadcrumbs label="About" />

  <section class="About">
    <h2 class="About__heading">
      <span>
        <em class="About__headingEn">Vue.js 3.0</em>
        を、
      </span>
      <span>わかりやすく解説します。</span>
    </h2>

    <section class="AboutDetail -detail1">
      <h3 class="AboutDetail__heading">本書の対象読者</h3>
      <ul class="AboutDetail__list">
        <li class="AboutDetail__listItem">
          HTML/CSS、TypeScript（JavaScript）の基本的な知識をお持ちの方
        </li>
        <li class="AboutDetail__listItem">
          公式ガイドやVue.js初級入門書などを読みみ終えたVue.js中級者の方
        </li>
        <li class="AboutDetail__listItem">
          Vue.jsを用いて実際のWebサイトがどのように作られているか知りたい方
        </li>
        <li class="AboutDetail__listItem">
          Vue.jsをベースにさまざまな技術の実装概念が知りたいディレクターの方
        </li>
      </ul>
    </section>

    <section class="AboutDetail -detail2">
      <h3 class="AboutDetail__heading">本書の特徴</h3>
      <p class="AboutDetail__text">
        本書は一言でいうと「Vue.jsによるクリエイティブ&テクノロジーの実践本」になります。
        <br />
        「Vue.jsプログラミングを極めたい」「Vue.jsをはじめて触ってみたい」という人はがっかりするかもしれません。
        <br />
        Webサイト制作において、分業化はますます深まりつつも、お互いをクロスオーバーする知識が必要となっている現場で、クリエイティブを発揮するデベロッパー、テクノロジーを理解するデザイナーをいかに育てていくか。その1つの解がVue.jsにあると思っています。
      </p>
    </section>

    <div class="About__book">
      <img src="@/assets/images/about-book.png" alt="本書の表紙の画像。" />
    </div>

    <div class="About__links">
      <p class="About__link">
        <a href="https://www.amazon.co.jp/dp/4863543522" class="Button" target="_blank">
          Amazonで購入する
        </a>
      </p>
      <p class="About__link">
        <a href="https://bit.ly/3w3xdgY" class="Button" target="_blank">
          HMV&BOOKS onlineで購入する
        </a>
      </p>
      <p class="About__link">
        <a href="https://books.rakuten.co.jp/rb/16729323/" class="Button" target="_blank">
          楽天ブックスで購入する
        </a>
      </p>
      <p class="About__link">
        <a href="https://www.yodobashi.com/product/100000009003430352/" class="Button" target="_blank">
          ヨドバシ.comで購入する
        </a>
      </p>
    </div>
  </section>

  <section class="Contents">
    <h2 class="Contents__heading">
      <span class="Contents__headingMain">Table of Contents</span>
      <span class="Contents__headingSub">書籍の目次を紹介します。</span>
    </h2>

    <section class="ContentsSection" v-for="(data, index) in chapterData" :key="data.category">
      <h3 class="ContentsSection__heading" :id="'toc-' + (index + 1)">
        <span class="ContentsSection__headingCategory">{{ data.category }}</span>
        <span class="ContentsSection__headingTitle">{{ data.title }}</span>
      </h3>

      <nav class="ContentsSection__menu" :aria-labelledby="'toc-' + (index + 1)">
        <ol class="ContentsSection__list">
          <li class="ContentsSection__item" v-for="(cdata, cindex) in chapterDetailData2[index]" :key="cdata.title">
            <button type="button" class="ContentsSection__itemButton" :class="{ '-current': selectChapterIndexList[index] === cindex }" @click="selectChapter(index, cindex)">
              <!--<span class="ContentsSection__itemOrder">{{ index + 1 }}-{{ cindex + 1 }}</span>-->
              <!--書籍に掲載のソースコード（上記）ではchapterDataとchapterDetailData2のindex番号を利用して「1-1、1-2…」のように出力していますが、
                  下記では書籍のチャプター、セクションとあわせて「001、002…」のように連番を出力しています。
                  app.config.tsでChapterDetailDataのインターフェースを拡張し、app.data.tsのchapterDetailDataList2に連番になるindexの値を格納し表示しています。-->
              <span class="ContentsSection__itemOrder">{{ cdata.index }}</span>
              <span class="ContentsSection__itemTitle">{{ cdata.title }}</span>
            </button>
          </li>
        </ol>
      </nav>

      <section class="ContentsSection__sub">
        <h4 class="_VisuallyHidden">
          {{ index + 1 }}-{{ selectChapterIndexList[index] }}
          {{ chapterDetailData2[index][selectChapterIndexList[index]].title }}
        </h4>

        <ol class="ContentsSection__subList" v-if="chapterDetailData2[index][selectChapterIndexList[index]].subList !== undefined">
          <li class="ContentsSection__subItem" v-for="sdata in chapterDetailData2[index][selectChapterIndexList[index]].subList" :key="sdata">「{{ sdata }}」</li>
        </ol>
        <p class="ContentsSection__subDescription" v-html="chapterDetailData2[index][selectChapterIndexList[index]].detailHtml"></p>
      </section>
    </section>
  </section>

  <swiper :slides-per-view="2" :centeredSlides="true" :space-between="10" :navigation="{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }" @swiper="onSwiper" @slideChange="onSlideChange">
    <swiper-slide v-for="(data, index) in carouselAboutData" :key="index">
      <button type="button" class="swiper-slide-button" @click="onOpenModal(index)">
        <img class="img" :src="data.src" :alt="data.alt" :data-id="data.id" />
      </button>
    </swiper-slide>
    <div class="swiper-controller">
      <button type="button" class="swiper-button-prev" @click="onClickCarouselPrev" v-show="nowCarouselNum !== 0">
        <span class="_VisuallyHidden">前のスライドへ</span>
      </button>
      <button type="button" class="swiper-button-next" @click="onClickCarouselNext" v-show="nowCarouselNum !== maxCarouselNum">
        <span class="_VisuallyHidden">次のスライドへ</span>
      </button>
    </div>
  </swiper>

  <PageModal :carouselData="carouselAboutData" />
</template>

<style lang="scss" scoped>
.Button {
  padding: em(13, 15) em(20, 15);
  display: block;
  font-size: em(15, 18);
  line-height: 1.6;
  text-align: center;
  text-decoration: none;
  color: #fff;
  background-color: $COLOR_MAIN;
  border-radius: 10px;
  box-shadow: $SHADOW_BASE;
  transition: background-color $SEC ease, color $SEC ease;
  @include md(max) {
    padding: em(11, 12) em(4, 12);
    font-size: em(12, 16);
    line-height: 1.5;
  }

  &:hover {
    color: $COLOR_MAIN;
    background-color: #fff;
  }
}

.About {
  max-width: 1000px;
  margin: 20px auto 0;
  display: grid;
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 55% 45%;
  grid-template-areas:
    "heading heading"
    "detail1   image"
    "detail2   image"
    "link      image";

  @include md(max) {
    margin-top: 30px;
    padding: 0 20px;
    grid-template-rows: auto auto auto auto auto;
    grid-template-columns: 100%;
    grid-template-areas:
      "heading"
      "detail1"
      "detail2"
      "image"
      "link";
  }
}

.About__heading {
  margin: 0;
  grid-area: heading;
  font-size: em(38, 16);
  @include md(max) {
    font-size: em(27, 16);
    line-height: 1.2;
  }

  span {
    display: inline-block;
  }
}

.About__headingEn {
  font-family: $FONT_EN;
  font-size: em(70, 38);
  font-style: normal;
  color: $COLOR_MAIN;
  @include md(max) {
    font-size: em(45, 27);
  }
}

.About__book {
  grid-area: image;
  @include md(min) {
    margin-left: 50px;
  }
}

.About__links {
  margin-top: 60px;
  display: flex;
  justify-content: space-between;
  grid-area: link;
  flex-wrap: wrap;
  @include md(max) {
    margin-top: 30px;
  }
}

.About__link {
  width: calc((100% - 30px) / 2);
  margin: 0 0 15px;
  @include md(max) {
    width: calc((100% - 15px) / 2);
    margin: 0 0 10px;
  }
}

.AboutDetail {
  margin-top: 50px;
  @include md(max) {
    margin-top: 40px;
  }

  &.-detail1 {
    grid-area: detail1;
  }

  &.-detail2 {
    grid-area: detail2;
  }

  .About__heading + & {
    margin-top: 60px;
    @include md(max) {
      margin-top: 30px;
    }
  }
}

.AboutDetail__heading {
  margin: 0;
  font-size: em(24, 16);
  font-weight: bold;
  color: $COLOR_MAIN;
  @include md(max) {
    font-size: em(17, 16);
  }
}

.AboutDetail__list {
  margin: 12px 0 0;
  padding: 0;
}

.AboutDetail__listItem {
  list-style-type: none;
  padding-left: 1em;
  text-indent: -1em;
  font-weight: 600;

  &:not(:first-child) {
    margin-top: 10px;
  }

  &::before {
    content: "・";
  }
}

.AboutDetail__text {
  margin: em(12, 15) 0 0;
  font-size: em(15, 16);
  font-weight: 600;
  line-height: 1.73;
}

.Contents {
  max-width: 1000px;
  margin: 100px auto 0;
  padding: 0 20px;
  @include md(max) {
    margin-top: 60px;
  }
}

.Contents__heading {
  margin: 0;
  font-size: em(46, 16);
  @include md(max) {
    font-size: em(35, 16);
  }
}

.Contents__headingMain {
  display: block;
  font-family: $FONT_EN;
  color: $COLOR_MAIN;
}

.Contents__headingSub {
  display: block;
  font-size: em(16, 46);
  @include md(max) {
    font-size: em(14, 35);
  }
}

.ContentsSection {
  margin-top: 50px;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 400px 1fr;
  grid-template-areas:
    "heading heading"
    "menu   contents";
  @include md(max) {
    margin-top: 30px;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto;
    grid-template-areas:
      "heading"
      "menu"
      "contents";
  }
}

.ContentsSection__heading {
  margin: 0;
  padding-bottom: 8px;
  grid-area: heading;
  font-size: em(20, 16);
  border-bottom: 2px solid $COLOR_MAIN;
  @include md(max) {
    font-size: em(17, 16);
  }
}

.ContentsSection__headingCategory {
  font-family: $FONT_EN;
  font-weight: 400;
  font-size: em(30, 20);
  color: $COLOR_MAIN;
  @include md(max) {
    margin-bottom: 4px;
    display: block;
    font-size: em(20, 17);
  }
}

.ContentsSection__headingTitle {
  font-weight: 500;
  @include md(max) {
    display: block;
  }

  &:not(:first-child) {
    @include md(min) {
      margin-left: 12px;
    }
  }
}

.ContentsSection__menu {
  margin-top: 30px;
  padding-right: 40px;
  grid-area: menu;
  @include md(max) {
    margin-top: 20px;
    padding-right: 0;
  }
}

.ContentsSection__list {
  margin: 0;
  padding: 0;
}

.ContentsSection__item {
  list-style-type: none;

  &:not(:first-child) {
    margin-top: 30px;
    @include md(max) {
      margin-top: 12px;
    }
  }
}

.ContentsSection__itemButton {
  position: relative;
  padding: 0 0 0 em(24, 16);
  display: inline-flex;
  text-align: left;
  color: $COLOR_BASE;
  background-color: transparent;
  border: 0 none;
  cursor: pointer;
  transition: color $SEC ease;
  @include md(max) {
    font-size: em(14, 16);
  }

  &:hover {
    color: $COLOR_MAIN;
  }

  &:focus {
    outline: 2px solid $COLOR_MAIN;
    outline-offset: 6px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 0;
    transform: translateX(-5px) rotate(-90deg);
    transform-origin: center;
    width: 16px;
    height: 14px;
    background-image: url($PATH+"logo-vue.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    opacity: 0;
    transition: opacity $SEC ease, transform $SEC ease;
    @include md(max) {
      width: 14px;
      height: 12px;
    }
  }

  &.-current {
    &::before {
      opacity: 1;
      transform: rotate(-90deg);
    }
  }
}

.ContentsSection__itemOrder {
  min-width: em(40, 16);
  margin-right: em(8, 16);
  flex-shrink: 0;
  color: $COLOR_MAIN;
}

.ContentsSection__itemTitle {
}

.ContentsSection__sub {
  margin-top: 30px;
  grid-area: contents;
  @include md(max) {
    margin-top: 20px;
    padding-left: 21px;
  }
}

.ContentsSection__subList {
  margin: em(-6, 15) 0 0 -0.6em;
  padding: 0;
  font-size: em(15, 16);
  display: flex;
  flex-wrap: wrap;
  @include md(max) {
    margin: 0;
    display: block;
    font-size: em(12, 16);
  }
}

.ContentsSection__subItem {
  list-style-type: none;
  margin: em(6, 15) 0 0 0;
  @include md(max) {
    margin: 0;
  }

  &:not(:first-child) {
    @include md(max) {
      margin-top: em(8, 12);
    }
  }
}

.ContentsSection__subDescription {
  margin: 0;
  font-size: em(15, 16);
  line-height: 1.73;
  @include md(max) {
    font-size: em(12, 16);
  }

  .ContentsSection__subList + & {
    margin-top: 30px;
    @include md(max) {
      margin-top: 12px;
    }
  }
}

.swiper-container {
  position: relative;
  z-index: 0;
  overflow: hidden;
  margin-top: 100px;
  @include md(max) {
    margin-top: 60px;
  }
}

.swiper-wrapper {
  margin: 0;
  padding: 0 0 6px;
  display: flex;
}

.swiper-slide {
  width: auto;
  flex-shrink: 0;
  box-shadow: 3px 3px 6px rgba(#d9e6bd, 0.63);
  @include md(max) {
    width: 310px;
  }
}

.swiper-slide-button {
  padding: 0;
  display: block;
  background-color: transparent;
  border: 0 none;
  cursor: pointer;

  &:focus {
    outline: 5px solid $COLOR_MAIN;
    outline-offset: -5px;
  }
}

.swiper-button-prev {
  position: absolute;
  top: 50%;
  left: 20px;
  z-index: 2;
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: 0 none;
  background-image: url($PATH+"arrow-slide.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  @include md(max) {
    width: 20px;
    height: 20px;
  }

  &:focus {
    @include focus-base;
  }

  &.swiper-button-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}

.swiper-button-next {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: rotate(180deg);
  transform-origin: center;
  z-index: 2;
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: transparent;
  border: 0 none;
  background-image: url($PATH+"arrow-slide.svg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  cursor: pointer;
  @include md(max) {
    width: 20px;
    height: 20px;
  }

  &:focus {
    @include focus-base;
  }

  &.swiper-button-disabled {
    opacity: 0.6;
    pointer-events: none;
  }
}
</style>
