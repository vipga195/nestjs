<template>
  <CheckTimeRange :start-time="startTime" :end-time="endTime">
    <slot />
  </CheckTimeRange>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import CheckTimeRange from '~/modules/time/CheckTimeRange.vue'
export default defineComponent({
  name: 'WhenInTime',
  components: { CheckTimeRange },
  props: {
    startTime: {
      type: Date as PropType<Date>,
      required: true
    },

    endTime: {
      type: Date as PropType<Date>,
      required: true
    }
  }
})
</script>
