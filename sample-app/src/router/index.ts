import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { DispatchType } from "@/store/app.config";
import Top from "../views/Top.vue";
import { AppData } from "@/store/app.data";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Top",
    component: Top,
    meta: {
      title: "Topページ",
      description: "Vue.js 3.x完全対応！本書ではVue.jsの基礎はもちろん、実際の現場で使えるTipsを中心に解説しています。Vue.jsの実践スキルをこの一冊で身につける！"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/About.vue"
      ),
    meta: {
      title: "Aboutページ",
      description: "本書を徹底解剖！目次の紹介とともに、学んでいただきたい内容や意図をご紹介します。"
    }
  },
  {
    path: "/author",
    name: "Author",
    component: () =>
      import(
        /* webpackChunkName: "author" */
        "../views/Author.vue"
      ),
    meta: {
      title: "Authorページ",
      description: "Webと映像を融合して、世界にひとつのモノづくりを提供する。MONSTER DIVEは、「職人的なこだわりとオタク的な探究心」を持つプロフェッショナル＆スペシャリスト集団です。"
    }
  },
  {
    path: "/production-note",
    name: "Production note",
    component: () =>
      import(
        /* webpackChunkName: "production-note" */
        "../views/ProductionNote.vue"
      ),
    meta: {
      title: "ProductionNoteページ",
      description: "本書執筆にあたって、プロジェクト始動から販売/公開までの裏側をプロジェクトメンバーが会話形式で暴露しています。"
    }
  },
  {
    path: "/faq",
    name: "Q&A",
    component: () =>
      import(
        /* webpackChunkName: "faq" */
        "../views/Faq.vue"
      ),
    meta: {
      title: "Faqページ",
      description: "本書やMONSTER DIVEについて、よくある質問とその回答をご紹介します。"
    }
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
    meta: {
      title: "NotFoundページ",
      description: "ページが見つかりません。お探しのページは、移動または削除された可能性があります。"
    }
  }
];
//TOP、NotFoundの削除の削除
export const menuRoutes = routes.slice(1, routes.length - 1);

export const Page = {
  TOP: "Top",
  ABOUT: "About",
  AUTHOR: "Author",
  PRODUCTIONNOTE: "ProductionNote",
  FAQ: "Faq"
} as const;

const metaDescription = document.querySelector("meta[name='description']");

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    //タイトルのセット
    if (to.meta.title) {
      document.title = AppData.appTitle + " | " + to.meta.title;
    } else {
      document.title = AppData.appTitle + " | " + "設定されていない場合のタイトル";
    }
    //ディスクリプションのセット
    if (metaDescription && to.meta.description) {
      metaDescription.setAttribute("content", to.meta.description);
    } else if (metaDescription) {
      metaDescription.setAttribute("content", "設定されていない場合のディスクリプション");
    }
    //現在ページのセット
    store.dispatch(DispatchType.SET_PAGE, to.name);
    return { left: 0, top: 0 };
  }
});

export default router;
