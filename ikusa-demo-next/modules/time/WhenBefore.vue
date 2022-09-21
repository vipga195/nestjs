<template>
  <CheckTime :time="time">
    <template #before>
      <slot />
    </template>
  </CheckTime>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue'
import CheckTime from './CheckTime.vue'
export default defineComponent({
  name: 'WhenBefore',
  components: { CheckTime },
  props: {
    time: {
      type: Date as PropType<Date>,
      required: true
    }
  }
})
</script>
