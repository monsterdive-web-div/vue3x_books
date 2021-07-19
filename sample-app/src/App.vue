<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppHero from "@/components/AppHero.vue";
import AppFooter from "@/components/AppFooter.vue";
import AppSvg from "@/components/AppSvg.vue";
import store from "@/store";
import { Page } from "@/router/index.ts";
import router from "@/router";
import "normalize.css";
import { messaging, usersRef } from "@/firebase/app";
import { credentials } from "@/firebase/credentials";

export default defineComponent({
  setup() {
    onMounted(() => {
      // トークン取得
      messaging
        .getToken({
          vapidKey: credentials.messagingConfig.vapidKey
        })
        .then((token: string) => {
          // トークン発行
          if (token) {
            // トークンがDBに入っているか確認
            usersRef
              .where("token", "==", token)
              .get()
              .then(oldLog => {
                if (oldLog.empty) {
                  // トークン登録がなければトークン登録・購読設定
                  usersRef.add({
                    token: token,
                    subscribe: true
                  });
                  console.log("通知を設定しました。");
                } else {
                  // トークン登録があれば購読に設定変更
                  oldLog.forEach(doc => {
                    console.log("通知はすでに登録されています。");
                    usersRef.doc(doc.id).update({
                      subscribe: true
                    });
                  });
                }
              });
          } else {
            console.log("通知の許可をしていません。「通知を許可する」を押してください。");
          }
        })
        .catch(err => {
          console.log("トークンの取得に失敗しました（" + err + "）。");
        });
    });
    const nowPage = computed(() => store.getters.nowPage);
    const isTop = computed(() => router.currentRoute.value.name === Page.TOP);

    return {
      nowPage,
      isTop
    };
  },
  components: {
    AppHeader,
    AppHero,
    AppFooter,
    AppSvg
  }
});
</script>

<template>
  <div class="App" :class="{ '-home': isTop }" :data-page="nowPage">
    <AppHeader />
    <main class="Main">
      <AppHero :nowPage="nowPage" />
      <router-view />
    </main>
    <AppFooter />
  </div>
  <AppSvg />
</template>

<style lang="scss" scoped>
.App {
  padding-top: 80px;
  @include md(max) {
    padding-top: 70px;
  }
}
</style>
