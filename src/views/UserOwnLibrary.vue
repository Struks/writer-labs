
<script setup>
import { ref } from 'vue';
import { onBeforeRouteLeave } from "vue-router";
import { bookHelper } from '../helpers/bookHelper';

// Variables
const firstName = ref('Edvin');
const lastName = ref('Strujic');
const userName = ref('Strux');
const email = ref('strux1@outlook.com');

// Methods
function signup() {
    console.log('signup');
}

// Before Route Leave
onBeforeRouteLeave((to, from, next) => {    
    bookHelper.navigateAnimation();
    next();
});

</script>

<template>
    <!-- writer's library -->
    <h1 class="rotate-y text-4xl uppercase font-bold text-center">{{userName}}'s library</h1>
    <div class="foler">
        
    </div>
</template>

<style lang="scss" scoped>

</style>