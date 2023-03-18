<script setup>
import { ref, computed, inject, onMounted } from "vue";
import { ContentLoader } from "vue-content-loader";
import PdfReader from "../PdfReader.vue";

// store
const store = inject("store");
// props
const props = defineProps({
    pdfReaderActive: {
    type: Boolean,
    default: false,
  },
});
// computed
const loader = computed(() => store.state.bookPageLoader);
</script>

<template>
  <div
    v-if="!pdfReaderActive"
    class="flex flex-col h-full"
    :class="{
      'justify-center items-center': loader,
      'justify-between': !loader,
      'p-[2rem]': !pdfReaderActive,
    }"
  >
    <content-loader v-if="loader" class="rotate-y" viewBox="0 0 250 310">
      <rect x="0" y="0" rx="3" ry="3" width="250" height="20" />
      <rect x="20" y="100" rx="3" ry="3" width="220" height="10" />
      <rect x="20" y="120" rx="3" ry="3" width="220" height="10" />
      <rect x="20" y="140" rx="3" ry="3" width="220" height="10" />
      <rect x="20" y="160" rx="3" ry="3" width="220" height="10" />
      <rect x="20" y="180" rx="3" ry="3" width="220" height="10" />
      <rect x="70" y="300" rx="3" ry="3" width="100" height="10" />
    </content-loader>
    <RouterView v-if="!loader" />
  </div>
  <div
  v-if="pdfReaderActive"
    class="pdf-reader-page5 rotate-y"
  >
    <PdfReader :pageNumber=1 />
  </div>
</template>

<style>
.pdf-reader-page5 canvas {
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
}
</style>