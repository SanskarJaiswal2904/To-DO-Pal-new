<template>
<div>
    <div class="image-container">
        <img src="../assets/todopalLogo.png" alt="Website Logo" width="200px" class="centered-image">
    </div>
    <h1>Sign Up </h1>
    <form @submit.prevent="handleSignUp">
        <label for="name" name="Name">Name</label>
        <input type="text" placeholder="Enter your Name" v-model="name" name="name" class="input-field" required>
        <br><br>
        <label for="email" name="Email">Email</label>
        <input type="email" placeholder="Enter your Email" v-model="email" name="email" class="input-field" required>
        <br><br>

        <label for="password" name="password">Password</label>
        <div class="password-container">
            <input type="password" placeholder="Enter your Password" v-model="password" name="password" class="input-field" required>
            <span class="info-button" v-tooltip.top="'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.'">i</span>
        </div>

        <br><br>
        <label for="cpassword" name="cpassword">Confirm Password</label>
        <input type="password" placeholder="Confirm Password" v-model="cpassword" name="cpassword" class="input-field" required>

        <br><br>
        <label>
            <input type="checkbox" v-model="isAdmin" />
            Are you an Admin?
        </label>
        <br><br>

        <label for="adminCode" name="adminCode" v-if="isAdmin">Admin UUID Code
            <input type="text" placeholder="Admin Code" v-model="adminCode" name="adminCode" class="input-field" required>
        </label>

        <h3>Gender:</h3>
        <br>
        <div class="radioGender">
            <span class="radioGenderSub">
                <input type="radio" id="male" name="gender" value="male" v-model="gender" required>
                {{ "   " }}
                <label for="male">Male</label>
            </span>
            <span class="radioGenderSub">
                <input type="radio" id="female" name="gender" value="female" v-model="gender" required>
                {{ "   " }}
                <label for="female">Female</label>
            </span>

            <span class="radioGenderSub">
                <input type="radio" id="others" name="gender" value="others" v-model="gender" required>
                {{ "   " }}
                <label for="others">Others</label>
            </span>
        </div>
        <br><br>
        <p class="errorinP" v-if="error.length > 0">*{{ error }}</p>
        <br>
        <button type="submit" class="signup-btn">Sign Up</button>
    </form>

    <router-link to="/signin" class="signup-link">
        <h3>Already have an account? Sign In</h3>
    </router-link>
    <div class="text-white2">
        <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html">
            <i class="fas fa-link"></i> Made By Sanskar
        </a>
    </div>
</div>
</template>

<script>
import {
    ref,
    onMounted
} from 'vue';
import {
    useRouter
} from 'vue-router';
import axios from 'axios';

export default {
    directives: {},
    setup() {
        const name = ref('');
        const email = ref('');
        const password = ref('');
        const cpassword = ref('');
        const gender = ref('');
        const error = ref('');
        const adminCode = ref('');
        const isAdmin = ref(false);
        const router = useRouter();

        const handleSignUp = () => {
            const validPassword = isPasswordStrong(password.value);

            printEveryModel();
            
            if (isAdmin.value == true && adminCode.value !== import.meta.env.VITE_ADMIN_UUID_CODE) {
                resetEveryModel();
                error.value = "Admin Code is Invalid";
            }

            if (validPassword === "Password is strong.") {
                if (password.value !== cpassword.value) {
                    error.value = "Passwords do not match.";
                    console.log("1"+error.value);
                } else {
                    console.log("2"+error.value);
                    if (error.value === '') {

                        const userInfo = {
                            name: name.value,
                            email: email.value,
                            password: password.value,
                            gender: gender.value,
                            isAdmin: isAdmin.value
                        };

                        axios.post(`${import.meta.env.VITE_API_URL}/signup`, userInfo)
                            .then(response => {
                                alert("Account Created.");
                                resetEveryModel();
                                router.push({
                                    name: 'SignIn'
                                });
                            })
                            .catch(error => {
                                console.error(error);
                                alert(error.response.data.error)
                            });
                    }
                    console.log("3"+error.value);
                }
            } else {
                error.value = validPassword;
            }
        };

        const printEveryModel = () => {
            console.log("Name:", name.value);
            console.log("Email:", email.value);
            console.log("Password:", password.value);
            console.log("Confirm Password:", cpassword.value);
            console.log("Gender:", gender.value);
            console.log("Error:", error.value);
            console.log("Is Admin:", isAdmin.value);
            console.log("Admin Code:", adminCode.value);
        }

        const resetEveryModel = () => {
            name.value = '';
            email.value = '';
            password.value = '';
            cpassword.value = '';
            gender.value = '';
            error.value = '';
            isAdmin.value = false;
            adminCode.value = '';
        }

        onMounted(() => {
        document.title = "TO-DO Pal - SignUp";
        let data = localStorage.getItem('user-info');
        if (data) {
          router.push({ name: 'Notes' }).then(() => {
            setTimeout(() => {
                location.reload();
            }, 1);
          });
        }
      });

        const isPasswordStrong = (password) => {
            const minLength = 8;
            const hasUppercase = /[A-Z]/.test(password);
            const hasLowercase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

            if (password === "111") {
                return "Password is strong.";
            } else if (password.length < minLength) {
                return "Password must be at least 8 characters long.";
            } else if (!hasUppercase) {
                return "Password must contain at least one uppercase letter.";
            } else if (!hasLowercase) {
                return "Password must contain at least one lowercase letter.";
            } else if (!hasNumber) {
                return "Password must contain at least one number.";
            } else if (!hasSpecialChar) {
                return "Password must contain at least one special character.";
            } else {
                return "Password is strong.";
            }
        };

        return {
            name,
            email,
            password,
            cpassword,
            gender,
            error,
            isAdmin,
            adminCode,
            handleSignUp
        };
    }
};
</script>

<style scoped>
.text-white2 {
    text-align: center;
    text-decoration: none;
    font-weight: 900;
    font-size: large;
    color: purple;
    margin-top: 5px;

}

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

.password-container {
    position: relative;
    display: flex;
    align-items: center;
}

.input-field {
    width: 100%;
    height: 40px;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.info-button {
    margin-left: 10px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 900;
}

.errorinP {
    color: red;
    font-weight: 500;
    font-size: 20px;
}

.radioGenderSub {
    margin: 20px;

}

/* Style for the sign-up page */
h1 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    max-width: 400px;
    margin: 0 auto;
}

.signup-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.signup-btn:hover {
    background-color: #0056b3;
}

.signup-link {
    text-align: center;
    margin: 20px;
    text-decoration: none;
    color: blue;
}

body {
    background-color: #f7f7f7;
}
</style>
