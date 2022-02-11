export default {
  mounted(el, binding) {
    function clickHandler(e) {
      // 判断点击的是否包含本身
      if (el.contains(e.target) || el.contains(e.target.parentNode)) return
      // 判断指令中是否包涵了回调函数
      if (binding.expression) {
        binding.value(e)
      }
    }
    el._clickoutside = clickHandler
    // 注册点击事件
    document.addEventListener('click', clickHandler)
  },
  beforeUnmount(el) {
    // 解除点击事件绑定
    document.removeEventListener('click', el._clickoutside)
    delete el._clickoutside
  }
}
