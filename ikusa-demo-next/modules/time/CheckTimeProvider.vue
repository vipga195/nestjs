<template>
  <div class="check-time-provider">
    <slot />
    <CheckTimeDebug
      v-if="canDebug"
      :debug-config="debugConfig"
      :server-time="serverTime"
      @stopDebug="stopDebug"
      @updateConfig="updateConfig"
    />
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, InjectionKey, PropType, provide, Ref, toRefs } from 'vue'
import CheckTimeDebug from './CheckTimeDebug.vue'
import { Dayjs, getCurrentTime, getTime } from './time'

export type DebugConfig = {
  time: string
  debugScreens: boolean
}

export const $isUseDebugTime: InjectionKey<Ref<boolean>> = Symbol('Check time - Is use debug time')
export const $now: InjectionKey<Ref<Dayjs>> = Symbol('Check time - Now (DayJS)')
export const $nowDate: InjectionKey<Ref<Date>> = Symbol('Check time - Now (Date)')
export const $debugScreens: InjectionKey<Ref<Boolean>> = Symbol('Check time - Debug Screens')

function serverEncode(content: string): string {
  return Buffer.from(content).toString('base64')
}
function serverDecode(content: string): string {
  return (Buffer.from(content, 'base64')).toString()
}
function clientDecode(content: string): string | false {
  try {
    return atob(content)
  } catch (_) {
    //
  }
  return false
}

// Name of meta tag to contain server's time
// Tag name is encoded to add more difficult to search
const metaTime = (process.server ? serverDecode : clientDecode)('X19fYXQ=') || '__t'

export default defineComponent({
  name: 'CheckTimeProvider',
  components: { CheckTimeDebug },
  props: {
    canDebug: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false
    },
    debugConfig: {
      type: Object as PropType<DebugConfig>,
      require: false,
      default: () => ({})
    }
  },
  emits: {
    updateConfig: (config: DebugConfig) => config,
    stopDebug: () => true
  },
  setup(props, { emit }) {
    const { canDebug, debugConfig } = toRefs(props)

    const debugScreens = computed(() => (!!canDebug.value && debugConfig.value?.debugScreens) || false)
    const debugTime = computed<Dayjs | null>(() => !!canDebug.value && debugConfig.value.time ? getTime(debugConfig.value.time) : null)

    const realCurrentTime = process.server ? getCurrentTime() : getCurrentTimeClientSide()
    const now = computed<Dayjs>(() => {
      if (!canDebug.value || !debugTime.value || !debugTime.value?.isValid()) {
        return realCurrentTime
      }

      return debugTime.value
    })
    const nowDate = computed(() => now.value.toDate())
    const nowStr = computed(() => now.value.format())
    const isUseDebugTime = computed(() => now.value !== realCurrentTime)

    function updateConfig(newConfig: DebugConfig) {
      if (!canDebug.value) {
        // eslint-disable-next-line no-console
        console.warn('No debug env')
        return
      }

      // console.log('Update config:', newConfig)
      emit('updateConfig', newConfig)
    }

    function stopDebug() {
      emit('stopDebug')
    }

    provide($isUseDebugTime, isUseDebugTime)
    provide($now, now)
    provide($nowDate, nowDate)
    provide($debugScreens, debugScreens)

    function getClientFallbackTime() {
      // TODO: provide fallback time
      return getCurrentTime()
    }

    function getCurrentTimeClientSide() {
      const $meta = document?.querySelector<HTMLMetaElement>(`meta[name="${metaTime}"]`) || null

      if ($meta) {
        const decodedTime = clientDecode($meta.content)
        if (decodedTime) {
          const time = getTime(decodedTime)
          if (time.isValid()) {
            return time
          }
        }
      }

      return getClientFallbackTime()
    }

    return {
      now: now.value.toDate(),
      nowStr,
      isUseDebugTime,
      stopDebug,
      updateConfig,
      serverTime: realCurrentTime.format('YYYY-MM-DD HH:mm:ss Z')
    }
  },
  head() {
    const meta = []
    if (process.server) {
      meta.push({ name: metaTime, content: serverEncode(getCurrentTime().toISOString()), once: true })
    }

    return {
      meta
    }
  }
})
</script>

<style scoped lang='css'>
.check-time-provider {
  position: relative;
}
</style>
