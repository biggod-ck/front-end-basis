<template>
  <div id="app">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/about">about</el-menu-item>
      <el-menu-item index="/vue">Vue子应用</el-menu-item>
      <el-menu-item index="/react">React子应用</el-menu-item>
    </el-menu>
    <router-view />
    <div id="childVue"></div>
    <div id="childReact"></div>
  </div>
</template>

<style></style>
