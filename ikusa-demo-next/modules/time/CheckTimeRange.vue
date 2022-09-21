<template>
  <div class="check-time">
    <slot v-if="isShowBefore" name="before" />
    <slot v-if="isShowInTime" />
    <slot v-if="isShowEnded" name="ended" />
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType } from 'vue'
import { $now, $debugScreens } from './CheckTimeProvider.vue'
export default defineComponent({
  name: 'CheckTimeRange',
  props: {
    startTime: {
      type: Date as PropType<Date>,
      required: true
    },

    endTime: {
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
    isBefore(): boolean {
      return !!this.now?.isBefore(this.startTime)
    },
    isInTime(): boolean {
      if (!this.now) { return false }
      return this.now.isSameOrAfter(this.startTime) && this.now.isBefore(this.endTime)
    },
    isEnded(): boolean {
      return !!this.now?.isSameOrAfter(this.endTime)
    },

    isShowBefore(): boolean {
      return !!this.debugScreens || this.isBefore
    },

    isShowInTime(): boolean {
      return !!this.debugScreens || this.isInTime
    },

    isShowEnded(): boolean {
      return !!this.debugScreens || this.isEnded
    }
  }
})
</script>
