# Vue3-router-tab

> 在 vue3 中，使用 vue-router 与插件结合实现Tab与前端路由的交互同步，比如打开路由时新增tab；功能基本参考 [vue-router-tab](https://github.com/bhuh12/vue-router-tab)；
> 目前还在开发当中

## 功能

- 基本
  - [x] $router.push or router-link 路由跳转触发新增tab
      - [x] path：根据path匹配tab
      - [x] fullpath: 根据fullpath匹配tab
      - [x] 自定义函数：(router)=>string
   - [ ] handler api
     - [ ] close api
        - [ ] close current
        - [ ] closeAll
        - [ ] close others
     - [ ] open api
        - [ ] replace
        - [ ] refresh
        - [ ] insert opsition
- 全局配置
    - [ ] 往前插入 or 往后插入
    - [ ] keepalive
    - [ ] icon
    - [ ] theme
        - [ ] initial
        - [ ] element plus
        - [ ] antdv
    - [ ]  hooks
 
- 高级
   - [ ] iframe
   - [ ] scroll position
   - [ ] transition
   - [ ] context menu
 
## 使用

```js
   import { createApp } from "vue";
   import App from "./App.vue";
   import router from "./router";
   import RouterTab from "./plugins/vue3-router-tab";

   const app = createApp(App);

   app.use(router);
   app.use(RouterTab, { router });
   app.mount("#app");

```

```vue
<template>
  <router-tab />
</template>
```
