<script setup>
//  Props
const props = defineProps({
    title: String,
    author: String
})
</script>

<template>
    <h1 class="text-center title text-[#000] text-5xl font-bold mb-[5rem]">{{title}}</h1>
    <h3 class="text-center author text-[#000] text-2xl font-semibold">{{author}}</h3>
</template>


<style lang="scss" scoped>

</style>