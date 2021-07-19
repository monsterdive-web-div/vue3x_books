<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted, ref } from "vue";

export default defineComponent({
  name: "PageAccordion",
  setup() {
    const state = reactive({
      height: "1em",
      isOpen: false
    });
    // <div class="head" ref="head">
    const head = ref<HTMLElement>();
    // <div class="body" ref="body">
    const body = ref<HTMLElement>();

    const open = () => {
      const headHeight: number = head.value?.offsetHeight || 0;
      const bodyHeight: number = body.value?.offsetHeight || 0;
      state.height = `${headHeight + bodyHeight}px`;
      state.isOpen = true;
    };

    const close = () => {
      state.height = `${head.value?.offsetHeight}px`;
      state.isOpen = false;
    };

    const toggle = () => {
      state.isOpen ? close() : open();
    };
    onMounted(() => {
      state.height = `${head.value?.offsetHeight}px`;
    });

    return {
      toggle,
      head,
      body,
      ...toRefs(state)
    };
  }
});
</script>

<template>
  <div class="Accordion" :class="{ '-open': isOpen }" :style="{ height }">
    <h3 class="Accordion__heading">
      <button type="button" class="Accordion__headingButton" ref="head" @click="toggle">
        <slot name="head" />
      </button>
    </h3>
    <div class="Accordion__content" ref="body">
      <slot name="body" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Accordion {
  position: relative;
  overflow: hidden;
  transition: height $SEC ease;
  will-change: height;
  border-radius: 10px;
  box-shadow: $SHADOW_BASE;

  &.-open {
    &::after {
      transform: rotate(180deg);
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 57px;
    right: 30px;
    width: 30px;
    height: 6px;
    background-color: $COLOR_MAIN;
    @include md(max) {
      top: 35px;
      right: 15px;
      width: 15px;
      height: 3px;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 57px;
    right: 30px;
    transform: rotate(90deg);
    transform-origin: center;
    width: 30px;
    height: 6px;
    background-color: $COLOR_MAIN;
    transition: transform $SEC ease;
    @include md(max) {
      top: 35px;
      right: 15px;
      width: 15px;
      height: 3px;
    }
  }
}

.Accordion__heading {
  margin: 0;
  font-size: em(16, 16);
  font-weight: $FONT_WEIGHT_BASE_NORMAL;

  &::before {
    content: "";
    position: absolute;
    top: 48px;
    left: 58px;
    width: 26px;
    height: 24px;
    background-image: url($PATH+"faq-q.svg");
    background-repeat: no-repeat;
    background-size: 100%;
    @include md(max) {
      top: 24px;
      left: 20px;
      width: 23px;
      height: 22px;
    }
  }
}

.Accordion__headingButton {
  width: 100%;
  padding: 44px 120px;
  display: block;
  font-size: em(18, 16);
  line-height: 1.8;
  text-align: left;
  color: $COLOR_BASE;
  background-color: transparent;
  border: 0 none;
  cursor: pointer;
  @include md(max) {
    padding: 20px 40px 20px 60px;
    font-size: em(15, 16);
  }

  &:focus {
    outline: none;

    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 10px;
    pointer-events: none;
    border: 2px solid $COLOR_MAIN;
    opacity: 0;
  }
}

.Accordion__content {
  padding: 20px 120px 40px;
  @include md(max) {
    padding: 20px 20px 20px 60px;
  }
}
</style>
