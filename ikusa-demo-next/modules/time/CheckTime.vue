<template>
  <div class="check-time">
    <template v-if="isShowBefore">
      <slot name="before" />
    </template>
    <template v-if="isShowInTime">
      <slot />
    </template>
  </div>
</template>

<script lang='ts'>
import { defineComponent, inject, PropType } from 'vue'
import { $now, $debugScreens } from './CheckTimeProvider.vue'

export default defineComponent({
  name: 'CheckTime',
  props: {
    time: {
      type: Date as PropType<Date>,
      required: true
    }
  },
  setup() {
    return {
      now: inject($now),
      debugScreens: inject($debugScreens)
    }
  },
  computed: {
    isInTime(): boolean {
      return this.now?.isSameOrAfter(this.time) || false
    },

    isShowBefore(): boolean {
      return !!this.debugScreens || !this.isInTime
    },

    isShowInTime(): boolean {
      return !!this.debugScreens || this.isInTime
    }
  }
})
</script>
