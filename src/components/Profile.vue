<template>
<div>
    <Navbar />
    <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>

    <div class="ParentProfileClass">
    <div class="loading" v-if="isLoading">
        <Skeleton_Profile/>
      </div>
    
      <div class="alreadyLoaded" v-if="!isLoading">
    <div class="profile">
        <h2 style="font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; font-size: 2rem; color: #333; margin-bottom: 10px;">Profile</h2>

        <br>
        <div v-if="!editMode">
            <div class="form-group">
                <label class="input-feild-title-style">Name</label>
                <div class="input-with-icon">
                    <input type="text" v-model.lazy="user.name" :disabled="!editMode" class="disabled">
                    <button @click="toggleEditMode" class="edit-button">
                        <i class="fas fa-pen" title="Edit Name"></i>
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label class="input-feild-title-style">Email</label>
                <div class="input-with-icon">
                    <input type="email" v-model.lazy="user.email" :disabled="!editMode" class="disabled">
                    <button @click="toggleEditMode" class="edit-button">
                        <i class="fas fa-pen" title="Edit Email"></i>
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label class="input-feild-title-style">Gender</label>
                <div class="input-with-icon">
                    <select v-model.lazy="user.gender" :disabled="!editMode" class="disabled">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    <button @click="toggleEditMode" class="edit-button">
                        <i class="fas fa-pen" title="Edit Gender"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <form @submit.prevent="updateProfile">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model.lazy="user.name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model.lazy="user.email" required>
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" v-model.lazy="user.gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                </div>
                <button type="submit" title="Update profile">Update</button>
            </form>
        </div>
    </div>
    </div>
    </div>
</div>
<Footer />
</template>

<script setup>
import {
    ref,
    onMounted
} from 'vue';
import axios from 'axios';
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
import router from '@/routes';
import Skeleton_Profile from '@/skeleton/Skeleton_Profile.vue';
import { useTaskStore } from '@/store/TaskStore';
import Toast from './Toast.vue';


const toastMessage = ref('');
const toastType = ref('');
const toastPausable = ref(false);
const toastKey = ref(0);

const TaskStore = useTaskStore();

const user = ref({
    _id: '',
    name: '',
    email: '',
    gender: '',
});

const userInfo = ref({})
const editMode = ref(false);
const isLoading = ref(true);

onMounted(() => {
    document.title = "TO-DO Pal - Profile";
    isLoading.value = true;
    const userData = localStorage.getItem('user-info');

    if (userData) {
        const parsedData = JSON.parse(userData);
        userInfo.value = parsedData // Parse the user info from localStorage
        user.value._id = parsedData._id.$oid;
        user.value.name = parsedData.name;
        user.value.email = parsedData.email;
        user.value.gender = parsedData.gender;
        // user.value = userStore;
        // console.log("userdata",userData)
        // console.log("userInfo",userInfo.value)
        // console.log("user",user)
        setTimeout(() => {
            isLoading.value = false;
        }, 750);
    } else {
        //Toast
        updateToast('Please sign in to continue.', 'info', true);

        router.push({
            name: 'SignIn'
        }).then(() => {
            setTimeout(() => {
                location.reload();
            }, 1300);
        });
    }
});

const updateProfile = async () => {
    onMounted();
    try {
        isLoading.value = true;
        // console.log("0", user.value._id)
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/profile/update/${user.value._id}`, {
            name: user.value.name,
            email: user.value.email,
            gender: user.value.gender
        });

        // console.log("1", response)
        // console.log("2", response.data)
        // console.log("3", user.value._id)
        // console.log("4", user.value)

        if (response.status === 200) {
            isLoading.value = false;
            TaskStore.setUserInfo = response.data;

            //store correct data in local-storage
            updateLocalStorage();
            
            console.log('Profile updated successfully:', response.data);
            //Toast
            updateToast('Profile updated successfully.', 'success', false);
            
        } else {
            isLoading.value = false;
            console.error('Error updating profile:', response.data);
            //Toast
            updateToast('Profile was not updated successfully.', 'error', true);
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Error updating profile:', error);
        //Toast
        updateToast('Error updating profile.', 'error', true);
    }
    toggleEditMode();
};

//Update toast
const updateToast = (msg, type, pause) => {
    toastMessage.value = msg;
    toastType.value = type;
    toastPausable.value = pause;
    toastKey.value++; // Increment the key to force re-render
    console.log('Toast displayed')
}

const updateLocalStorage = () => {
    let userInfo = localStorage.getItem('user-info');

    // Check if user-info exists in local storage
    if (userInfo) {
    // Parse the JSON string into an object
    userInfo = JSON.parse(userInfo);

    // Update the relevant properties
    userInfo.name = user.value.name;
    userInfo.email = user.value.email;
    userInfo.gender = user.value.gender;

    // Convert the updated object back to a JSON string
    const updatedUserInfo = JSON.stringify(userInfo);

    // Save the updated JSON string back to local storage
    localStorage.setItem('user-info', updatedUserInfo);
    } else {
    console.error('user-info not found in local storage');
    }
}

const toggleEditMode = () => {
    editMode.value = !editMode.value;
};
</script>

<style scoped>
.ParentProfileClass{
    margin: 10px;
}
.input-feild-title-style-italic{
    font-family: "Playwrite IT Moderna", cursive;
    font-weight: 400;
    font-style: italic;
  }
  
  .input-feild-title-style-exc{
      font-family: "Trocchi", serif;
      font-weight: 200;
      font-style: normal;
  }
  
  .input-feild-title-style{
      font-family: "IBM Plex Serif", serif;
      font-weight: 400;
      font-style: normal;
  }

.profile {
    max-width: 600px;
    margin: 0 auto;
    min-height: 70vh;
    padding: 20px;
    background: linear-gradient(135deg, #ffffff, #c6c5c5 ,#cccbcb); 
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 1.5rem;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: #333;
}

.input-with-icon {
    position: relative;
}

input[type="text"],
input[type="email"],
select {
    width: calc(100% - 56px);
    padding: 0.75rem;
    height: 45px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: #fff;
    transition: border-color 0.3s;
}

input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
    border-color: #007bff;
    outline: none;
}

.edit-button {
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    background: linear-gradient(to right, #1E3A8A, #3B82F6, #ff41f9);
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: white;
    transition: color 0.3s, background-color 0.3s;
}

button.edit-button:hover {
    background-color: #f0f0f0;
}

button.edit-button i {
    font-size: 18px;
}

button.edit-button:disabled i {
    color: #ccc;
    cursor: not-allowed;
}

button.edit-button:disabled:hover {
    background: none;
}

button {
    padding: 0.75rem 1.5rem;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    background: linear-gradient(to right, #1E3A8A, #3B82F6, #ff41f9);
    transition: background 0.3s ease, transform 0.2s;
}

button:hover {
    background: linear-gradient(to left, #ff41f9, #a111b1, #60A5FA);
}

</style>
