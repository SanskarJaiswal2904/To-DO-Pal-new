<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Navbar from './components/Navbar.vue'; // Import your Navbar component

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
});
</script>

<!-- background: linear-gradient(to left, #1f1f1f, #ffffff); -->
<style scoped>
*{
  background: linear-gradient(to right, #ff7e5f, #feb47b, #ffcc33, #fddb92);
}

</style>
