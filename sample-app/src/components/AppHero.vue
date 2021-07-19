<script lang="ts">
import { defineComponent, computed, onMounted, onUpdated, ref, reactive, nextTick } from "vue";
import router from "@/router";
import PageHeroInner from "@/components/pages/PageHeroInner.vue";
import { AppData } from "@/store/app.data.ts";
import * as THREE from "three";
// import dat from "dat.gui";
// import Stats from "three/examples/jsm/libs/stats.module";
import { OrbitControlsExpansion } from "@/composable/OrbitControlsExpansion";
import Proton from "three.proton.js";
import { getGeometry } from "@/store/app.utils.ts";
import { ShaderMaterial } from "three";
import { gsap } from "gsap";

export default defineComponent({
  name: "AppHero",
  props: {
    nowPage: {
      type: String,
      required: true
    }
  },
  setup(props) {
    console.log(">>AppHero >setup");
    const pageList: string[] = [];
    const pages = computed(() => router.options.routes);
    for (const page of pages.value) {
      if (typeof page.name == "string") pageList.push(page.name);
    }
    const currentPageIndex = computed(() => pageList.indexOf(props.nowPage));
    const heroDataList = computed(() => AppData.heroDataList);
    const showText = ref(false);
    nextTick(() => {
      showText.value = true;
    });

    /*----------------------- Three.js -----------------------*/
    const state = reactive({
      //画面横幅
      stageWidth: window.innerWidth,
      //画面縦幅
      stageHight: window.innerHeight,
      //ピクセル比率
      deviceRatio: window.devicePixelRatio,
      //containerの横幅
      containerWidth: 0,
      //containerの縦幅
      containerHeight: 0,
      //マウスムーブの係数
      evtAdjust: 0.025,
      //背景画像のアスペクト比
      bgimageAspect: 0,
      //アニメーション中かどうか
      isAnimation: false,
      //現在の移動値
      setX: 0
    });

    //コンテナ
    const container = ref<HTMLElement>();
    if (container.value != undefined) {
      state.containerWidth = container.value.offsetWidth;
      state.containerHeight = container.value.offsetHeight;
    }
    //シーン
    const scene = new THREE.Scene();
    //カメラ
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 1000);
    camera.position.set(0, 0, 2);
    //ライト
    const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
    scene.add(ambient);
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 10, 6);
    scene.add(light);
    //レンダラー
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(state.stageWidth * state.deviceRatio, state.stageHight * state.deviceRatio);
    renderer.domElement.style.width = state.stageWidth + "px";
    renderer.domElement.style.height = state.stageHight + "px";
    renderer.domElement.id = "canvas_threejs";
    //Control
    let controls: OrbitControlsExpansion;
    //背景
    const bgImages = ["./img/texture/hero-bg-top.png", "./img/texture/hero-bg-about.png", "./img/texture/hero-bg-author.png", "./img/texture/hero-bg-note.png", "./img/texture/hero-bg-qa.png"];

    const shaderTextureArr: THREE.Texture[] = [];
    const promises: Promise<THREE.Texture>[] = [];
    let bgGeometry: THREE.BufferGeometry, bgMaterial: ShaderMaterial, bgMaterial2: ShaderMaterial;
    let currentMesh: THREE.Mesh, nextMesh: THREE.Mesh;
    const settings = {
      progress: 0
      // ,next: function(){
      //   console.log(">>AppHero >settings >next");
      // }
    };

    /* デバッグ
    settings.next = () => {
      bgChange(1);
    };
    const gui = new dat.GUI();
    gui.add(settings, "progress", 0, 1, 0.01);
    gui.add(settings, "next");

    const stats = Stats();
    stats.showPanel( 0 );
    document.body.appendChild( stats.dom );
    //*/

    /**
     * パーティクル
     */
    const createSprite = () => {
      const map = new THREE.TextureLoader().load("./img/texture/triangle.png");
      const material = new THREE.SpriteMaterial({ map: map });
      return new THREE.Sprite(material);
    };
    const createEmitter = () => {
      const emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(new Proton.Span(0, 5), new Proton.Span(0.1, 0.25));
      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(10));
      emitter.addInitialize(new Proton.Life(2, 8));
      emitter.addInitialize(new Proton.Body(createSprite()));
      emitter.addInitialize(new Proton.Position(new Proton.BoxZone(3)));
      emitter.addInitialize(new Proton.Velocity(0.2, new Proton.Vector3D(0, 0.1, 0.1), 0.2));
      emitter.addBehaviour(new Proton.Scale(Math.random() * 0.03 + 0.05, 0.01));
      emitter.addBehaviour(new Proton.Alpha(1, 0, Infinity, Proton.easeInQuart));
      emitter.addBehaviour(new Proton.Color(0x42b883));
      emitter.p.x = 0;
      emitter.p.y = 0;
      emitter.p.z = 1.5;
      emitter.emit();
      return emitter;
    };
    const proton: Proton = new Proton();
    proton.addEmitter(createEmitter());
    proton.addRender(new Proton.SpriteRender(scene));

    /**
     * マウスムーブ
     */
    const onMouseMoveHandler = (e: MouseEvent) => {
      // console.log(">>onMouseMoveHandler | mX,mY : " + e.clientX + ", " + e.clientY);
      if (controls != null) controls.handleMouseMoveRotate((e.clientX - state.stageWidth * 0.5) * state.evtAdjust, (e.clientY - state.stageHight * 0.5) * state.evtAdjust);
    };

    /**
     * リサイズ
     */
    const onResize = () => {
      if (container.value != undefined) {
        state.containerWidth = container.value.offsetWidth;
        state.containerHeight = container.value.offsetHeight;
      }
      renderer.setSize(state.containerWidth, state.containerHeight);
      camera.aspect = state.containerWidth / state.containerHeight;

      //背景
      let a1, a2;
      if (state.containerHeight / state.containerWidth < state.bgimageAspect) {
        a2 = ((1 / state.bgimageAspect) * state.containerHeight) / state.containerWidth;
        a1 = 1;
      } else {
        a2 = 1;
        a1 = (state.containerWidth / state.containerHeight) * state.bgimageAspect;
      }
      if (bgMaterial != null && bgMaterial2 != null) {
        bgMaterial.uniforms.resolution.value.x = state.containerWidth;
        bgMaterial2.uniforms.resolution.value.x = state.containerWidth;
        bgMaterial.uniforms.resolution.value.y = state.containerHeight;
        bgMaterial2.uniforms.resolution.value.y = state.containerHeight;
        bgMaterial.uniforms.resolution.value.z = a1;
        bgMaterial2.uniforms.resolution.value.z = a1;
        bgMaterial.uniforms.resolution.value.w = a2;
        bgMaterial2.uniforms.resolution.value.w = a2;
      }

      const dist = camera.position.z;
      const height = 2;
      const koef = 1;
      if (currentMesh != null && nextMesh != null) {
        nextMesh.scale.set(camera.aspect, 1, 1);
        currentMesh.scale.set(camera.aspect, 1, 1);
      }
      camera.fov = 2 * (180 / Math.PI) * Math.atan(height / (2 * dist * koef));
      camera.updateProjectionMatrix();
    };
    /**
     * 背景チェンジ
     */
    const bgChange = (nextPage: number) => {
      console.log(">>AppHero >bgChange | state.isAnimation : " + state.isAnimation);
      if (!state.isAnimation) {
        console.log(">>AppHero >bgChange | nextPage : " + nextPage);
        console.log(">>AppHero >bgChange | settings.progress : " + settings.progress);
        state.isAnimation = true;
        const nextTexture = shaderTextureArr[nextPage];
        const afterNextTexture = shaderTextureArr[(nextPage + 1) % shaderTextureArr.length];
        bgMaterial2.uniforms.texture1.value = nextTexture;
        gsap.to(settings, {
          duration: 2,
          progress: 1,
          ease: "power2.in",
          onComplete: () => {
            state.isAnimation = false;
            settings.progress = 0;
            bgMaterial.uniforms.texture1.value = nextTexture;
            bgMaterial2.uniforms.texture1.value = afterNextTexture;
          }
        });
      } else {
        console.log(" ~ change ~ | now animation");
      }
    };
    /**
     * 背景セット
     */
    const bgInit = () => {
      console.log(">>AppHero >bgInit");
      state.bgimageAspect = shaderTextureArr[0].image.naturalHeight / shaderTextureArr[0].image.naturalWidth;
      bgGeometry = getGeometry(10, 2);
      bgMaterial = new THREE.ShaderMaterial({
        extensions: {
          derivatives: true
        },
        side: THREE.DoubleSide,
        uniforms: {
          time: { value: 0 },
          progress: { value: 0 },
          resolution: { value: new THREE.Vector4() },
          texture1: { value: shaderTextureArr[currentPageIndex.value] }
        },
        // wireframe: true,
        transparent: true,
        vertexShader: AppData.vertexDemo0,
        fragmentShader: AppData.fragmentDemo0,
        depthTest: false,
        depthWrite: false
      }); //*/

      bgMaterial2 = bgMaterial.clone();
      const t2 = shaderTextureArr[1];
      bgMaterial2.uniforms.texture1.value = t2;

      currentMesh = new THREE.Mesh(bgGeometry, bgMaterial);
      nextMesh = new THREE.Mesh(bgGeometry, bgMaterial2);
      nextMesh.scale.set(camera.aspect, 1, 1);
      currentMesh.scale.set(camera.aspect, 1, 1);
      currentMesh.position.z = 0.5;
      nextMesh.position.z = 0.499;

      scene.add(currentMesh);
      scene.add(nextMesh);

      onResize();
    };
    bgImages.forEach((url, i) => {
      const promise: Promise<THREE.Texture> = new Promise(resolve => {
        shaderTextureArr[i] = new THREE.TextureLoader().load(url, resolve);
      });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      bgInit();
    });

    /**
     * レンダラー
     */
    const render = () => {
      // stats.begin();
      if (bgMaterial) bgMaterial.uniforms.progress.value = settings.progress;
      proton.update();
      renderer.render(scene, camera);
      // stats.end();
      requestAnimationFrame(render);
    };

    /**
     * 実行
     */
    onMounted(() => {
      console.log(">>AppHero >onMounted");
      console.log(">>AppHero >onMounted | currentPageIndex.value, props.nowPage : " + currentPageIndex.value + ", " + props.nowPage);
      if (container.value != undefined) container.value.appendChild(renderer.domElement);

      /*----------------------- logo -----------------------*/
      new THREE.TextureLoader().load(
        "./img/texture/logo-vue.png",
        tex => {
          const geometry1 = new THREE.PlaneBufferGeometry(0.5, 0.5);
          const logoMaterial = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            transparent: true,
            map: tex
          });
          const logoMesh = new THREE.Mesh(geometry1, logoMaterial);
          logoMesh.position.set(0.25, 0, 1);
          scene.add(logoMesh);
        },
        undefined,
        e => {
          console.log(">>AppHero >onMounted | e", e);
        }
      ); //*/

      /*guide
      const axis = new THREE.AxesHelper(100);
      scene.add(axis);
      const grid = new THREE.GridHelper(10, 20);
      scene.add(grid);
      //*/

      //Control
      controls = new OrbitControlsExpansion(camera, renderer.domElement);
      controls.dispose();
      const canvasEl = document.querySelector("#canvas_threejs");
      if (canvasEl != null) {
        canvasEl.addEventListener(
          "mousemove",
          {
            handleEvent: onMouseMoveHandler
          },
          false
        );
      }

      window.addEventListener("resize", onResize, false);
      onResize();
      render();
    });

    /**
     * 更新
     */
    onUpdated(() => {
      console.log(">>AppHero >onUpdated | currentPageIndex.value, props.nowPage : " + currentPageIndex.value + ", " + props.nowPage);
      if (bgGeometry != null) bgChange(currentPageIndex.value);
    });

    const prevPage = computed(() => {
      let num: number;
      if (currentPageIndex.value - 1 < 0) {
        num = pageList.length - 2;
      } else {
        num = currentPageIndex.value - 1;
      }
      return pageList[num];
    });
    const nextPage = computed(() => {
      let num: number;
      if (pageList.length - 1 <= currentPageIndex.value + 1) {
        num = 0;
      } else {
        num = currentPageIndex.value + 1;
      }
      return pageList[num];
    });

    /**
     * 前へ
     */
    const onClickPagePrev = () => {
      let prev = currentPageIndex.value - 1;
      // prevが0未満の場合最後へ
      if (prev < 0) {
        prev = pageList.length - 2;
      }
      router.push({ name: pageList[prev] });
    };

    /**
     * 次へ
     */
    const onClickPageNext = () => {
      let next = currentPageIndex.value + 1;
      // nextがpathList.length以上の場合最初へ
      if (pageList.length - 1 <= next) {
        next = 0;
      }
      router.push({ name: pageList[next] });
    };
    return {
      currentPageIndex,
      heroDataList,
      onClickPagePrev,
      onClickPageNext,
      scene,
      camera,
      container,
      state,
      showText,
      prevPage,
      nextPage
    };
  },
  components: {
    PageHeroInner
  }
});
</script>

