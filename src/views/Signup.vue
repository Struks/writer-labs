<script setup>
import { reactive, inject, toRef, computed } from "vue";
import { onBeforeRouteLeave, useRouter } from "vue-router";
// modules
import { bookHelper } from "../helpers/bookHelper";
// vuelidation
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, minLength } from "@vuelidate/validators";
// inject
const store = inject('store');
const router = useRouter();

// Variables
const registerForm = reactive({
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

// Vue validation
const rules = {
  firstName: {
    required,
  },
  lastName: {
    required,
  },
  userName: {
    required,
  },
  email: {
    email,
    required,
  },
  password: {
    required,
    minLength: minLength(6),
  },
  confirmPassword: {
    required,
    sameAs: sameAs(toRef(registerForm, "password")),
    minLength: minLength(6),
  },
};
const vv = useVuelidate(rules, {
  firstName: toRef(registerForm, "firstName"),
  lastName: toRef(registerForm, "lastName"),
  userName: toRef(registerForm, "userName"),
  email: toRef(registerForm, "email"),
  password: toRef(registerForm, "password"),
  confirmPassword: toRef(registerForm, "confirmPassword"),
});

// Computed
const curentUser = computed(() => store.state.currentUser);

// Methods
const signup = async () => {
  try {
    // check validation
    vv.value.$touch();
    if (vv.value.$invalid) {
      return;
    }
    // register user and navigate to user's library page
    await store.actions.signUp(registerForm);
  } catch (err) {
    console.log(err);
  }
};

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
    <div class="flex mb-6 -mx-1">
      <div class="w-1/2 mx-1">
        <label
          for="firstName"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >First name</label
        >
        <input
          v-model="vv.firstName.$model"
          type="text"
          id="firstName"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="John"
          :class="{ 'border-2 border-[#ff0000]': vv.firstName.$error }"
        />
        <template v-if="vv.firstName.$dirty">
          <div v-for="error of vv.firstName.$errors" :key="error.$message">
            <div
              :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.firstName.$dirty }"
            >
              {{ error.$message }}
            </div>
          </div>
        </template>
      </div>
      <div class="w-1/2 mx-1">
        <label
          for="lastName"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >Last name</label
        >
        <input
          v-model="vv.lastName.$model"
          type="text"
          id="lastName"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="Nilson"
          :class="{ 'border-2 border-[#ff0000]': vv.lastName.$error }"
        />
        <template v-if="vv.lastName.$dirty">
          <div v-for="error of vv.lastName.$errors" :key="error.$message">
            <div
              :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.lastName.$dirty }"
            >
              {{ error.$message }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex mb-6 -mx-1">
      <div class="w-1/2 mx-1">
        <label
          for="userName"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >User name</label
        >
        <input
          v-model="vv.userName.$model"
          type="text"
          id="userName"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="Johny"
          :class="{ 'border-2 border-[#ff0000]': vv.userName.$error }"
        />
        <template v-if="vv.userName.$dirty">
          <div v-for="error of vv.userName.$errors" :key="error.$message">
            <div
              :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.userName.$dirty }"
            >
              {{ error.$message }}
            </div>
          </div>
        </template>
      </div>
      <div class="w-1/2 mx-1">
        <label
          for="email"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >Email address</label
        >
        <input
          v-model="vv.email.$model"
          type="text"
          id="email"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="john.doe@gmail.com"
          :class="{ 'border-2 border-[#ff0000]': vv.email.$error }"
        />
        <template v-if="vv.email.$dirty">
          <div v-for="error of vv.email.$errors" :key="error.$message">
            <div :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.email.$dirty }">
              {{ error.$message }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="flex mb-9 -mx-1">
      <div class="w-1/2 mx-1">
        <label
          for="password"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >Password</label
        >
        <input
          v-model="vv.password.$model"
          type="password"
          id="password"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="•••••••••"
          :class="{ 'border-2 border-[#ff0000]': vv.password.$error }"
        />
        <template v-if="vv.password.$dirty">
          <div v-for="error of vv.password.$errors" :key="error.$message">
            <div
              :class="{ 'text-[#ff0000] text-xs pt-0.5': vv.password.$dirty }"
            >
              {{ error.$message }}
            </div>
          </div>
        </template>
      </div>
      <div class="w-1/2 mx-1">
        <label
          for="confirmPassword"
          class="
            block
            mb-2
            text-sm
            font-medium
            text-gray-900
            dark:text-gray-300
          "
          >Confirm password</label
        >
        <input
          v-model="vv.confirmPassword.$model"
          type="password"
          id="confirmPassword"
          class="
            bg-gray-50
            border border-gray-300
            text-gray-900 text-sm
            rounded-lg
            focus:ring-blue-500 focus:border-blue-500
            block
            w-full
            p-2.5
            dark:bg-gray-700
            dark:border-gray-600
            dark:placeholder-gray-400
            dark:text-white
            dark:focus:ring-blue-500
            dark:focus:border-blue-500
          "
          placeholder="•••••••••"
          :class="{ 'border-2 border-[#ff0000]': vv.confirmPassword.$error }"
        />
        <template v-if="vv.confirmPassword.$dirty">
          <div
            v-for="error of vv.confirmPassword.$errors"
            :key="error.$message"
          >
            <div
              :class="{
                'text-[#ff0000] text-xs pt-0.5': vv.confirmPassword.$dirty,
              }"
            >
              {{ error.$message }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <button
      type="submit"
      class="
        text-[#fff]
        bg-[#C2400D]
        hover:bg-[#9A3412]
        focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium
        rounded-lg
        text-sm
        w-full
        px-5
        py-2.5
        text-center
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
      "
      :class="{
        'cursor-not-allowed opacity-50 disabled:bg-[#C2400D]': vv.$error,
      }"
      :disabled="vv.$error"
    >
      Submit
    </button>
  </form>
  <div class="rotate-y text-sm opacity-80 text-center">
    Already have own laboratory?
    <router-link to="/login" class="text-sm opacity-80 underline"
      >Login now!</router-link
    >
  </div>
</template>

<style lang="scss" scoped>
</style>