/**
 * created own global components (svg icon components)
 * @param Vue
 * @param options
 * @returns {Promise<void>}
 * @constructor
 * @see https://dev.to/the_one/unified-svg-icons-with-vite-vue-3-quasar-and-pinia-2c01
 * @see https://v3.vuejs.org/guide/plugins.html#writing-a-plugin
 * 
*/

import { createApp } from 'vue'

const app = createApp({})
const globalComponentsPaths = import.meta.globEager('/src/components/**/*.vue')

Object.entries(globalComponentsPaths).forEach(([path, module]) => {
  // "./components/SvgIcon.vue" -> "SvgIcon"
  const componentName = path
  .split('/')
  .pop()
  .replace(/\.vue$/, '')
  console.log(componentName, module);

  app.component(componentName, module.default)
})