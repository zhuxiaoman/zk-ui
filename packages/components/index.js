/*
 * @Author: zhuxiaoman
 * @Date: 2025-10-24 16:05:09
 * @LastEditors: zhuxiaoman
 * @LastEditTime: 2025-10-24 16:56:32
 * @FilePath: \zk-ui\packages\components\index.js
 * @Description: 
 */
// export * from './components'
// import { installer as install } from './installer'

// export default {
//   install
// }
import { default as ZkUI } from './src/index.js'

export * from './button'
export * from './tag'
export { themeUtils } from './src/index.js'

// 添加默认导出
export default ZkUI