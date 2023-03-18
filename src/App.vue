<script setup>
import { RouterView, useRoute } from "vue-router";
import BookTitle from "./components/BookTitle.vue";
import { ref, provide, computed, watch } from "vue";
import { ContentLoader } from "vue-content-loader";
// page components
import Page5 from "./views/pages/Page5.vue";
import Page6 from "./views/pages/Page6.vue";


// store
import store from "@/store";
// route
const route = useRoute();

// provide
provide("store", store);

// Variables
const bookIsOpen = ref(false);
const book = ref(null);
const pdfReaderActive = ref(false);
const page6View = ref(false);

// Computed
const loader = computed(() => store.state.bookPageLoader); //!
const getViewport = computed(() => store.state.viewport);

// Watch
// watch route.name to set pdfReaderActive to true if router.name is pdf-reader
watch(
  () => route.name,
  (val) => {
    //! This indicator is not working in future
    // todo: router will not work here because we'll not use router for pdf-reader
    // todo: 'pdfReaderActive' prefer to set in store and use it in other components
    // todo: 'pdfReaderActive' will be set to true when user click on pdf-reader button
    // todo: 'pdfReaderActive' will be set to false when user click on back button
    // * Why we need this? 
    // * Because we need to have diference book for pdf-reader
    // * Because we need animation for pdf-reader. What animation?S
    // ? pdfReaderActive == true ? library book closed : pdf-reader book opened
    if (val === "pdf-reader") {
      pdfReaderActive.value = true;
    } else {
      pdfReaderActive.value = false;
      // set viewport to default
      store.state.viewport = { width: 500, height: 600 };
    }
  }
);

// Methods
const openBook = () => {
  if (!bookIsOpen.value) bookIsOpen.value = true;
  const bookPages = book.value.children;
  book.value.classList.remove("closed-book");
  book.value.classList.add("opened-book");
  setTimeout(() => {
    for (let i = 0; i < bookPages.length; i++) {
      bookPages[i].classList.add("pages-opened");
    }
  });
};
</script>

<template>
  <!-- https://codepen.io/dhanishgajjar/pen/bjaYYo -- book template -->

  <!-- transform: rotateY(-130deg) scale(1.1); -->
  <div
    @click="openBook"
    ref="book"
    :title="!bookIsOpen ? 'Open Writer Labs' : ''"
    class='book closed-book relative cursor-pointer h-[700px] w-[600px] transition duration-500 ease-in-out'
    :style="{
      width: getViewport.width + 'px',
      height: getViewport.height + 'px',
    }"
  >
    <div
      class="back book-page bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14]"
    ></div>
    <div
      class="page6 book-page bg-page"
      :class="{ '!flex items-center justify-center': pdfReaderActive }"
    >
      <Page6 :pdfReaderActive="pdfReaderActive" />
      <!-- <div
        v-if="pdfReaderActive"
        class="text-md text-center cursor-pointer hover:opacity-100 hover:font-bold underline underline-offset-2"
      >
        <router-link to="/library">Back to Library</router-link>
      </div> -->
    </div>
    <div class="page5 book-page bg-page-special p-0">
      <Page5 :pdfReaderActive="pdfReaderActive" />
    </div>
    <div class="page4 book-page bg-page"></div>
    <div class="page3 book-page bg-page-special"></div>
    <div class="page2 book-page bg-page"></div>
    <div class="page1 book-page bg-page-special"></div>
    <div
      class="front book-page bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14] flex flex-col justify-center hover:shadow-2xl shadow-blue-900"
    >
      <BookTitle title="Writer Labs" author="Edvin Strujic" />
    </div>
  </div>
</template>

<style>
/* Book */
.book {
  transform-style: preserve-3d;
  backface-visibility: visible;
}

/* Pages transform */
.pages-opened {
  transform-origin: center left;
}

.opened-book .back {
  transform: rotateY(-20deg);
}
.opened-book .page6 {
  transform: rotateY(-35deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
.opened-book .page5 {
  transform: rotateY(-145deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
.opened-book .page4 {
  transform: rotateY(-30deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
.opened-book .page3 {
  transform: rotateY(-150deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
.opened-book .page2 {
  transform: rotateY(-25deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
.opened-book .page1 {
  transform: rotateY(-155deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
.opened-book .front {
  transform: rotateY(-160deg);
  box-shadow: 0 1em 3em 0 rgb(0 0 0 / 20%);
}
</style>
