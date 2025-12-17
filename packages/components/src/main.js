import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ZkButton from '../button/index.js'

const app = createApp({
  template: `
    <div>
      <h1>ZK UI Components Demo</h1>
      <zk-button type="warning">Click me1</zk-button>
    </div>
  `,
  components: {
    ZkButton
  }
})

app.use(ElementPlus)
app.mount('#app')