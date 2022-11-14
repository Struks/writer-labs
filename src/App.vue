<script setup>
import { RouterView } from "vue-router";
import BookTitle from "./components/BookTitle.vue";
import { ref, provide, computed } from "vue";
import { ContentLoader } from 'vue-content-loader'
// store
import store from '@/store'

// provide
provide('store', store);


// Variables
const bookIsOpen = ref(false);
const book = ref(null)

// Computed
const loader = computed(() => store.state.loader);

// Methods
const openBook = () => {
  if(!bookIsOpen.value)
  bookIsOpen.value = true;
  const bookPages = book.value.children;
  book.value.classList.remove('closed-book');
  book.value.classList.add('opened-book');
  setTimeout(() => {
    for(let i = 0; i < bookPages.length; i++) {
      bookPages[i].classList.add('pages-opened');
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
    class="book closed-book relative cursor-pointer h-[600px] w-[500px] transition duration-500 ease-in-out"
  >
    <div class="back book-page bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14]"></div>
    <div class="page6 book-page bg-page"></div>
    <div class="page5 book-page bg-page-special">
      <div class="flex flex-col h-full" :class="{'justify-center items-center' : loader, 'justify-between' : !loader}">
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
    </div>
    <div class="page4 book-page bg-page"></div>
    <div class="page3 book-page bg-page-special"></div>
    <div class="page2 book-page bg-page"></div>
    <div class="page1 book-page bg-page-special"></div>
    <div class="front book-page bg-gradient-to-r from-[#d2383b] to-[#850C14] via-[#850C14] flex flex-col justify-center hover:shadow-2xl shadow-blue-900"> 
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
