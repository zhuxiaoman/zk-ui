/*
 * @Author: zhuxiaoman
 * @Date: 2025-12-12
 * @Description: Utility function to make components installable
 */

export const withInstall = (component) => {
  component.install = (app) => {
    app.component(component.name || component.__name, component)
  }
  return component
}