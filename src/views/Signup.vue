<script setup>
import { ref } from 'vue';
import { onBeforeRouteLeave } from "vue-router";
import { bookHelper } from '../helpers/bookHelper';

// Variables
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');
const repeatPassword = ref('');

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
    <!-- Register form -->
    <h1 class="rotate-y text-4xl uppercase font-bold text-center">Sign Up</h1>
    <form @submit.prevent="signup" class="rotate-y">
        <div class="mb-6">
            <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
            <input v-model="firstName" type="text" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John">
        </div>
        <div class="mb-6">
            <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
            <input v-model="lastName" type="text" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nilson">
        </div>
        <div class="mb-6">
            <label for="userName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User name</label>
            <input v-model="userName" type="text" id="userName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Johny" required>
        </div>
        <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
            <input v-model="email" type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@gmail.com" required>
        </div> 
        <div class="mb-6">
            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
            <input v-model="password" type="password" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
        </div> 
        <div class="mb-6">
            <label for="repeatPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Repeat password</label>
            <input v-model="repeatPassword" type="repeatPassword" id="password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required>
        </div> 
        <button type="submit" class="text-[#fff] bg-[#C2400D] hover:bg-[#9A3412] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>
    <div class="rotate-y text-sm opacity-80 text-center">Already have own laboratory? <router-link to="/login" class="text-sm opacity-80 underline">Login now!</router-link></div>
</template>

<style lang="scss" scoped>

</style>