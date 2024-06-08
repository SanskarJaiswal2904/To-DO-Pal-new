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
  background: linear-gradient(to right, #ffa088, #fce942);
}

</style>
