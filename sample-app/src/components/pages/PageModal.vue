<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { CarouselAboutData } from "@/store/app.config.ts";
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
    /**
     * モーダル
     */
    const onCloseModal = () => {
      console.log(">>onCloseModal");
    };

    return {
      cData,
      onCloseModal
    };
  }
});
</script>

<template>
  <teleport to="#modal">
    <div class="Modal">
      <div class="Modal__image">
        <img :src="cData[cIndex].srcL" :alt="cData[cIndex].alt" />
      </div>
      <button type="button" class="Modal__button" @click="onCloseModal()">
        <span class="_VisuallyHidden">閉じる</span>
        <span class="Modal__buttonBar -bar1"></span>
        <span class="Modal__buttonBar -bar2"></span>
      </button>
    </div>
  </teleport>
</template>
