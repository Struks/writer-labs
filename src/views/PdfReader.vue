<script setup>
import { ref, computed, inject, onMounted, watch } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { bookHelper } from "../helpers/bookHelper";

const store = inject("store");
// props
const props = defineProps({
  pageNumber: {
    type: Number,
    default: 1,
  },
});

// state

// Retrieving the context of the canvas element
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// computed
const pdfUrl = computed(() => store.state.pdfUrl);

// watch
// when prop pageNumber change, bookHelper navigateAnimation is called
watch(
  () => props.pageNumber,
  (newValue, oldValue) => {
    bookHelper.navigateAnimation();
  }
);

// Before Route Leave
// onBeforeRouteLeave((to, from, next) => {
//   bookHelper.navigateAnimation();
//   next();
// });

// mounted
onMounted( () => {
  loadPDF();
});

//* Methods
const loadPDF = () => {
  setTimeout(() => {
    
    pdfjsLib
      .getDocument(
        pdfUrl.value
      )
      .promise.then((pdf) => {
        // dinamic parametar 'pageNumber'
        pdf.getPage(props.pageNumber).then(page => {
          const viewport = page.getViewport({scale: 1.1});
          canvas.width = viewport.width;
          canvas.height = viewport.height;
        
          // set state
          store.state.viewport = { width: viewport.width, height: viewport.height };
          page.render({canvasContext: context, viewport: viewport});
          document.getElementById('pdf-container' + props.pageNumber).appendChild(canvas);
      });
    });
  }, 600);
  // Displaying PDF file on canvas element
};
</script>

<template>
  <!-- div who initialize canvas element -->
  <div :id="'pdf-container'+ pageNumber" class="w-full h-full"></div>
</template>

<style lang="scss" scoped>

</style>