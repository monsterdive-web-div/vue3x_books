<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageCarouselItem"
});
</script>

<template>
  <li class="Carousel__item">
    <slot />
  </li>
</template>

<style lang="scss" scoped></style>
