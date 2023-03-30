<script setup>
import BookTitle from "./components/BookTitle.vue";
import { ref, provide, computed, watch } from "vue";
// page components
import Page5 from "./views/pages/Page5.vue";
import Page6 from "./views/pages/Page6.vue";
// back to library component
import BackToLibrary from "./components/pdf-reader/BackToLibrary.vue";
// next-prev page button component
import NextPreviewPageButton from "./components/pdf-reader/NextPreviewPageButton.vue";

// store
import store from "@/store";

// provide
provide("store", store);

// Variables
const bookIsOpen = ref(false);
const book = ref(null);
const bookTitle = ref("Writer Labs");
const bookAuthor = ref("Evan You");

// Computed
const getViewport = computed(() => store.state.viewport);
const pdfReaderActive = computed(() => store.state.pdfReaderActive);
const pdfReaderName = computed(() => store.state.pdfReaderName);

// Watch
// watch pdfReaderActive and change viewport for pdf-reader page
watch(pdfReaderActive, (newValue) => {
  if (newValue === true) {
    prepareBookForPdfReader();
  } else {
    prepareBookForLabrary();
  }
});

// Methods
const openBook = () => {
  if (!bookIsOpen.value) bookIsOpen.value = true;
  const bookPages = book.value.children;
  book.value.classList.remove(
    "closed-book",
    "remove-book-from-desk",
    "set-book-on-desk"
  );
  book.value.classList.add("opened-book");
  setTimeout(() => {
    for (let i = 0; i < bookPages.length; i++) {
      bookPages[i].classList.add("pages-opened");
    }
  });
};
const closeBook = () => {
  if (bookIsOpen.value) bookIsOpen.value = false;
  book.value.classList.remove("opened-book");
  book.value.classList.add("closed-book");
};
// prepare book for pdf-reader
const prepareBookForPdfReader = () => {
  // close book
  closeBook();
  // remove book from desktop
  setTimeout(() => {
    book.value.classList.add("remove-book-from-desk");
  }, 500);
  // change book design for pdf-reader
  setTimeout(() => {
    // set new book title and author
    bookTitle.value = pdfReaderName.value;
    bookAuthor.value = "";
    book.value.classList.add("set-book-on-desk", "pdf-reader-mode");
  }, 2500);
};
// back to library
const prepareBookForLabrary = () => {
  // close book
  closeBook();
  // remove book from desktop
  setTimeout(() => {
    book.value.classList.add("remove-book-from-desk");
  }, 500);
  // change book design for pdf-reader
  setTimeout(() => {
    // set default book width and height
    store.state.viewport = { width: 500, height: 600 };
    // set new book title and author
    bookTitle.value = "Writer Labs"; // todo: dinamic title
    bookAuthor.value = "Evan You"; // todo: dinamic author
    // remove pdf reader mode
    book.value.classList.remove("pdf-reader-mode");
    // get book on desk
    book.value.classList.add("set-book-on-desk");
  }, 2500);
};
</script>

<template>
  <!-- https://codepen.io/dhanishgajjar/pen/bjaYYo -- book template -->

  <!-- transform: rotateY(-130deg) scale(1.1); -->
  <div
    @click="openBook"
    ref="book"
    :title="!bookIsOpen ? 'Open Writer Labs' : ''"
    class="book closed-book relative cursor-pointer h-[700px] w-[600px] transition duration-500 ease-in-out"
    :style="{
      width: getViewport.width + 'px',
      height: getViewport.height + 'px',
      marginLeft: bookIsOpen ? getViewport.width + 'px' : auto,
    }"
  >
    <div
      class="back book-page bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14]"
    ></div>
    <div
      class="page6 book-page bg-page"
      :class="{ '!flex items-center justify-center': pdfReaderActive }"
    >
      <Page6 />
    </div>
    <div class="page5 book-page bg-page-special p-0">
      <Page5 />
    </div>
    <div class="page4 book-page bg-page"></div>
    <div class="page3 book-page bg-page-special"></div>
    <div class="page2 book-page bg-page"></div>
    <div class="page1 book-page bg-page-special"></div>
    <div
      class="front book-page bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14] flex flex-col justify-center hover:shadow-2xl shadow-blue-900"
    >
      <!-- bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14] -->
      <BookTitle :title="bookTitle" :author="bookAuthor" />
    </div>
  </div>

  <!-- back to library button -->
  <BackToLibrary v-if="pdfReaderActive && bookIsOpen" />
  <!-- next page button -->
  <NextPreviewPageButton v-if="pdfReaderActive && bookIsOpen" prev />
  <NextPreviewPageButton v-if="pdfReaderActive && bookIsOpen" next />
</template>

<style>
/* Book */
.book {
  transform-style: preserve-3d;
  backface-visibility: visible;
}

.remove-book-from-desk {
  animation: remove-book-from-desk 700ms ease-in-out forwards;
}
.set-book-on-desk {
  animation: get-book-to-desk 800ms ease-in-out forwards;
}

.pdf-reader-mode .page2,
.pdf-reader-mode .page4,
.pdf-reader-mode .page6 {
  @apply bg-page-reader;
}
.pdf-reader-mode .page1,
.pdf-reader-mode .page3,
.pdf-reader-mode .page5 {
  @apply bg-page-reader;
}

/* Pages transform */
.pages-opened {
  transform-origin: center left;
}

.front {
  padding: 1rem;
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
