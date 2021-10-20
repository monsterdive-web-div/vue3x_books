<script lang="ts">
import { defineComponent } from "vue";

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
      console.log(">>onClickMenuClose");
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