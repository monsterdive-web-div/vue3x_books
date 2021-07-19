<script lang="ts">
import { defineComponent, computed, PropType, toRefs, reactive, onMounted, onUnmounted, ref } from "vue";
import store from "@/store";
import PageCarouselItem from "./PageCarouselItem.vue";
import useWindowSize from "@/composable/use-window-size";
import { CarouselAboutData } from "@/store/app.config.ts";
import { DispatchType } from "@/store/app.config.ts";
import { gsap } from "gsap";

export default defineComponent({
  name: "PageCarousel",
  props: {
    carouselData: {
      type: Object as PropType<CarouselAboutData[]>,
      required: true
    }
  },
  setup(props) {
    const cData = computed(() => props.carouselData);
    //カルーセルの種類によって定義
    const state = reactive({
      //カルーセルの有無
      hasCarousel: false,
      //現在アクティブの番号
      nowCarouselNum: 0,
      //合計数
      maxCarouselNum: 0,
      //移動距離
      moveDis: 676 + 20,
      //初期
      defaultX: 0,
      //現在の移動値
      setX: 0
    });
    state.hasCarousel = cData.value.length > 1 ? true : false;

    const setPos = (dw: number) => {
      if (dw > 768) {
        //PC,TB
        state.moveDis = 676 + 20;
      } else {
        //SP
        state.moveDis = 310 + 20;
      }
    };
    const { dw } = useWindowSize(() => {
      setPos(dw.value);
    });
    setPos(dw.value);

    const carouselRef = ref<HTMLElement>();

    onMounted(() => {
      if (state.hasCarousel) {
        cData.value.unshift(cData.value[cData.value.length - 1]);
        cData.value.unshift(cData.value[cData.value.length - 2]);
        cData.value.push(cData.value[2]);
        cData.value.push(cData.value[3]);
        state.maxCarouselNum = cData.value.length;
        state.defaultX = ((state.maxCarouselNum - 5) / 2) * state.moveDis;
        state.setX = state.defaultX;
        if (carouselRef.value) gsap.set(carouselRef.value, { x: state.setX });
      }
    });
    onUnmounted(() => {
      // reset
      if (state.hasCarousel) {
        cData.value.shift();
        cData.value.shift();
        cData.value.pop();
        cData.value.pop();
      }
    });

    /**
     * 前へ
     */
    const onClickCarouselPrev = () => {
      console.log("🚀 ~ file: PageCarousel.vue ~ line 79 ~ onClickCarouselPrev");
      state.nowCarouselNum--;
      state.setX = state.defaultX - state.moveDis * state.nowCarouselNum;
      if (carouselRef.value) {
        gsap.to(carouselRef.value, {
          duration: 0.3,
          ease: "sine.outout",
          x: state.setX,
          onComplete: () => {
            if (state.nowCarouselNum < 0) {
              state.nowCarouselNum = state.maxCarouselNum - 5;
              state.setX = state.defaultX - state.moveDis * state.nowCarouselNum;
              if (carouselRef.value) gsap.set(carouselRef.value, { x: state.setX });
            }
          }
        });
      }
    };
    /**
     * 次へ
     */
    const onClickCarouselNext = () => {
      console.log("🚀 ~ file: PageCarousel.vue ~ line 101 ~ onClickCarouselNext");
      state.nowCarouselNum++;
      state.setX = state.defaultX - state.moveDis * state.nowCarouselNum;
      if (carouselRef.value) {
        gsap.to(carouselRef.value, {
          duration: 0.3,
          ease: "sine.outout",
          x: state.setX,
          onComplete: () => {
            if (state.nowCarouselNum > state.maxCarouselNum - 5) {
              state.nowCarouselNum = 0;
              state.setX = state.defaultX - state.moveDis * state.nowCarouselNum;
              if (carouselRef.value) gsap.set(carouselRef.value, { x: state.setX });
            }
          }
        });
      }
    };
    /**
     * モーダル
     */
    const onOpenModal = (id: number) => {
      store.dispatch(DispatchType.MODAL_OPEN);
      store.dispatch(DispatchType.SET_MODAL, id);
    };

    return {
      cData,
      onClickCarouselPrev,
      onClickCarouselNext,
      onOpenModal,
      carouselRef,
      ...toRefs(state)
    };
  },
  components: {
    PageCarouselItem
  }
});
</script>

<template>
  <div class="Carousel" v-if="hasCarousel">
    <div class="Carousel__inner">
      <ul class="Carousel__contents" ref="carouselRef">
        <PageCarouselItem v-for="(data, index) in cData" :key="index">
          <button type="button" class="Carousel__itemButton" @click="onOpenModal(index)">
            <img class="img" :src="data.src" :alt="data.alt" :data-id="data.id" />
          </button>
        </PageCarouselItem>
      </ul>
    </div>
    <div class="Carousel__controller">
      <button type="button" class="Carousel__controllerButton -prev" @click="onClickCarouselPrev" v-if="nowCarouselNum !== 0">
        <span class="_VisuallyHidden">前のスライドへ</span>
      </button>
      <button type="button" class="Carousel__controllerButton -next" @click="onClickCarouselNext" v-if="nowCarouselNum !== maxCarouselNum - 1">
        <span class="_VisuallyHidden">次のスライドへ</span>
      </button>
    </div>
  </div>
  <div v-else>
    <p>カルーセルなし</p>
  </div>
</template>

<style lang="scss" scoped>
.Carousel {
  position: relative;
  overflow: hidden;
  margin-top: 100px;
  @include md(max) {
    margin-top: 60px;
  }
}

.Carousel__inner {
}

.Carousel__contents {
  // transition: transform 0.2s;
  margin: 0;
  padding: 0 0 6px;
  display: flex;
  justify-content: center;
}

.Carousel__item {
  list-style-type: none;
  flex-shrink: 0;
  margin: 0 10px;
  box-shadow: 3px 3px 6px rgba(#d9e6bd, 0.63);
  width: 676px;
  @include md(max) {
    width: 310px;
  }
}

.Carousel__itemButton {
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

.Carousel__controller {
}

.Carousel__controllerButton {
  position: absolute;
  top: 50%;
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

  &.-prev {
    left: 20px;
  }

  &.-next {
    right: 20px;
    transform: rotate(180deg);
    transform-origin: center;
  }
}
</style>
