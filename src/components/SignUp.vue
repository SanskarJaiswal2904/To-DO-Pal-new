<template>
<div>
    <div class="image-container">
        <img src="../assets/todopalLogo.png" alt="Website Logo" width="200px" class="centered-image">
    </div>
    <h1 class="main-header">Sign Up </h1>
    <form @submit.prevent="handleSignUp">
        <label for="name" name="Name" class="input-feild-title-style">Name</label>
        <input type="text" placeholder="Enter your Name" v-model.lazy="name" name="name" class="input-field" required>
        <br><br>
        <label for="email" name="Email" class="input-feild-title-style">Email</label>
        <input type="email" placeholder="Enter your Email" v-model.lazy="email" name="email" class="input-field" required>
        <br><br>

        <label for="password" name="password" class="input-feild-title-style">Password</label>
        <div class="password-container">
            <input type="password" placeholder="Enter your Password" autocomplete="off" v-model.lazy="password" name="password" class="input-field" required>
            <span class="info-button" title="Password must be 8+ characters, with an uppercase letter, a lowercase letter, a number, and a special character.">i</span>
        </div>

        <br><br>
        <label for="cpassword" name="cpassword" class="input-feild-title-style">Confirm Password</label>
        <input type="password" placeholder="Confirm Password" autocomplete="off" v-model.lazy="cpassword" name="cpassword" class="input-field" required>

        <br><br>
        <label class="input-feild-title-style-exc">
            <input type="checkbox" v-model.lazy="isAdmin"/>
            Are you an Admin?
        </label>
        <br><br>

        <label for="adminCode" name="adminCode" v-if="isAdmin" class="input-feild-title-style">Admin UUID Code
            <input type="text" placeholder="Admin UUID code is 12345 (For Development Purposes)" autocomplete="off" v-model.lazy="adminCode" name="adminCode" class="input-field"  required>
        </label>

        <h3 class="input-feild-title-style-bold">Gender:</h3>
        <br>
        <div class="radioGender">
            <span class="radioGenderSub">
                <input type="radio" id="male" name="gender" value="male" v-model.lazy="gender" required>
                {{ "   " }}
                <label for="male" class="input-feild-title-style-exc">Male</label>
            </span>
            <span class="radioGenderSub">
                <input type="radio" id="female" name="gender" value="female" v-model.lazy="gender" required>
                {{ "   " }}
                <label for="female" class="input-feild-title-style-exc">Female</label>
            </span>

            <span class="radioGenderSub">
                <input type="radio" id="others" name="gender" value="others" v-model.lazy="gender" required>
                {{ "   " }}
                <label for="others" class="input-feild-title-style-exc">Others</label>
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
        <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html" style="margin-bottom: 10px; font-size: 1.2rem; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center; transition: all 0.3s ease;">
            <i class="fas fa-link" style="margin-right: 8px; font-size: 1.5rem;"></i> 
            Made By Sanskar
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
            
            if (isAdmin.value == true && 
                (adminCode.value !== import.meta.env.VITE_ADMIN_UUID_CODE && 
                adminCode.value !== import.meta.env.VITE_ADMIN_DEV_CODE)) {
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
            // console.log("Password:", password.value);
            // console.log("Confirm Password:", cpassword.value);
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

        // console.log(import.meta.env.VITE_ADMIN_DEV_CODE)
        // console.log(import.meta.env.VITE_ADMIN_UUID_CODE)
        
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

            if (password === "111") { //for dev purpose
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
.main-header {
    font-family: sans-serif;
    font-weight: 700;
    font-style: normal;
  }
.input-feild-title-style-bold{
  font-family: "Playwrite IT Moderna", cursive;
  font-weight: 700;
  font-style: normal;
  margin-top: 15px;
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
    padding: 12px;
    background: linear-gradient(to right, #6a11cb, #2575fc, #ff41f9);
    color: #fff;
    font-size: 1.2rem; /* Larger text */
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.signup-btn:hover {
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

body {
    background-color: #f7f7f7;
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
</style>
