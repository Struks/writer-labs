

<script setup>
import { ref, inject } from "vue";
import SvgIcon from "../SvgIcon.vue";

// store
const store = inject("store");

// data
const backToLibraryToasted = ref(false);

</script>

<template>
    <div title="Back to Library" class="back-to-library absolute left-auto right-auto top-0 flex flex-col items-center">
        <svg-icon
            class="icon cursor-pointer"
            :class="{'rotate-180 w-[1.5rem] h-[1.5rem]': backToLibraryToasted, 'w-[2rem] h-[2rem]': !backToLibraryToasted}"
            title="Back to Library"
            name="dropdown"
            @click="backToLibraryToasted = !backToLibraryToasted"
        />
        <!-- <div class="drop-down-icon">
        </div> -->
        <div class="back-to-library-toasted px-3 py-2 rounded-md bg-[#638ce6d5] mt-1 cursor-pointer text-[#fff] hover:shadow-xl hover:transition hover:duration-900 hover:shadow-page hover:text-page" v-if="backToLibraryToasted">
            <div @click="store.state.pdfReaderActive = false" class="back-to-library-toasted-text">
                Back to Library
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

</style>