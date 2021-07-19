<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";
import { DispatchType } from "@/store/app.config.ts";

export default defineComponent({
  name: "AppMenuLink",
  props: {
    href: {
      type: String,
      required: true,
      default: "/"
    }
  },
  methods: {
    onClickMenuClose() {
      store.dispatch(DispatchType.MENU_CLOSE);
    }
  }
});
</script>

<template>
  <router-link :to="href" class="AppMenu__link">
    <span @click="onClickMenuClose">
      <slot />
    </span>
  </router-link>
</template>

<style lang="scss" scoped>
.AppMenu__link {
  display: inline-block;
  vertical-align: top;
  font-family: $FONT_EN;
  font-weight: $FONT_WEIGHT_EN_BOLD;
  font-size: em(63, 16);
  line-height: 1.4;
  color: #fff;
  text-decoration: none;
  @include md(max) {
    font-size: em(40, 16);
  }
}
</style>
