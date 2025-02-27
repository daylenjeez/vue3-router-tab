<div align="center">
    <div align="center"><img src="https://github.com/daylenjeez/vue3-router-tab/assets/111993029/71058201-d832-43d2-8396-04def7756971" width=240 /></div>
    <h2 align="center">vue3-router-tab</h2>
    <div align="center">实现在<code>vue3</code>中通过路由响应打开/切换页签，同时支持页签keepAlive；兼容多个组件库样式并提供丰富的Api；</div>
    <div align="center"><strong>中文</strong> | <a href="README.en.md">English</a></div>
</div>

> [!WARNING]  
> 项目还在开发当中，暂未发布，进度**65%**

## 特点

- **✊简单易上手**：学习成本低，简单引入即可使用，沿用 [Vue Router Tab](https://bhuh12.github.io/vue-router-tab/zh/) 的大部分功能；
- **🎨高度定制化**：提供丰富的api和配置，你可以简单使用基本功能，也可以根据需要高度定制化；
- **📚多组件兼容**：支持多种主流组件库样式，如elementPlus、antdV、naviUI、Tailwind.css；

## 功能

- ### 基础
  - [x] 事件：
    - [x] 响应路由打开/切换页签
    - [ ] 生命周期钩子
  - [ ] 方法：打开/关闭/关闭其它/刷新/切换/右键操作
    - [x] 打开/替换
    - [x] 关闭
    - [x] 关闭其他
    - [x] 刷新
    - [ ] 右键操作
    - [ ] 重置
  - [x] 缓存：缓存控制
  - [ ] 配置：全局配置、自定义配置
- ### 高级
  - [x] iframe：iframe路由
  - [ ] 样式：包含`elementPlus`、`antdV`、`naviUI`
- ### 其它
  - [ ] 动画
  - [ ] `i18n`
  - [ ] 埋点

## 安装

```bash
npm install vue3-router-tab
```

## 使用

1. 在入口文件引入`vue3-router-tab`

```ts
// main.ts
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import RouterTab from "./plugins/vue3-router-tab";

const app = createApp(App);

app.use(router);
app.use(RouterTab, { router });
app.mount("#app");
```

2. 在需要的位置引入`vue-router-tab`组件

```html
<!-- App.vue -->
<template>
  <div class="container">
    <vue-router-tab />
  </div>
</template>
```

## 依赖

- **💪TypeScript**：在开发阶段就让代码更健壮；
- **👬Vitest**：最值得信任的测试伙伴；
