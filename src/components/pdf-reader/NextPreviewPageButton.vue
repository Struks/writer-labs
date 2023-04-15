<script setup>
import { inject, computed } from "vue";
import SvgIcon from "../SvgIcon.vue";
// modules
import { bookHelper } from "@/helpers/bookHelper";

// Store
const store = inject("store");
// Props
const props = defineProps({
    next: {
        type: Boolean,
        default: false,
    },
    prev: {
        type: Boolean,
        default: false,
    },
});

// computed
const pdfReaderPage5 = computed(() => store.state.pdfReaderPage5);


// methods
const nextPage = () => {
    bookHelper.pdfNextPrevPageAnimation('next');
    store.actions.nextPage();
};
const prevPage = () => {
    if (pdfReaderPage5.value === 1) return; // if page is 1, return
    bookHelper.pdfNextPrevPageAnimation('prev');
    store.actions.prevPage();
};

</script>

<template>
    <!-- next button -->
    <div v-if="next" @click="nextPage()" class="flex absolute right-[5%] cursor-pointer items-center next-button bg-[#fff] hover:shadow-[#000] clip-next-arrow border-l-4 border-[#850C14]">
        <div class="mx-[1.5rem] pb-1 text-[16px] leading-[16px] font-bold text-[#638ce6d5]">NEXT</div>
        <svg-icon class="mr-[1rem]" name="arrow" width="34px" hoverColor="red" color />
    </div>
    <!-- prev button -->
    <div v-if="prev" @click="prevPage()" :class="{'opacity-0 cursor-default': pdfReaderPage5 === 1, 'opacity-100': pdfReaderPage5 > 1}" class="flex transition-opacity duration-700 ease-in-out absolute left-[5%] bg-[#fff] cursor-pointer items-center prev-button hover:shadow-[#000] clip-prev-arrow border-r-4 border-[#850C14]">
        <svg-icon class="ml-[1rem] rotate-180" name="arrow" width="34px" hoverColor="red" color />
        <div class="mx-[1.5rem] pb-1 text-[16px] leading-[16px] font-bold text-[#638ce6d5]">PREV</div>
    </div>
</template>

<style lang="scss" scoped>
</style>