<script setup>
import verification from '../../assets/images/verification.png';
import { h } from 'vue';
// toasted
import { useToast } from "vue-toastification";

const toast = useToast();

// create voNode for toasted info about how to verify email
const voNode = h('div', { class: 'flex flex-col items-center' }, [
    h('div', { class: 'self-end text-[#000] text-sm font-semibold max-w-full m-left cursor-pointer' }, 'X'),
    h('img', { src: verification, alt: 'verification', class: 'w-[7rem] h-[7rem] mb-[.5rem]' }),
    h('p', { class: 'text-center text-[#000] text-2xl font-semibold' }, 'Please verify your email address'),
    h('p', { class: 'text-center text-[#000] text-xl font-semibold' }, 'We have sent you an email with a link to verify your email address. Please check your inbox and click the link to verify your email address.'),
    h('p', { class: 'text-center text-[#000] text-xl font-semibold' }, 'If you have not received an email, please check your spam folder.'),
]);

// Methods
const callToasted = (() => {
    toast(voNode, {
        position: 'top-center',
        timeout: 0,
        pauseOnFocusLoss: false,
        pauseOnHover: false,
        draggable: false,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: false,
        icon: false,
        rtl: false,
        toastClassName: "my-custom-toast-class",
    });
});

</script>

<template>
    <h1 class="rotate-y text-2xl uppercase font-bold text-center text-default">Your account has not been verified. Please do it.</h1>
    <div class="must-verify-icon block w-[200px] h-[163px] m-auto rotate-y">
        <img class="w-full h-full" :src="verification" alt="verification-account">
        <div @click="callToasted" class="max-w-full m-auto text-lg text-[#7A0B13] cursor-pointer pt-2 text-center hover:underline">How to verify account?</div>
    </div>

</template>


<style lang="scss" scoped>

</style>