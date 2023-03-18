<script setup>
import { ref, computed, inject, onMounted } from "vue";
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
    v-if="pdfReaderActive"
    class="pdf-reader-page6"
  >
    <PdfReader :pageNumber=2 />
  </div>
</template>

<style>
.pdf-reader-page6 canvas {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
</style>