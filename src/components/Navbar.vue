<template>
  <div class="navbar main-header">
    <ul class="nav-menu">
      <div class="item1">
        <router-link to="/" style="text-decoration: none;" title="Home">
          <h3 class="app-logo">TO-DO Pal</h3>
      </router-link>
        <li :class="{ active: isActive('/') }">
          <router-link class="nav-item nav-link" to="/" title="Home">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li :class="{ active: isActive('/about') }">
          <router-link class="nav-item nav-link" to="/about" title="About">
            <i class="fas fa-info-circle"></i> About
          </router-link>
        </li>
        <li :class="{ active: isActive('/profile') }">
          <router-link class="nav-item nav-link" to="/profile" title="Profile">
            <i class="fas fa-user"></i> Profile
          </router-link>
        </li>
        <li :class="{ active: isActive(userIsAdmin ? '/admin' : '/notadmin') }">
          <router-link
            class="nav-item nav-link"
            :class="{ disabled: !userIsAdmin }"
            :to="userIsAdmin ? '/admin' : '/notadmin'"
            :title="userIsAdmin ? 'Admin' : 'Access Denied'"
            :style="!userIsAdmin ? 'color: lightgray;' : ''"
          >
            <i class="fas fa-user-shield"></i> Admin
          </router-link>
        </li>
        
      </div>
      <div class="item2">
        <form class="nav-search-form" @submit.prevent="emitSearch">
          <input type="text" placeholder="Search..." v-model.lazy.trim="searchTerm">
          <button type="submit" title="Search Notes" class="searchButton"><i class="fa-solid fa-magnifying-glass"></i>
            Search</button>
        </form>
        <li class="nav-item nav-link logoutClass" v-on:click="logout" title="Logout">
          <i class="fas fa-sign-out-alt"></i> Logout
        </li>
      </div>
    </ul>
  </div>

  <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>

</template>

<script setup>
import { useTaskStore } from '@/store/TaskStore';
import { onMounted, ref } from 'vue';
import Toast from './Toast.vue';
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const isActive = (path) => route.path === path; // Function to check if the current route matches

const TaskStore = useTaskStore();
const emit = defineEmits(['search']);
const searchTerm = ref('');
const userInfo = ref({});
const userIsAdmin = ref(false);
const router = useRouter();


const toastMessage = ref('');
const toastType = ref('');
const toastPausable = ref(false);
const toastKey = ref(0);

//Update toast
const updateToast = (msg, type, pause) => {
    toastMessage.value = msg;
    toastType.value = type;
    toastPausable.value = pause;
    toastKey.value++; // Increment the key to force re-render
    console.log('Toast displayed')
}

const emitSearch = () => {
  // searchTerm.value = searchTerm.value.trim();
  if(searchTerm.value === ''){
    location.reload()
  }
  console.log("Emitting search term:", searchTerm.value);
  emit('search', searchTerm.value);
};

onMounted(async () => {
  let data = localStorage.getItem('user-info');
  if (data) {
    userInfo.value = JSON.parse(data); // Parse the user info from localStorage
  }
  userIsAdmin.value = userInfo.value.isAdmin; 

});

const logout = () => {
  if (confirm("Are you sure you want to log out?")) {
    //Toast
    updateToast('Logged out Successfully.', 'success', false);
    router.push({ name: 'Notes' }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 900);
      });
    console.log("Logging out...");
    TaskStore.logOut();
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1300);
  }
};
</script>




