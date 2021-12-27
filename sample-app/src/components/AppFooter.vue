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
