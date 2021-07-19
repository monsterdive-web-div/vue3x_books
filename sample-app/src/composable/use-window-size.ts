import { onMounted, onUnmounted, reactive, toRefs } from "vue";

export default (atResize?: () => void) => {
  const state = reactive({
    ww: window.innerWidth, // スクロールバー含む
    wh: window.innerHeight, // スクロールバー含む
    dw: document.documentElement.clientWidth, // スクロールバー含まず
    dh: document.documentElement.clientHeight // スクロールバー含まず
  });

  const onResize = () => {
    state.ww = window.innerWidth;
    state.wh = window.innerHeight;
    state.dw = document.documentElement.clientWidth;
    state.dh = document.documentElement.clientHeight;

    if (atResize) {
      atResize();
    }
  };

  onMounted(() => window.addEventListener("resize", onResize));
  onUnmounted(() => window.removeEventListener("resize", onResize));

  return {
    ...toRefs(state)
  };
};
