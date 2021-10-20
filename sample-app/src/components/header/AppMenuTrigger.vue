<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppMenuTrigger",
  methods: {
    onClickMenuToggle() {
      console.log(">>onClickMenuToggle");
    }
  }
});
</script>

<template>
  <button type="button" class="AppHeader__trigger" @click="onClickMenuToggle">
    <span class="_VisuallyHidden">メニューを開く</span>
    <span class="AppHeader__triggerBar -top"></span>
    <span class="AppHeader__triggerBar -center"></span>
    <span class="AppHeader__triggerBar -bottom"></span>
  </button>
</template>