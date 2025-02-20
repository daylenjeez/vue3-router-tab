<div align="center">
    <div align="center"><img src="https://github.com/daylenjeez/vue3-router-tab/assets/111993029/71058201-d832-43d2-8396-04def7756971" width=240 /></div>
    <h2 align="center">vue3-router-tab</h2>
    <div align="center">Implement opening/switching tabs via routing in <code>vue3</code>. Supports tabs' keepAlive; Compatible with multiple component library styles and provides rich APIs.</div>
    <div align="center"><strong>English</strong> | <a href="README.md">中文</a></div>
</div>

> [!WARNING]  
> The project is still under development and has not been released yet. Progress: **65%**

## Features

- **✊ Easy to Get Started**: Low learning curve, simple to integrate, and incorporates most features of [Vue Router Tab](https://bhuh12.github.io/vue-router-tab/zh/).
- **🎨 Highly Customizable**: Offers a wealth of APIs and configurations. Use basic features or customize as needed.
- **📚 Multi-component Compatibility**: Supports styles from various mainstream component libraries, such as elementPlus, antdV, naviUI, Tailwind.css.

## Functionality

- ### Basic
  - [x] Events:
    - [x] Responds to open/switch tabs via routing
    - [-] Lifecycle hooks
  - [-] Methods: Open/Close/Close Others/Refresh/Switch/Right-click Operations
    - [x] Open/Replace
    - [x] Close
    - [x] Close Others
    - [x] Refresh
    - [ ] Right-click Operations
    - [ ] Reset
  - [x] Cache: Cache Control
  - [ ] Configurations: Global and Custom Configurations
- ### Advanced
  - [x] iframe: iframe routing
  - [ ] Styles: Includes `elementPlus`, `antdV`, `naviUI`
- ### Others
  - [ ] Animations
  - [ ] `i18n`
  - [ ] Analytics

## Installation

```bash
npm install vue3-router-tab
```

## Usage

1. Import `vue3-router-tab` in the entry file

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

2. Incorporate the `vue-router-tab` component wherever needed

```html
<!-- App.vue -->
<template>
  <div class="container">
    <vue-router-tab />
  </div>
</template>
```

## Dependencies

- **💪TypeScript**: Makes the code more robust during the development phase.
- **👬Vitest**: The most trustworthy testing companion.
