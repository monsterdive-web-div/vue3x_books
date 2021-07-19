<script lang="ts">
import { defineComponent } from "vue";
import PageBreadcrumbs from "@/components/pages/PageBreadcrumbs.vue";

export default defineComponent({
  name: "ProductionNote",
  components: {
    PageBreadcrumbs
  }
});
</script>

<template>
  <PageBreadcrumbs label="Production note" />
  <section class="ProductionNote">
    <h2 class="ProductionNote__heading">
      <span>Production Noteを⾒るには</span>
      <span>ログインが必要です。</span>
    </h2>
    <div class="ProductionNote__inner">
      <ul class="ProductionNote__buttons">
        <li class="ProductionNote__buttonItem">
          <button type="button" class="ProductionNote__button">
            <span class="-facebook">Facebook ID</span>
            でLogin
          </button>
        </li>
        <li class="ProductionNote__buttonItem">
          <button type="button" class="ProductionNote__button">
            <span class="-twitter">Twitter ID</span>
            でLogin
          </button>
        </li>
        <li class="ProductionNote__buttonItem">
          <button type="button" class="ProductionNote__button">Google ID でLogin</button>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.ProductionNote {
  margin-top: 36px;
}

.ProductionNote__heading {
  max-width: 1000px;
  margin: 0 auto;
  font-size: em(30, 16);
  line-height: 1.73;
  color: $COLOR_MAIN;
  @include lg(max) {
    padding: 0 20px;
  }
  @include md(max) {
    font-size: em(22, 16);
  }

  > span {
    display: inline-block;
  }
}

.ProductionNote__inner {
  margin-top: 60px;
  padding: 80px 0;
  background-color: #fafdf5;
  box-shadow: 0 3px 6px rgba(#000, 0.06);
  @include md(max) {
    margin-top: 30px;
    padding: 40px 20px;
  }
}

.ProductionNote__buttons {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  @include md(max) {
    display: block;
  }
}

.ProductionNote__buttonItem {
  list-style-type: none;
  width: calc((100% - 40px) / 3);
  @include md(max) {
    width: 100%;
  }

  &:not(:first-child) {
    @include md(min) {
      margin-left: 20px;
    }
    @include md(max) {
      margin-top: 15px;
    }
  }
}

.ProductionNote__button {
  width: 100%;
  padding: 24px 0;
  display: block;
  font-size: em(20, 16);
  line-height: 1.6;
  background-color: transparent;
  border: 0 none;
  border-radius: 40px;
  box-shadow: $SHADOW_BASE;
  cursor: pointer;
  @include md(max) {
    padding: 13px 0;
    font-size: em(15, 16);
  }

  > span {
    &.-facebook {
      color: #1877f2;
    }
    &.-twitter {
      color: #1da1f2;
    }
  }
}
</style>
