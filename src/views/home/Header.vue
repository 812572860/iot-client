<!--头部信息-->
<template>
  <div class="header">
    <router-link to="/demo">Demo</router-link>
    <router-link to="/dictionary">字典管理</router-link>
    <router-link to="/user">租户管理</router-link>
    <router-link to="/menu">菜单管理</router-link>
    <router-link to="/department">组织机构管理</router-link>
    <router-link to="/login">退出</router-link>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  setup() {
    const state = reactive({
      count: 0
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  a {
    font-size: 1.6rem;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
}
</style>
