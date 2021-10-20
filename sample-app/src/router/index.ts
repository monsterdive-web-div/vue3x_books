import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { DispatchType } from "@/store/app.config";
import Top from "../views/Top.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Top",
    component: Top
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/About.vue"
      )
  },
  {
    path: "/author",
    name: "Author",
    component: () =>
      import(
        /* webpackChunkName: "author" */
        "../views/Author.vue"
      )
  },
  {
    path: "/production-note",
    name: "Production note",
    component: () =>
      import(
        /* webpackChunkName: "production-note" */
        "../views/ProductionNote.vue"
      )
  },
  {
    path: "/faq",
    name: "Q&A",
    component: () =>
      import(
        /* webpackChunkName: "faq" */
        "../views/Faq.vue"
      )
  }
];
//TOP、NotFoundの削除の削除
export const menuRoutes = routes.slice(1, routes.length);

export const Page = {
  TOP: "Top",
  ABOUT: "About",
  AUTHOR: "Author",
  PRODUCTIONNOTE: "ProductionNote",
  FAQ: "Faq"
} as const;

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    //現在ページのセット
    store.dispatch(DispatchType.SET_PAGE, to.name);
    return { left: 0, top: 0 };
  }
});

export default router;
