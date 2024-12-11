<template>
  <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>

    <div class="allclassparent">
      <div class="image-container">
        <img src="../assets/todopalLogo.png" alt="Website Logo" width="200px" class="centered-image">
      </div>
      <h1 class="main-header">Login</h1>
  
      <form @submit.prevent="handleLogin">
        <label for="email" name="Email" class="input-feild-title-style">Email</label>
        <input type="email" placeholder="Enter your Email" v-model.lazy="email" name="email" class="input-field" required />
        <br /><br />
        <label for="password" name="password" class="input-feild-title-style">Password</label>
        <input type="password" placeholder="Enter your Password" autocomplete="off" v-model.lazy="password" name="password" class="input-field" required />
        <br /><br />
        <button type="submit" class="login-btn" :disabled="isLoading">
          <span v-if="isLoading">Logging in...</span>
          <span v-else>Login</span>
        </button>
      </form>
      <router-link to="/signup" class="signup-link">
        <h3>Don't have an account? Sign Up</h3>
      </router-link>
      <div class="text-white2">
        <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html" style="margin-bottom: 10px; font-size: 1.2rem; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center; transition: all 0.3s ease;">
            <i class="fas fa-link" style="margin-right: 8px; font-size: 1.5rem;"></i> 
            Made By Sanskar
        </a>
    </div>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTaskStore } from '../store/TaskStore'; // Adjust the import path as needed
  import axios from 'axios';
  import Toast from './Toast.vue';
  
  // Reactive variables using Composition API
  const email = ref('');
  const password = ref('');
  const isLoading = ref(false);

  const toastMessage = ref('');
  const toastType = ref('');
  const toastPausable = ref(false);
  const toastKey = ref(0);

  const router = useRouter();
  const TaskStore = useTaskStore();
  
  // Handle component mounted logic (onMounted lifecycle hook)
  onMounted(() => {
    document.title = "TO-DO Pal - Login";
    const data = localStorage.getItem('user-info');

    //Toast
    updateToast('Welcome to To-Do Pal.', 'info', true);

    setTimeout(() => {
      //Toast
      updateToast('First you need to Signup to access this App.', 'info', true);
    }, 1300);


    if (data) {
      //Toast
      updateToast('Already logged in.', 'info', true);
      router.push({ name: 'Notes' }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1300);
      });
    }
  });

  //Update toast
  const updateToast = (msg, type, pause) => {
    toastMessage.value = msg;
    toastType.value = type;
    toastPausable.value = pause;
    toastKey.value++; // Increment the key to force re-render
    console.log('Toast displayed')
  }
  
  //Login Handler
  const handleLogin = async () => {
  try {
    isLoading.value = true; // Disable the button
    const response = await axios.post(
      'https://to-do-pal-new.onrender.com/login', // Explicitly use the backend URL
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 200) {
      const user = response.data;
      localStorage.setItem('user-info', JSON.stringify(user));
      TaskStore.logIn(user);

      // Update toast properties after successful login
      updateToast('Login successful!', 'success', false);

      setTimeout(() => {
        router.push({ name: 'Notes' });
      }, 1500);
    }
  } catch (error) {
    console.error(error);
    alert(error.response?.data?.error || 'An error occurred');
  } finally {
    isLoading.value = false; // Enable the button in all cases
  }
  };

  </script>
  
<style scoped>
.main-header {
  font-family: sans-serif;
  font-weight: 700;
  font-style: normal;
}
.input-feild-title-style{
  font-family: "IBM Plex Serif", serif;
  font-weight: 400;
  font-style: normal;
}

.allclassparent {
  height: 100vh;
}


.text-white2 {
  font-size: 1.2rem; 
  font-weight: bold;
  color: rgba(0, 43, 151, 0.86);
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  transition: all 0.3s ease;
}

.text-white2:hover {
  color: linear-gradient(to right, purple, pink); /* Gradient background */
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Shadow effect */
}

.text-white2 i {
  margin-right: 8px; /* Space between the icon and text */
  font-size: 1.5rem;
  transition: transform 0.3s ease;
}

.text-white2:hover i {
  transform: rotate(15deg); /* Icon rotation on hover */
}

/* Style for the login page */
.image-container {
    text-align: center;
    /* Horizontally center the image container */
}

.centered-image {
    margin: 0 auto;
    /* Horizontally center the image */
    display: block;
    /* Ensure the image is treated as a block element */
    max-width: 100%;
    height: auto;
}

body {
    background-color: #f7f7f7;
}

h1 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    margin-top: 10px;
    max-width: 400px;
    margin: 0 auto;
}

.input-field {
    width: 100%;
    height: 40px;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(to right, #6a11cb, #2575fc, #ff41f9);
  color: #fff;
  font-size: 1.2rem; /* Larger text */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.login-btn:hover {
  background: linear-gradient(to right, #3e026e, #1d4ed8, #ff0080);
  transform: scale(1.05); /* Slight scale-up effect */
  box-shadow: 0 8px 15px rgba(0, 123, 255, 0.3); /* Soft shadow for depth */
}

.signup-link {
    text-align: center;
    margin: 20px;
    text-decoration: none;
    color: blue;
}

</style>
