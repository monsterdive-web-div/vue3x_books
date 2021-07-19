<script lang="ts">
import { defineComponent } from "vue";
import { menuRoutes } from "@/router/index.ts";

export default defineComponent({
  name: "PageBreadcrumbs",
  props: {
    label: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let routeData;
    for (const data of menuRoutes) {
      if (data.name === props.label) routeData = data;
    }
    const paths: string[] = ["/"];
    const names: string[] = ["Top"];
    if (routeData) {
      paths.push(routeData.path);
      names.push(props.label);
    }
    return { paths, names };
  }
});
</script>

<template>
  <nav class="PageBreadcrumbs" aria-label="パンくずリスト">
    <ul class="PageBreadcrumbs__list" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li v-for="(path, index) in paths" :key="path" class="PageBreadcrumbs__item" itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <router-link v-if="index !== paths.length - 1" class="PageBreadcrumbs__link" itemprop="item" :to="path">
          <span itemprop="name">{{ names[index] }}</span>
        </router-link>
        <a v-else>{{ names[index] }}</a>
        <meta itemprop="position" :content="index + 1" />
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.PageBreadcrumbs {
  max-width: 1000px;
  margin: 50px auto 0;
  @include lg(max) {
    padding: 0 20px;
  }
}

.PageBreadcrumbs__list {
  margin: 0;
  padding: 0;
  display: flex;
}

.PageBreadcrumbs__item {
  list-style-type: none;
  font-size: em(13, 16);

  &:not(:first-child) {
    position: relative;
    margin-left: em(6, 13);
    padding-left: 1em;

    &::before {
      content: "/";
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      color: $COLOR_MAIN;
    }
  }

  > a {
    color: $COLOR_MAIN;
    text-decoration: none;

    &[href] {
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
