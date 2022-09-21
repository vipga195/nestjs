<template>
  <div :class="{'full-show': isFullShowing}" class="check-time-debug">
    <div class="now-time" @click="toggleShow">
      <span v-if="isUseDebugTime && now">Now is: {{ nowStr }}</span> <span v-else>Debug</span>
      <img
        v-if="!isFullShowing"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTIgOGw2IDZINnoiLz48L2c+PC9zdmc+"
        class="arrow-icon"
      >
      <img
        v-if="isFullShowing"
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgdmlld0JveD0iMCAwIDI0IDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNMTIgMTZsLTYtNmgxMnoiLz48L2c+PC9zdmc+"
        class="arrow-icon"
      >
    </div>

    <form v-if="isFullShowing" @submit.prevent="applyChange">
      <hr class="spacing">
      <div v-if="serverTime">
        Server time: {{ serverTime }}
      </div>
      <table class="full-width">
        <tbody>
          <tr>
            <td>Date</td>
            <td>
              <input v-model="controlDateValue" type="date" class="control full-width">
            </td>
          </tr>
          <tr>
            <td>Hour</td>
            <td>
              <select v-model="controlHourValue" name="hour" class="control full-width">
                <option value="" />
                <option v-for="value of range(0, 24).map(prefixZero)" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Minute</td>
            <td>
              <select v-model="controlMinuteValue" name="minute" class="control full-width">
                <option value="" />
                <option v-for="value of range(0, 60).map(prefixZero)" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td>Second</td>
            <td>
              <select v-model="controlSecondValue" name="second" class="control full-width">
                <option value="" />
                <option v-for="value of range(0, 60).map(prefixZero)" :key="value" :value="value">
                  {{ value }}
                </option>
              </select>
            </td>
          </tr>
          <tr>
            <td class="p-4">
              <label for="check-time-debug__debug-screens">Show all time screens</label>
            </td>
            <td class="p-4">
              <input id="check-time-debug__debug-screens" v-model="controlDebugScreens" type="checkbox" class="control">
            </td>
          </tr>
        </tbody>
      </table>
      <hr class="spacing">
      <div class="button-group">
        <button type="submit" class="button" :disabled="!isValidCombinedTime" :title="!isValidCombinedTime ? 'Debug values is invalid': ''" style="padding-left: 2em; padding-right: 2em;">
          Apply
        </button>
        <button type="button" class="button" title="Reset changes to current debug config" @click="onReset">
          Reset
        </button>
        <button type="button" class="button" :disabled="!isUseDebugTime" @click="onStopDebug">
          Stop Debug
        </button>
      </div>
    </form>
  </div>
</template>
<script lang='ts'>
import { computed, defineComponent, inject, PropType, ref, toRefs, watch } from 'vue'
import { $isUseDebugTime, $now, DebugConfig } from './CheckTimeProvider.vue'
import { getTime } from './time'

export default defineComponent({
  name: 'CheckTimeDebug',
  props: {
    serverTime: {
      type: String as PropType<string>,
      required: false,
      default: ''
    },
    debugConfig: {
      type: Object as PropType<DebugConfig>,
      required: true
    }
  },
  emits: {
    updateConfig: (config: DebugConfig) => config,
    stopDebug: () => true
  },
  setup(props, { emit }) {
    const { debugConfig } = toRefs(props)
    const now = inject($now)
    const isUseDebugTime = inject($isUseDebugTime)

    const controlDateValue = ref<string>('')
    const controlHourValue = ref<string>('')
    const controlMinuteValue = ref<string>('')
    const controlSecondValue = ref<string>('')

    const controlDebugScreens = ref<boolean>(false)
    const fullShow = ref(false)
    const isFullShowing = computed(() => !!fullShow.value)
    const timeCombined = computed(() => {
      if (![controlDateValue.value, controlHourValue.value, controlMinuteValue.value, controlSecondValue.value].every(Boolean)) { return '' }
      return `${controlDateValue.value}T${prefixZero(controlHourValue.value)}:${prefixZero(controlMinuteValue.value)}:${prefixZero(controlSecondValue.value)}`
    })
    const isValidCombinedTime = computed(() => !!timeCombined.value)

    function toggleShow() {
      fullShow.value = !fullShow.value
    }

    function applyChange() {
      const newConfig = {
        time: timeCombined.value ? timeCombined.value + '+09:00' : '',
        debugScreens: controlDebugScreens.value
      }
      if (!isValidCombinedTime.value) {
        // eslint-disable-next-line no-console
        console.log('Not valid')
        return
      }
      // eslint-disable-next-line no-console
      console.log('Apply change', newConfig)
      emit('updateConfig', newConfig)
    }

    function onReset() {
      applyValueFromDebugConfig(debugConfig.value)
    }

    function onStopDebug() {
      if (confirm('Stop debug time, sure?')) {
        emit('stopDebug')
      }
    }

    function range(min: number, max: number) {
      return Array(max - min).fill(0).map((_, i) => min + i)
    }

    function prefixZero(value: unknown): string {
      return `00${value}`.slice(-2)
    }

    function applyValueFromDebugConfig(value: DebugConfig) {
      if (value.time) {
        const time = getTime(value.time)
        if (time.isValid()) {
          controlDateValue.value = time.format('YYYY-MM-DD')
          controlHourValue.value = time.format('HH')
          controlMinuteValue.value = time.format('mm')
          controlSecondValue.value = time.format('ss')
        }
      } else {
        controlDateValue.value = ''
        controlHourValue.value = ''
        controlMinuteValue.value = ''
        controlSecondValue.value = ''
      }

      controlDebugScreens.value = !!value.debugScreens
    }

    watch(debugConfig, (value) => {
      applyValueFromDebugConfig(value)
    }, { immediate: true })

    return {
      now,
      isUseDebugTime,
      controlDateValue,
      controlHourValue,
      controlMinuteValue,
      controlSecondValue,
      controlDebugScreens,
      fullShow,
      isFullShowing,
      timeCombined,
      isValidCombinedTime,
      toggleShow,
      applyChange,
      onReset,
      onStopDebug,
      range,
      prefixZero
    }
  },

  computed: {
    nowStr(): string {
      return this.now?.format('YYYY-MM-DD HH:mm:ss Z') || 'Debug'
    }
  }
})
</script>
<style lang='css' scoped>
.check-time-debug {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #991b1b;
  color: white;
  padding: 0.5em;
  z-index: 1000;
  max-width: 100vw;
}

.now-time {
  cursor: pointer;
}

.control {
  color: #007cca;
  padding: 0.5em;
}

.full-width {
  display: block;
  width: 100%;
}

.spacing {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

form td {
  padding: 0.5em 0.5em;
}

form .control {
  min-width: 150px;
}

.button-group {
  text-align: center;
}

.button-group * + * {
  margin-left: 1em;
}

.button {
  padding: 0.5em;
  border: 1px solid white;
}

.button:disabled {
  color: gray;
  border-color: gray;
  background-color: #aaaaaa;
}

.arrow-icon {
  display: inline-block;
  width: 30px;
  filter: invert(1);
}
</style>
