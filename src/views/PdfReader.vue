<script setup>
import { ref, computed, inject, onMounted, watch } from "vue";

const store = inject("store");
// props
const props = defineProps({
  pageNumber: {
    type: Number,
    default: 1,
  },
});

// state
const pdfBlob  = ref(null); // blob of the pdf file
const hiddenText = ref(false);
// Retrieving the context of the canvas element
const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

// computed
const pdfUrl = computed(() => store.state.pdfUrl);

// mounted
onMounted(() => {
  getPdfPage();
});


watch(
  () => props.pageNumber,
  async (newVal, oldVal) => {
    if (newVal !== oldVal) {
      hiddenText.value = true;
      await getPdfPage();
      setTimeout(() => {
        hiddenText.value = false;
      }, 700);
    }
  }
);

//* Methods
// save pdf in memory and return it
const loadPdf = async () => {
  if (pdfBlob.value) {
    // If the PDF file is already loaded, return it from memory
    return Promise.resolve(pdfBlob.value);
  }

  // If the PDF file is not loaded, fetch it from the server
  const response = await fetch(pdfUrl.value);
  pdfBlob.value = await response.blob();

  return Promise.resolve(pdfBlob.value);
}
// Displaying PDF file on canvas element
const getPdfPage = async () => {
  const pdf = await loadPdf();
  const pdfData = new Uint8Array(await pdf.arrayBuffer());

  // Load the PDF document
  const pdfDoc = await pdfjsLib.getDocument({ data: pdfData }).promise;
  // Get the prop page of the PDF document
  const pageNumber = props.pageNumber;
  const pdfPage = await pdfDoc.getPage(pageNumber);

  // Get the height of the PDF page
  const pdfHeight = pdfPage.view[3]; // [0, 0, 612, 792] => [x, y, width, height] => height = 792 (px)

  // Get the height of the display
  const displayHeight = window.innerHeight;

  // Calculate the scale based on the height of the PDF page and the display
  let scale = 1;
  if (pdfHeight > displayHeight) {
    // If PDF page height is larger than display height, reduce scale
    scale = (displayHeight / pdfHeight) - 0.05; // Reduce scale by 0.05 to avoid scrollbars and make space between book and display y axis (top and bottom)
  } else {
    // If PDF page height is much smaller than display height, grow scale
    const margin = 100; // Add a margin of 50 pixels
    const availableHeight = displayHeight - margin;
    if (pdfHeight < availableHeight) {
      scale = availableHeight / pdfHeight;
    }
  }

  // Get the viewport of the page
  const viewport = pdfPage.getViewport({ scale });
  // Set the canvas height and width
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  // Set state
  store.state.viewport = {
    width: viewport.width,
    height: viewport.height,
  };
  // Render the page into the canvas
  await pdfPage.render({ canvasContext: context, viewport: viewport }).promise;
  // Append the canvas to the DOM
  document
    .getElementById("pdf-container" + props.pageNumber)
    .appendChild(canvas);
};
</script>

<template>
  <!-- div who initialize canvas element -->
  <div
    :id="'pdf-container' + pageNumber"
    class="w-full h-full"
    :class="{ hidden: hiddenText }"
    ></div>
</template>

<style lang="scss" scoped>
</style>