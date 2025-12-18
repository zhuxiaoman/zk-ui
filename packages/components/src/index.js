// 导入所有组件
import ZkButton from '../button/button.vue'
import ZkTag from '../tag/tag.vue'

// 组件列表
const components = [
  ZkButton,
  ZkTag
]

// 定义 install 方法，接收 Vue 作为参数
const install = function (app) {
  // 遍历注册所有组件
  components.forEach(component => {
    app.component(component.name, component)
  })
}

// 判断是否是直接引入文件，如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default {
  install,
  ZkButton,
  ZkTag
}

// 单独导出
export {
  ZkButton,
  ZkTag
}