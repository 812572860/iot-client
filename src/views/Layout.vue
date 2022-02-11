<template>
  <div class="main-container">
    <top-header></top-header>
    <!-- 带有跳转动画的router-views -->
    <router-view v-slot="{ Component }" class="router-view">
      <!-- <transition name="fade" enter-active-class="animate__animated animate__zoomIn"> -->
      <transition name="fade-transform" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

import TopHeader from './home/Header.vue'

export default {
  components: {
    TopHeader
  },
  setup() {
    const state = reactive({
      count: 0
    })

    const router = useRoute()
    const routerKey = router.path

    return {
      routerKey,
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}
.router-view {
  flex: 1;
}

/* fade-transform */
.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
