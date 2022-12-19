<script setup>
import { inject, computed } from 'vue'

const store = inject('store')

// Computed
const getUploadProcess = computed(() => store.state.uploadProcess)

// Methods
const uploadFile = async (e) => {
    const file = e.target.files[0]
    await store.actions.uploadFile(file);
}
</script>

<template>
    <div class="rotate-y w-full">
        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-page transition-colors ease-in-out">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                <svg aria-hidden="true" class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">txt, doc, docx and pdf documents</p>
            </div>
            <input @change="uploadFile" id="dropzone-file" type="file" class="hidden" />
        </label>
        <div v-if="getUploadProcess" class="upload-process relative mt-4 border-2 border-spacing-4 w-full h-4 bg-page rounded-lg">
            <div class="absolute top-0 left-0 h-full bg-[#7C0B13] rounded-lg" :style="{ width: `${getUploadProcess}%` }"></div>
            <div class="absolute -top-[5px] left-[47%] text text-[#fff] text-" >{{getUploadProcess}} %</div>
        </div>
    </div> 
</template>

