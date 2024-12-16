<template>
  <Navbar />

  <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>


  <div class="loading" v-if="isLoading">
    <Skeleton_Admin />
  </div>

  <div class="alreadyLoaded" v-if="!isLoading">
    <div class="page-container">
      <div class="admin-panel">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else>
          <h1 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 2rem; font-weight:bold; color: #333; margin-bottom: 10px;" >{{UsersName}}</h1>
          <ul>
            <li v-for="user in users" :key="user._id" class="user-card" :title="user._id">
              <div class="user-info">
                <strong class="user-name" :style="{ color: '#2E8B57' }">Name: {{ user.name }}</strong> 
                <div class="user-details">
                  <span style="color: #8A2BE2">Email: {{ user.email }}</span> 
                  <span :style="{ color: user.gender === 'male' ? '#1E90FF' : user.gender === 'female' ? '#FF1493' : '#20B2AA' }">
                    Gender: {{ user.gender === 'male' ? 'Male' : user.gender === 'female' ? 'Female' : 'Others' }}
                  </span> 
                  <span :style="{color: user.isAdmin ? '#228B22' : '#DC143C' }">Administrator: {{ user.isAdmin ? 'True' : 'False' }}</span> 
                </div>
              </div>
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
import Toast from './Toast.vue';


const users = ref([]);
const loading = ref(true);
const userIsAdmin = ref(false);
const isLoading = ref(true);
const UsersName = ref('No Users found.')


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

const fetchUsers = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/alluser`);
    users.value = response.data;
    UsersName.value = 'Users :';  
    //Toast
    updateToast('Greetings, Admin! You’re all set to lead the way.', 'info', false);
  } catch (error) {
    console.error('Error fetching users:', error);
    updateToast('No Users found.', 'error', true);
  } finally {
    loading.value = false;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${userId}`);
    if (response.status === 200) {
      users.value = users.value.filter(user => user._id !== userId);
      //Toast
      updateToast('User and associated notes deleted successfully.', 'success', true);
      alert('User and associated notes deleted successfully.');
    } else {
      //Toast
      updateToast('Failed to delete user or notes.', 'error', true);
      alert('Failed to delete user or notes.');
      
    }
  } catch (error) {
    console.error('Error deleting user or notes:', error);
    //Toast
    updateToast('An error occurred while deleting the user or notes.', 'error', true);
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
    updateToast('Please sign in to continue.', 'info', true);
    router.push({ name: 'SignIn' }).then(() => {
      setTimeout(() => {
        location.reload();
      }, 1300);
    });
  } else {
    const userData = JSON.parse(data);
    if (userData.isAdmin) {
      userIsAdmin.value = true;
      fetchUsers();
    } else {
      updateToast('You do not have admin privileges.', 'info', true);
      router.push({ name: 'NotAdmin' }).then(() => {
        setTimeout(() => {
          location.reload();
        }, 1300);
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
  align-items: center;
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

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.user-details {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  font-size: 1rem;
  font-style: italic;
}
</style>

