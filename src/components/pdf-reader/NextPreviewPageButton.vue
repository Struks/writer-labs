<script setup>
import SvgIcon from "../SvgIcon.vue";

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

</script>

<template>
    <!-- next button -->
    <div v-if="next" class="flex absolute right-[5%] cursor-pointer items-center next-button bg-[#fff] hover:shadow-[#000] clip-next-arrow border-l-4 border-[#850C14]">
        <div class="mx-[1.5rem] pb-1 text-[16px] leading-[16px] font-bold text-[#638ce6d5]">NEXT</div>
        <svg-icon class="mr-[1rem]" name="arrow" width="34px" hoverColor="red" color />
    </div>
    <!-- prev button -->
    <div v-if="prev" class="flex absolute left-[5%] cursor-pointer items-center prev-button bg-[#fff] hover:shadow-[#000] clip-prev-arrow border-r-4 border-[#850C14]">
        <svg-icon class="ml-[1rem] rotate-180" name="arrow" width="34px" hoverColor="red" color />
        <div class="mx-[1.5rem] pb-1 text-[16px] leading-[16px] font-bold text-[#638ce6d5]">PREV</div>
    </div>
</template>

<style lang="scss" scoped>
</style>