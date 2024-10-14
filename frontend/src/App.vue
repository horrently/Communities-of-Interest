<template>
  <div id="app">
    <div class="container">
      <navbar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
}
</style>
