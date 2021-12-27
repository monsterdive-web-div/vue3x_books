import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Top from "../views/Top.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Top",
    component: Top,
    meta: {
      title: "Topページ",
      description: "Topページの説明"
    }
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      /* webpackChunkName: "about" */
      import("../views/About.vue"),
    meta: {
      title: "Aboutページ",
      description: "Aboutページの説明"
    }
  },
  {
    path: "/author",
    name: "author",
    component: () =>
      /* webpackChunkName: "author" */
      import("../views/Author.vue"),
    meta: {
      title: "Authorページ",
      description: "Authorページの説明"
    }
  },
  {
    path: "/production-note",
    name: "Production note",
    component: () =>
      /* webpackChunkName: "production-note" */
      import("../views/ProductionNote.vue"),
    meta: {
      title: "ProductionNoteページ",
      description: "ProductionNoteページの説明"
    }
  },
  {
    path: "/faq",
    name: "Q&A",
    component: () =>
      /* webpackChunkName: "faq" */
      import("../views/Faq.vue"),
    meta: {
      title: "Faqページ",
      description: "Faqページの説明"
    }
  }
];
export const menuRoutes = routes.slice(1, routes.length - 1);

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
  scrollBehavior() {
    return { left: 0, top: 0 };
  }
});

export default router;
