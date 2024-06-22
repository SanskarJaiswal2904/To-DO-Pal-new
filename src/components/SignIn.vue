<template>
    <div class="allclassparent">
      <div class="image-container">
        <img src="../assets/todopalLogo.png" alt="Website Logo" width="200px" class="centered-image">
      </div>
      <h1>Login</h1>
  
      <form @submit.prevent="handleLogin">
        <label for="email" name="Email">Email</label>
        <input type="email" placeholder="Enter your Email" v-model.lazy="email" name="email" class="input-field" required />
        <br /><br />
        <label for="password" name="password">Password</label>
        <input type="password" placeholder="Enter your Password" v-model.lazy="password" name="password" class="input-field" required />
        <br /><br />
        <button type="submit" class="login-btn">Login</button>
      </form>
      <router-link to="/signup" class="signup-link">
        <h3>Don't have an account? Sign Up</h3>
      </router-link>
      <div class="text-white2">
        <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html">
          <i class="fas fa-link"></i> Made By Sanskar
        </a>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { useTaskStore } from '../store/TaskStore'; // Adjust the import path as needed
  import axios from 'axios';
  
  export default {
    name: 'SignIn',
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter();
      const TaskStore = useTaskStore();
  
      onMounted(() => {
        document.title = "TO-DO Pal - Login";
        let data = localStorage.getItem('user-info');
        if (data) {
          router.push({ name: 'Notes' }).then(() => {
            setTimeout(() => {
              location.reload();
            }, 1);
          });
        }
      });
  
      const handleLogin = async () => {
        console.log('Email ->', email.value, ', Password ->');
  
        try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
            email: email.value,
            password: password.value
          });
          if (response.status === 200) {
            const user = response.data; 
  
            // Save user info to localStorage
            localStorage.setItem('user-info', JSON.stringify(user));
  
            // Update Pinia store
            TaskStore.logIn(user);

            console.log('User:', user);
            console.log('User:', user._id.$oid);
            console.log('User ID:', user._id);
            console.log('User Name:', user.name);
  
            // Clear form fields
            email.value = '';
            password.value = '';
  
            // Redirect the user to the desired page
            router.push({ name: 'Notes' }).then(() => {
              setTimeout(() => {
                location.reload();
              }, 1);
            });
          }
        } catch (error) {
          alert(error.response.data.error);
          console.error(error);
        }
      };
  
      return {
        email,
        password,
        handleLogin
      };
    }
  };
  </script>
  

<style scoped>
.allclassparent {
    height: 100vh;

}

.text-white2 {
    text-align: center;
    text-decoration: none;
    font-weight: 900;
    font-size: large;
    color: purple;
    margin-top: 5px;

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
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.signup-link {
    text-align: center;
    margin: 20px;
    text-decoration: none;
    color: blue;
}

.login-btn:hover {
    background-color: #0056b3;
}
</style>
