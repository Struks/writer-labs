<script setup>
import { ref, computed, inject, onMounted } from "vue";
import PdfReader from "../PdfReader.vue";

// store
const store = inject("store");
// computed
const pdfReaderPage6 = computed(() => store.state.pdfReaderPage6);
const pdfReaderActive = computed(() => store.state.pdfReaderActive);

</script>

<template>
  <div
    v-if="pdfReaderActive"
    class="pdf-reader-page6"
  >
    <PdfReader :pageNumber=pdfReaderPage6 />
  </div>
</template>

<style>
.pdf-reader-page6 canvas {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
</style>