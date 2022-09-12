<script setup>
import { RouterView } from "vue-router";
import BookTitle from "./components/BookTitle.vue";
import { onMounted, ref } from "vue";


// Variables
const bookIsOpen = ref(false);
const book = ref(null)

// Mounted
onMounted(() => {
  // console.log(book.value.children);
  // const bookPages = book.value.children
  // setTimeout(() => {
  //   book.value.classList.remove('closed-book')
  //   for(let i = 0; i < 3; i++) {
  //     console.log(bookPages[i].classList);
  //     bookPages[i].classList.add('book-opened');
  //   }
  // }, 1000);

});



// Methods
const openBook = () => {
  // console.log('ref', $ReadableStreamDefaultController);
  if(!bookIsOpen.value)
  bookIsOpen.value = true;
  const bookPages = book.value.children;
  book.value.classList.remove('closed-book');
  book.value.classList.add('opened-book');
  setTimeout(() => {
    for(let i = 0; i < bookPages.length; i++) {
      // console.log(bookPages[i].classList);
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
    <div class="page5 book-page bg-page-special flex flex-col justify-between">
      <RouterView />
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
