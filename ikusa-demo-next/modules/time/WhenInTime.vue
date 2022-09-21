<template>
  <CheckTime :time="time">
    <slot />
  </CheckTime>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import CheckTime from '~/modules/time/CheckTime.vue'
export default defineComponent({
  name: 'WhenInTime',
  components: { CheckTime },
  props: {
    time: {
      type: Date as PropType<Date>,
      required: true
    }
  }
})
</script>
