<!-- <template>
  <Navbar/>
  <div class="loading" v-if="isLoading">
    <Skeleton_Admin/>
  </div>

  <div class="alreadyLoaded" v-if="!isLoading">
  <div class="page-container">
    <div class="admin-panel">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else>
        <h1>Users</h1>
        <ul>
          <li v-for="user in users" :key="user._id" class="user-card">
            <strong>Name: {{ user.name }}</strong>  
            <strong style="font-style:italic">Email: {{ user.email }}</strong> 
            <button class="delete-btn" @click="confirmDeleteUser(user._id, user.name)">Delete User</button>
          </li>
        </ul>
      </div>
    </div>
    <div class="footer-container">
    </div>
    </div>
    </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/routes';
import Footer from './Footer.vue';
import Navbar from './Navbar.vue'; // Import your Navbar component
import Skeleton_Admin from '@/skeleton/Skeleton_Admin.vue';

const users = ref([]);
const loading = ref(true);
const userIsAdmin = ref(false);
const isLoading = ref(true);


const fetchUsers = async () => {
  try {
    const response = await axios.get('http://localhost:1024/alluser');
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${userId}`);
    if (response.status === 200) {
      users.value = users.value.filter(user => user._id !== userId);
      alert('User deleted successfully.');
    } else {
      alert('Failed to delete user.');
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('An error occurred while deleting the user.');
  }
};

const confirmDeleteUser = async (userId, userName) => {
  const confirmed = confirm(`Are you sure you want to delete ${userName}?`);
  if (confirmed) {
    await deleteUser(userId);
  }
};

// onMounted(() => {
//   let data = localStorage.getItem('user-info');
//   if (!data) {
//     router
//       .push({ name: 'SignIn' })
//       .then(() => {
//         setTimeout(() => {
//           location.reload();
//         }, 1);
//       });
//   }
//   fetchUsers();

// });

onMounted(() => {
  isLoading.value = true;
  let data = localStorage.getItem('user-info');
  if (!data) {
    router
      .push({ name: 'SignIn' })
      .then(() => {
        setTimeout(() => {
          location.reload();
        }, 1);
      });
  }
  const userData = JSON.parse(data);
  console.log(userData)

  if(userData.isAdmin === true){
    userIsAdmin.value = true;
    fetchUsers();
  }else{
    router
      .push({ name: 'NotAdmin' })
      .then(() => {
        setTimeout(() => {
          location.reload();
        }, 1);
      });
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 750);
});

// onMounted(async () => {
//   let data = localStorage.getItem('user-info');
//   if (!data) {
//     router.push({ name: 'SignIn' }).then(() => {
//       setTimeout(() => {
//         location.reload();
//       }, 0);
//     });
//     return; // Exit early if user info is not available
//   }

//   try {
//     const userEmail = JSON.parse(data).email;
//     const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/getsingle/${userEmail}`);
//     if (response.status === 200) {
//       fetchUsers();
//     } else {
//       console.error('Error fetching user:', response.data);
//     }
//   } catch (error) {
//     alert('Failed to fetch user data. Please try again later.');
//     console.error('Error fetching user:', error);
//   }
// });
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
}

.footer-container {
  margin-top: auto;
  width: 100%;
}

/* General button styles */
button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.1rem;
  margin-left: 0.5rem;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

/* Delete Button Styles */
button.delete-btn {
  background-color: white;
  color: red;
  border: 1px solid #dc3545;
}

button.delete-btn:hover {
  background-color: #dc3545;
  border-color: #c82333;
  color: white;
  box-shadow: 0 0 10px rgba(200, 35, 51, 0.3);
}

/* Admin Panel Styles */
.admin-panel {
  padding: 2rem;
}

.loading {
  font-size: 1.5rem;
  text-align: center;
}

.user-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: rgb(255, 247, 208);
  width: 1400px;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
}

.user-card:hover {
  background-color: rgb(214, 251, 192);
  animation: elevate 0.2s ease-in-out;
  transform: scale(1.02); 
}

@keyframes elevate {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
}
</style> -->



<template>
  <Navbar />
  <div class="loading" v-if="isLoading">
    <Skeleton_Admin />
  </div>

  <div class="alreadyLoaded" v-if="!isLoading">
    <div class="page-container">
      <div class="admin-panel">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else>
          <h1 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 2rem; font-weight:bold; color: #333; margin-bottom: 10px;">Users</h1>
          <ul>
            <li v-for="user in users" :key="user._id" class="user-card" :title="user._id">
              <strong>Name: {{ user.name }}</strong>
              <strong style="font-style:italic">Email: {{ user.email }}</strong>
              <button class="delete-btn" @click="confirmDeleteUser(user._id, user.name)">Delete User</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-container"></div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/routes';
import Footer from './Footer.vue';
import Navbar from './Navbar.vue';
import Skeleton_Admin from '@/skeleton/Skeleton_Admin.vue';

const users = ref([]);
const loading = ref(true);
const userIsAdmin = ref(false);
const isLoading = ref(true);

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/alluser`);
    users.value = response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${userId}`);
    if (response.status === 200) {
      users.value = users.value.filter(user => user._id !== userId);
      alert('User and associated notes deleted successfully.');
    } else {
      alert('Failed to delete user or notes.');
    }
  } catch (error) {
    console.error('Error deleting user or notes:', error);
    alert('An error occurred while deleting the user or notes.');
  }
};

const confirmDeleteUser = async (userId, userName) => {
  const confirmed = confirm(`Are you sure you want to delete ${userName}?`);
  if (confirmed) {
    await deleteUser(userId);
  }
};

onMounted(() => {
  document.title = "TO-DO Pal - Admin";
  isLoading.value = true;
  let data = localStorage.getItem('user-info');
  if (!data) {
    router.push({ name: 'SignIn' }).then(() => {
      setTimeout(() => {
        location.reload();
      }, 1);
    });
  } else {
    const userData = JSON.parse(data);
    if (userData.isAdmin) {
      userIsAdmin.value = true;
      fetchUsers();
    } else {
      router.push({ name: 'NotAdmin' }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1);
      });
    }
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 750);
});
</script>



<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
}

.footer-container {
  margin-top: auto;
  width: 100%;
}

/* General button styles */
button {
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1.1rem;
  margin-left: 0.5rem;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

/* Delete Button Styles */
button.delete-btn {
  background-color: rgb(248, 228, 228);
    color: red;
    border: 1px solid red;
}

button.delete-btn:hover {
  background-color: red;
    color: white;
    border: 1px solid red;
  box-shadow: 0 0 10px rgba(200, 35, 51, 0.3);
}

/* Admin Panel Styles */
.admin-panel {
  padding: 2rem;
}

.loading {
  font-size: 1.5rem;
  text-align: center;
}

.user-card {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  background-color: rgb(255, 247, 208);
  width: 1400px;
  display: flex;
  justify-content: space-between;
  list-style-type: none;
}

.user-card:hover {
  background-color: rgb(214, 251, 192);
  animation: elevate 0.2s ease-in-out;
  transform: scale(1.02); 
}

@keyframes elevate {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.02);
  }
}
</style>