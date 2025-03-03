import { createApp } from 'vue';
import { createPinia } from 'pinia'; // Import createPinia
import VTooltip from 'v-tooltip';
import App from './App.vue';
import router from './routes/index';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

// 1. Use Pinia for global state management
const pinia = createPinia(); // Create Pinia instance
app.use(pinia);
app.use(Toast);



// 3. Use VTooltip directive
app.directive('tooltip', VTooltip);

// 4. Mount the app and provide the router
app.use(router).mount('#app');

export { pinia }; // Export Pinia instance for usage in components
