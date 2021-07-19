<script lang="ts">
import { defineComponent } from "vue";
import PageBreadcrumbs from "@/components/pages/PageBreadcrumbs.vue";

export default defineComponent({
  name: "Author",
  components: {
    PageBreadcrumbs
  }
});
</script>

<template>
  <PageBreadcrumbs label="Author" />
  <section class="Introduction">
    <h2 class="Introduction__heading">
      <span class="Introduction__headingLogo">
        <img src="@/assets/images/logo-monsterdive.svg" alt="ロゴ：MONSTER DIVE" />
      </span>
      <span class="Introduction__headingText">とは</span>
    </h2>
    <div class="Introduction__content">
      <p class="Introduction__description">
        どれだけインターネットがコミュニケーションを進化させても、モノゴトの根本は変わりません。ひとつひとつのコンテンツを、最適なクリエイティブとテクノロジーで、丁寧につくり上げることが「面白さ」につながります。
        <br />
        私たちは、デジタル領域のプロフェッショナルとして、顧客企業のパートナーとなり、Webと映像を融合させた世界にひとつのモノづくりに取り組み、提供しています。
      </p>
      <div class="Introduction__image">
        <div class="Introduction__imageItem">
          <img src="@/assets/images/author-member.jpg" alt="MONSTER DIVEのメンバーが会議をしている写真。" />
        </div>
      </div>
      <p class="Introduction__link">
        <a href="https://monster-dive.com/about/" target="_blank">
          MONSTER DIVEの詳しい情報
        </a>
      </p>
    </div>
  </section>

  <section class="Narrative">
    <h2 class="Narrative__heading">本書籍を出版するにあたって</h2>
    <p class="Narrative__text">
      本書籍は、MONSTER DIVE のWEBプロダクション事業部が執筆をしました。
      <br />
      なぜ WebのナレッジコミュニティなどではなくVue.jsの書籍を出版したのか。
      <br />
      書籍出版に至るまでの制作裏話を、プロジェクトチームメンバーにインタビューしました。
    </p>
    <p class="Narrative__link">
      <router-link to="/production-note">Production Noteを見る</router-link>
    </p>
  </section>
</template>

<style lang="scss" scoped>
.Introduction {
  max-width: 1000px;
  margin: 30px auto 0;
  @include lg(max) {
    padding: 0 20px;
  }
}

.Introduction__heading {
  margin: 0;
  font-size: em(16, 16);
  display: flex;
  align-items: center;
}

.Introduction__headingLogo {
  width: 433px;
  @include md(max) {
    width: 285px;
  }
}

.Introduction__headingText {
  margin: 12px 0 0 24px;
  @include md(max) {
    margin: 8px 0 0 8px;
    font-size: em(15, 16);
  }
}

.Introduction__content {
  margin-top: 20px;
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: auto 460px;
  grid-template-areas:
    "text image"
    "link image";
  @include lg(max) {
    grid-template-columns: auto 360px;
  }
  @include md(max) {
    grid-template-rows: auto auto auto;
    grid-template-columns: auto;
    grid-template-areas:
      "text"
      "image"
      "link";
  }
}

.Introduction__description {
  margin: 0 40px 0 0;
  grid-area: text;
  font-size: em(16, 16);
  font-weight: $FONT_WEIGHT_BASE_BOLD;
  line-height: 2.125;
  @include lg(max) {
    margin: 0 30px 0 0;
  }
  @include md(max) {
    margin: 0;
    font-size: em(14, 16);
    line-height: 1.64;
  }
}

.Introduction__image {
  grid-area: image;
  @include md(max) {
    margin-top: 25px;
  }
}

.Introduction__imageItem {
  overflow: hidden;
  border-radius: 20px;
  @include md(max) {
    border-radius: 10px;
  }
}

.Introduction__link {
  margin: 30px 40px 0 0;
  grid-area: link;
  text-align: right;
  @include lg(max) {
    margin: 20px 30px 0 0;
  }
  @include md(max) {
    margin: 30px 0 0 0;
    text-align: center;
  }

  > a {
    min-width: 260px;
    padding: 13px 25px;
    display: inline-block;
    font-size: em(15, 16);
    line-height: 1.6;
    text-align: center;
    text-decoration: none;
    color: $COLOR_MAIN;
    background-color: #fbfdf5;
    box-shadow: $SHADOW_BASE;
    border-radius: 10px;
    transition: box-shadow $SEC ease;
    box-sizing: border-box;
    @include md(max) {
      min-width: 240px;
      padding: 9px 20px;
      font-size: em(14, 16);
    }

    &:hover {
      box-shadow: $SHADOW_HOVER;
    }
  }
}

.Narrative {
  max-width: 1000px;
  margin: 100px auto 0;
  @include lg(max) {
    padding: 0 20px;
  }
  @include md(max) {
    margin-top: 50px;
  }
}

.Narrative__heading {
  margin: 0;
  font-size: em(24, 16);
  font-weight: $FONT_WEIGHT_BASE_DEMIBOLD;
  color: $COLOR_MAIN;
  @include md(max) {
    font-size: em(17, 16);
  }
}

.Narrative__text {
  margin: 36px 0 0;
  font-size: em(15, 16);
  font-weight: $FONT_WEIGHT_BASE_DEMIBOLD;
  line-height: 1.73;
  @include md(max) {
    margin-top: 20px;
    font-size: em(14, 16);
    line-height: 1.64;
  }
}

.Narrative__link {
  margin: 40px 0 0;
  text-align: right;
  @include md(max) {
    margin: 25px 0 0;
    text-align: center;
  }

  > a {
    min-width: 260px;
    padding: 13px 25px;
    display: inline-block;
    font-size: em(15, 16);
    line-height: 1.6;
    text-align: center;
    text-decoration: none;
    color: $COLOR_MAIN;
    background-color: #fbfdf5;
    box-shadow: $SHADOW_BASE;
    border-radius: 10px;
    transition: box-shadow $SEC ease;
    box-sizing: border-box;
    @include md(max) {
      min-width: 240px;
      padding: 9px 20px;
      font-size: em(14, 16);
    }

    &:hover {
      box-shadow: $SHADOW_HOVER;
    }
  }
}
</style>
