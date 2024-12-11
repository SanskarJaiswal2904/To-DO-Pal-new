<template>
  <div class="navbar main-header">
    <ul class="nav-menu">
      <div class="item1">
        <router-link to="/" style="text-decoration: none;" title="Home">
          <h3>TO-DO Pal</h3>
      </router-link>
        <li>
          <router-link class="nav-item nav-link" to="/" title="Home">
            <i class="fas fa-home"></i> Home
          </router-link>
        </li>
        <li>
          <router-link class="nav-item nav-link" to="/about" title="About">
            <i class="fas fa-info-circle"></i> About
          </router-link>
        </li>
        <li>
          <router-link class="nav-item nav-link" to="/profile" title="Profile">
            <i class="fas fa-user"></i> Profile
          </router-link>
        </li>
        <li>
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
          <button type="submit" title="Search Notes">Search</button>
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
    router.push({ name: 'Notes' }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1);
      });
    TaskStore.logOut();
    console.log("Logging out...");
    //Toast
    updateToast('Logged out Successfully.', 'success', false);
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 1300);
  }
};
</script>




<style scoped>
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

.nav-search-form button {
  padding: 0.5rem 1rem;
  background: linear-gradient(to right, #07d707, #049804);
  color: #fff;
  border: none;
  border-radius: 0.45rem;
  cursor: pointer;
}

.nav-search-form button:hover {
  background: linear-gradient(to right, #05c305, #038403);
}


.logoutClass{
  cursor: pointer;
  margin-left: 20px
}

</style>