<template>
  <div class="PageHero">
    <PageHeroInner :heroData="heroDataList[currentPageIndex]">
      <template #heading>
        <span v-show="showText" v-html="heroDataList[currentPageIndex].headingHtml"></span>
      </template>
      <template #desc>
        <span v-show="showText" v-html="heroDataList[currentPageIndex].descHtml"></span>
      </template>
    </PageHeroInner>

    <button class="PageHero__control -prev" @click="onClickPagePrev">
      <svg role="img">
        <use xlink:href="#svg-prev" />
      </svg>
      <span>{{ prevPage }}</span>
    </button>

    <button class="PageHero__control -next" @click="onClickPageNext">
      <svg role="img">
        <use xlink:href="#svg-next" />
      </svg>
      <span>{{ nextPage }}</span>
    </button>

    <div class="PageHero__bg">
      <div class="PageHero__canvas" ref="container"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.PageHero {
  position: relative;
  z-index: 0;
  height: calc(100vh - 80px);
  overflow: hidden;

  @include md(max) {
    height: calc(100vh - 70px);

    @supports (-webkit-touch-callout: none) {
      height: -webkit-fill-available;
    }
  }
}

.PageHero__control {
  position: absolute;
  bottom: 30px;
  z-index: 2;
  padding: 0 0;
  font-family: $FONT_EN;
  font-size: em(28, 16);
  font-weight: 600;
  line-height: 1.6;
  color: $COLOR_MAIN;
  background-color: rgba(#fff, 0.9);
  border: 0 none;
  box-shadow: $SHADOW_BASE;
  transition: box-shadow $SEC ease;
  cursor: pointer;
  @include md(max) {
    font-size: em(18, 16);
  }

  svg {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 12px;
    height: 20px;
    fill: $COLOR_MAIN;
    transition: transform $SEC ease;
    @include md(max) {
      width: 8px;
      height: 16px;
    }
  }

  &:hover {
    box-shadow: $SHADOW_HOVER;
  }

  &.-prev {
    left: 0;
    padding: 10px 20px 10px 40px;
    border-radius: 0 10px 10px 0;
    @include md(max) {
      padding: 4px 14px 4px 20px;
    }

    svg {
      left: 20px;
      @include md(max) {
        left: 6px;
      }
    }

    &:hover {
      svg {
        @include md(min) {
          transform: translate(-6px, -50%);
        }
      }
    }
  }

  &.-next {
    right: 0;
    padding: 10px 40px 10px 20px;
    border-radius: 10px 0 0 10px;
    @include md(max) {
      padding: 4px 20px 4px 14px;
    }

    svg {
      right: 20px;
      @include md(max) {
        right: 6px;
      }
    }

    &:hover {
      svg {
        @include md(min) {
          transform: translate(6px, -50%);
        }
      }
    }
  }
}

.PageHero__bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.PageHero__canvas {
  width: 100%;
  height: 100%;

  canvas {
    width: 100%;
    height: 100%;
    background-color: tomato;
  }
}

.heading-enter-active,
.desc-enter-active {
  opacity: 0;
  transition: opacity 1s ease;
}

.desc-enter-active {
  transition-delay: 0.4s;
}

.heading-enter-to,
.desc-enter-to {
  opacity: 1;
}
</style>