<style scoped>
.searchButton {
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  padding: 0.7rem;
  background: linear-gradient(135deg, #8cfba2, #87ff75, #4abd3d, #3a8815);
  border-radius: 30px;
  border: 4px solid rgba(255, 255, 255, 0.7);
  text-shadow: 3px 3px 15px rgba(0, 0, 0, 0.4), 0 0 20px #ff7eb3;
  box-shadow: 0 8px 15px rgba(255, 110, 110, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.searchButton:hover {
  background: linear-gradient(to left, #8cfba2, #87ff75, #4abd3d, #3a8815);
  color: #fffbcc;
  border-color: #fffbcc;
  transform: skewX(0deg) scale(1.1);
  box-shadow: 0 10px 20px rgba(146, 255, 110, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.5);
}

.searchButton::before {
  content: '';
  position: absolute;
  top: -150%;
  left: -150%;
  width: 300%;
  height: 300%;
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(45deg);
  animation: move-wave 3s infinite linear;
  z-index: 1;
}

@keyframes move-wave {
  0% {
    top: -150%;
    left: -150%;
  }
  50% {
    top: 50%;
    left: 50%;
  }
  100% {
    top: -150%;
    left: -150%;
  }
}



.app-logo {
  font-family: 'Poppins', 'Arial', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: #ffefc4; /* Soft gold */
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  background: linear-gradient(135deg,#0090f7, #ba62fc, #f2416b, #ffea00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  padding: 0.4rem 0.9rem;
  border: 2px solid rgba(255, 239, 196, 0.6);
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 118, 255, 0.5), inset 0 0 15px rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease-in-out;
  animation: glow 1.5s infinite alternate;
  cursor: pointer;
}

.app-logo:hover {
  background: linear-gradient(to left,#0090f7, #ba62fc, #f2416b, #ffea00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-color: #fff;
  box-shadow: 0 15px 30px rgba(0, 118, 255, 0.8), inset 0 0 20px rgba(255, 255, 255, 0.4);
  transform: scale(1.1);
}

@keyframes glow {
  from {
    box-shadow: 0 0 15px rgba(255, 223, 0, 0.8), inset 0 0 10px rgba(255, 69, 0, 0.6);
  }
  to {
    box-shadow: 0 0 25px rgba(255, 69, 0, 0.8), inset 0 0 15px rgba(255, 223, 0, 0.9);
  }
}


.active .nav-item {
  color: #f4f4f4;
  font-size: 0.9rem;
  font-weight: bold;
  text-transform: uppercase;
  background: linear-gradient(135deg, #00c6ff, #0072ff, #8e44ad, #f45c43);
  border-radius: 20px;
  border: 4px double rgba(255, 255, 255, 0.8);
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5), 0 0 15px #0072ff;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.4), 0 10px 30px rgba(0, 118, 255, 0.7);
  transform: perspective(100px) rotateX(5deg);
  animation: pulse 2s infinite alternate;
  transition: all 0.3s ease-in-out;
}

.active .nav-item:hover {
  background: linear-gradient(135deg, #f45c43, #8e44ad, #0072ff, #00c6ff);
  color: #ffefc4; /* Soft gold */
  border-color: #ffefc4;
  text-shadow: 0 0 20px rgba(255, 239, 196, 0.8), 0 0 25px rgba(255, 255, 255, 0.7);
  transform: perspective(100px) rotateX(0deg) scale(1.15);
  box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.5), 0 15px 40px rgba(0, 118, 255, 0.9);
}

@keyframes pulse {
  from {
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3), 0 10px 20px rgba(0, 118, 255, 0.5);
  }
  to {
    box-shadow: inset 0 0 25px rgba(255, 255, 255, 0.5), 0 15px 30px rgba(0, 118, 255, 0.8);
  }
}






.main-header {
  font-family: 'Poppins', 'Roboto', 'Arial', sans-serif;
  font-weight: 400;
  font-style: normal;
}

*{
  margin: 0;
  padding: 0;
  align-items: center;
}

body{
  margin: 0;
  padding: 0;
}

h3{
  color: white;
  margin-right: 30px;
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: larger;
}

.navbar {
  background: linear-gradient(to right, #6a11cb, #8e44ad, #9b59b6, #3498db, #6dd5fa, #2980b9);
  padding: 2.5rem;
  top: 0; /* Stick it to the top */
}
.nav-menu {
  list-style: none;
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.nav-item {
  margin-right: 1rem;
  color: white;
  text-decoration: none;
}

.item1 {
  display: flex;
}

.item2 {
  display: flex;
  margin-left: auto;
}

.nav-link {
  color: #fff;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: rgb(135, 137, 255);
}

/* Style for search form */
.nav-search-form {
  display: flex;
}
.nav-search-form input[type="text"] {
  padding: 0.65rem;
  border: 1px solid #ccc;
  border-radius: 0.55rem;
  margin-right: 0.5rem;
  width: 265px;
}


.logoutClass{
  cursor: pointer;
  margin-left: 20px
}

</style>


