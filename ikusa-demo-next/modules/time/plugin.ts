import { Plugin } from '@nuxt/types'
import * as Time from './time'

type TimeFuncs = typeof Time

export default <Plugin> function(_ctx, inject) {
  inject('timeFn', Time)
}

declare module 'vue/types/vue' {
  // this.$link inside Vue components
  interface Vue {
    $timeFn: TimeFuncs
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$link inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $timeFn: TimeFuncs
  }
  // nuxtContext.$link
  interface Context {
    $timeFn: TimeFuncs
  }
}
