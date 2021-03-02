<template>
  <div id="nav">
    <router-link to="/">Login</router-link>
  </div>
  <router-view />
</template>

<style>
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
