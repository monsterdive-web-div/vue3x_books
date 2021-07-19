<script lang="ts">
import { defineComponent } from "vue";
import PageBanner from "@/components/footer/PageBanner.vue";

export default defineComponent({
  name: "AppFooter",
  setup() {
    const thisYear = new Date().getFullYear();
    return {
      thisYear
    };
  },
  components: {
    PageBanner
  }
});
</script>

<template>
  <PageBanner />
  <footer class="AppFooter">Copyright &copy; 2009 - {{ thisYear }} monsterdive inc. All Rights Reserved.</footer>
</template>

<style lang="scss" scoped>
.AppFooter {
  margin-top: 120px;
  padding: 21px 0;
  font-weight: $FONT_WEIGHT_BASE_BOLD;
  font-size: em(12, 16);
  line-height: 1.5;
  text-align: center;
  color: #fff;
  background-color: #35495e;
  @include md(max) {
    margin-top: 60px;
    font-size: em(10, 16);
  }
}
</style>
