<template>
<div>
    <Navbar />
    <div class="loading" v-if="isLoading">
        <Skeleton_Profile/>
      </div>
    
      <div class="alreadyLoaded" v-if="!isLoading">
    <div class="profile">
        <h2>Profile</h2>
        <br>
        <div v-if="!editMode">
            <div class="form-group">
                <label>Name</label>
                <div class="input-with-icon">
                    <input type="text" v-model="user.name" :disabled="!editMode" class="disabled">
                    <button @click="toggleEditMode" class="edit-button">
                        <i class="fas fa-pen"></i>
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label>Email</label>
                <div class="input-with-icon">
                    <input type="email" v-model="user.email" :disabled="!editMode" class="disabled">
                    <button @click="toggleEditMode" class="edit-button">
                        <i class="fas fa-pen"></i>
                    </button>
                </div>
            </div>
            <div class="form-group">
                <label>Gender</label>
                <div class="input-with-icon">
                    <select v-model="user.gender" :disabled="!editMode" class="disabled">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Others</option>
                    </select>
                    <button @click="toggleEditMode" class="edit-button">
                        <i class="fas fa-pen"></i>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <form @submit.prevent="updateProfile">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" v-model="user.name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" v-model="user.email" required>
                </div>
                <div class="form-group">
                    <label for="gender">Gender</label>
                    <select id="gender" v-model="user.gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <button type="submit">Update</button>
            </form>
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
        userInfo.value = JSON.parse(userData); // Parse the user info from localStorage
    } else {
        router.push({
            name: 'SignIn'
        }).then(() => {
            setTimeout(() => {
                location.reload();
            }, 0);
        });
    }

    console.log("userdata",userData)
    console.log("userInfo",userInfo.value)

    if (userData) {
        const parsedData = JSON.parse(userData);
        user.value._id = parsedData._id.$oid;
        user.value.name = parsedData.name;
        user.value.email = parsedData.email;
        user.value.gender = parsedData.gender;
    }
    console.log("userdata",userData)
    console.log("user",user)
    setTimeout(() => {
        
        isLoading.value = false;
    }, 750);
});

const updateProfile = async () => {
    onMounted();
    try {
        isLoading.value = true;
        console.log("0", user.value._id)
        const response = await axios.patch(`${import.meta.env.VITE_API_URL}/profile/update/${user.value._id}`, {
            name: user.value.name,
            email: user.value.email,
            gender: user.value.gender
        });

        console.log("1", response)
        console.log("2", response.data)
        console.log("3", user.value._id)
        console.log("4", user.value)

        if (response.status === 200) {
            isLoading.value = false;
            // localStorage.clear();
            console.log('Profile updated successfully:', response.data);
            // localStorage.setItem('user-info', JSON.stringify(user.value));
        } else {
            isLoading.value = false;
            console.error('Error updating profile:', response.data);
        }
    } catch (error) {
        isLoading.value = false;
        console.error('Error updating profile:', error);
    }
    toggleEditMode();
};

const toggleEditMode = () => {
    editMode.value = !editMode.value;
};
</script>

<style scoped>
.profile {
    max-width: 600px;
    margin: 0 auto;
    min-height: 70vh;
    padding: 20px;
    background-color: #f9f9f9;
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
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: #007bff;
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
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
}
</style>
