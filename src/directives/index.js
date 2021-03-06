/*
// 注册
app.directive('my-directive', {
 // 指令是具有一组生命周期的钩子：
 // 在绑定元素的 attribute 或事件监听器被应用之前调用
 created() {},
 // 在绑定元素的父组件挂载之前调用
 beforeMount() {},
 // 绑定元素的父组件被挂载时调用
 mounted(el, binding, vnode) {},
 // 在包含组件的 VNode 更新之前调用
 beforeUpdate() {},
 // 在包含组件的 VNode 及其子组件的 VNode 更新之后调用
 updated() {},
 // 在绑定元素的父组件卸载之前调用
 beforeUnmount(el, binding) {},
 // 卸载绑定元素的父组件时调用
 unmounted() {}
})
*/

import hasPermi from './hasPermi'
import clickOutside from './clickoutside'

//  注册权限
export default function installDirective(app) {
  app.directive('hasPermi', hasPermi)
  app.directive('clickOutside', clickOutside)
}
