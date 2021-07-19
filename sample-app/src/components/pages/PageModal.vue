<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { CarouselAboutData } from "@/store/app.config.ts";
import store from "@/store";
import { DispatchType, ModalId } from "@/store/app.config.ts";

export default defineComponent({
  name: "PageModal",
  props: {
    carouselData: {
      type: Object as PropType<CarouselAboutData[]>,
      required: true
    }
  },
  setup(props) {
    const cData = computed(() => props.carouselData);
    const cIndex = computed(() => store.getters.modalId);
    const isModalOpen = computed(() => store.getters.isModalOpen);
    /**
     * モーダル
     */
    const onCloseModal = () => {
      store.dispatch(DispatchType.MODAL_CLOSE);
      store.dispatch(DispatchType.SET_MODAL, ModalId.NONE);
    };

    return {
      cData,
      cIndex,
      isModalOpen,
      onCloseModal
    };
  }
});
</script>

<template>
  <teleport to="#modal">
    <div class="Modal" :class="{ '-show': isModalOpen }">
      <div class="Modal__image">
        <img :src="cData[cIndex].srcL" :alt="cData[cIndex].alt" v-if="cIndex > -1" />
      </div>
      <button type="button" class="Modal__button" @click="onCloseModal()">
        <span class="_VisuallyHidden">閉じる</span>
        <span class="Modal__buttonBar -bar1"></span>
        <span class="Modal__buttonBar -bar2"></span>
      </button>
    </div>
  </teleport>
</template>

<style lang="scss" scoped>
.Modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scale(0.94);
  z-index: 1000;
  background-color: rgba(#fff, 0.9);
  opacity: 0;
  visibility: hidden;
  transition: visibility 0s linear $SEC, opacity $SEC ease, transform $SEC ease;

  &.-show {
    transform: scale(1);
    opacity: 1;
    visibility: visible;
    transition: opacity $SEC ease, transform $SEC ease;
  }
}

.Modal__image {
  width: 100%;
  height: 100%;
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  @include md(max) {
    padding: 50px 30px;
  }
}

.Modal__button {
  position: absolute;
  top: 60px;
  right: 60px;
  width: 30px;
  height: 30px;
  padding: 0;
  background-color: transparent;
  border: 0 none;
  cursor: pointer;
  @include md(max) {
    top: 30px;
    right: 20px;
  }
}

.Modal__buttonBar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center;
  width: 4px;
  height: 40px;
  background-color: $COLOR_MAIN;
  border-radius: 2px;

  &.-bar1 {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &.-bar2 {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
}
</style>
