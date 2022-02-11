<template>
  <div class="demo">
    <h1>Hello, welcome to IoT.sany!</h1>

    <el-button @click="onFaultClick">错误接口访问</el-button>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import axios from '@/utils/request'

export default {
  setup() {
    const state = reactive({
      count: 0
    })

    const onFaultClick = () => {
      axios.post('/api/monitor/redis/msg')
    }

    return {
      ...toRefs(state),
      onFaultClick
    }
  }
}
</script>

<style lang="scss" scoped></style>
