<template>
<div>
    <Toast :message="toastMessage" :type="toastType" :pausable="toastPausable" :key="toastKey"/>

    <div class="image-container">
        <img src="../assets/todopalLogo.png" alt="Website Logo" width="200px" class="centered-image">
    </div>
    <h1 class="main-header">Sign Up </h1>
    <form @submit.prevent="handleSignUp">
        <label for="name" name="Name" class="input-feild-title-style">Name</label>
        <input type="text" placeholder="Enter your Name" v-model.lazy="name" name="name" class="input-field" required>
        <br><br>


        <label for="email" name="Email" class="input-feild-title-style">Email</label>
        <input 
            @keyup.enter="sendOTP" 
            type="email" 
            placeholder="Enter your Email" 
            v-model.lazy="email" 
            name="email" 
            class="input-field" 
            required 
            :disabled="otpVerificationDone"
        />

        <button 
            type="button"
            @click="initiateOTP" 
            :disabled="buttonClicked" 
            class="otp-button" 
            :title="otpVerificationDone ? 'Email is Verified' : 'Send OTP for Email Verification'">
            <span v-if="otpVerificationDone">
                <i class="fa-solid fa-check"></i>
            </span>
            <span v-else>
                Send OTP
            </span>
        </button>


        <SMTPServerPY v-if="otpServiceStarted"
            :emailIdOfUser="emailIdOfUser" :buttonClicked="buttonClicked"
            @otpSent="handleOTPSent" 
            @errorMessage="handleErrorFromOTPComponent" 
            @otpVerified="handleOTPVerified" />
        <br><br><br>



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
        <button type="submit" class="signup-btn" :disabled="isLoading">
            <span v-if="isLoading">Signing Up...</span>
            <span v-else>Sign Up</span>
          </button>          
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

<script setup>
import { ref, onMounted, onUpdated} from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Toast from './Toast.vue';
import SMTPServerPY from './SMTPServerPY.vue';

const name = ref('');
const email = ref('');
const password = ref('');
const cpassword = ref('');
const gender = ref('');
const error = ref('');
const adminCode = ref('');
const isAdmin = ref(false);
const router = useRouter();
const isLoading = ref(false); // Tracks the loading state

const toastMessage = ref('');
const toastType = ref('');
const toastPausable = ref(false);
const toastKey = ref(0);
const toastShown = ref(false); // New flag to prevent duplicate toasts

let emailIdOfUser = '';
let buttonClicked = false;
let otpServiceStarted = false;
let otpVerificationDone = false;

//Initiate OTP Services
const initiateOTP = () => {
    if(!email.value){
        updateToast("Enter valid Email Id.", error, false);
        return;
    }
    updateToast("OTP will be sent to the given Email Id.", "info", true);
    setTimeout(() => {
        updateToast("For development purposes, Default OTP is 543210", "info", true);
    }, 900);
    emailIdOfUser = email.value;
    buttonClicked = true;
    otpServiceStarted = true;
}

const handleOTPSent = (message) => {
    updateToast("OTP sent successfully! Please check your email.", "success", true);
    buttonClicked = true;
    console.log(message);
};

const handleErrorFromOTPComponent = (message) => {
    updateToast(message, "error", true);
    console.log(message);
};

const handleOTPVerified = (message) => {
    updateToast("OTP verified successfully!", "success", true);
    setTimeout(() => {
        updateToast("Email is Verified.", "success", false);
    }, 900);
    otpVerificationDone = true;
    console.log(message);
};

//Validate email and otp
const validateEmailAndOTP = () => {
    if (!email.value && otpVerificationDone === true) {
        error.value = "Please provide your email.";
        updateToast(error.value, 'error', true);  // Toast
        return false;
    } else if (email.value && otpVerificationDone === false) {
        error.value = "Please verify your email.";
        updateToast(error.value, 'error', true);  // Toast
        return false;
    } else if (!email.value && otpVerificationDone === false) {
        error.value = "Please provide your email and verify it.";
        updateToast(error.value, 'error', true);  // Toast
        return false;
    }
    return true; // True condition, when both email is provided and otpVerificationDone is true
};


//Signup Handler
const handleSignUp = async () => {
    try {
        isLoading.value = true; // Disable the button
        const validPassword = isPasswordStrong(password.value);

        printEveryModel();
        error.value = "";

        if (isAdmin.value === true &&
            (adminCode.value !== import.meta.env.VITE_ADMIN_UUID_CODE &&
                adminCode.value !== import.meta.env.VITE_ADMIN_DEV_CODE)) {
            error.value = "Admin Code is Invalid.";
            // Toast
            updateToast(error.value, 'error', true);
        }

        if (validPassword === "Password is strong.") {
            if (password.value !== cpassword.value) {
                error.value = "Passwords do not match.";
                updateToast(error.value, 'error', true); //Toast
                console.log("1" + error.value);
            } else {
                console.log("2" + error.value);
                if(validateEmailAndOTP()){
                    if (error.value === '') {
                        
                        const userInfo = {
                            name: name.value,
                            email: email.value,
                            password: password.value,
                            gender: gender.value,
                            isAdmin: isAdmin.value
                        };

                        await axios.post(`${import.meta.env.VITE_API_URL}/signup`, userInfo);
                        alert("Account Created.");
                        updateToast('Account Created Successfully.', 'success', true);
                        resetEveryModel();
                        router.push({
                            name: 'SignIn'
                        });
                    }
                console.log("3" + error.value);
            }
            }
        } else {
            error.value = validPassword;
            // Toast
            updateToast(error.value, 'error', true);
        }
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.error || 'An error occurred');
    } finally {
        isLoading.value = false; // Re-enable the button
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
};

const resetEveryModel = () => {
    name.value = '';
    email.value = '';
    password.value = '';
    cpassword.value = '';
    gender.value = '';
    error.value = '';
    isAdmin.value = false;
    adminCode.value = '';
};

onMounted(() => {
    document.title = "TO-DO Pal - SignUp";
    let data = localStorage.getItem('user-info');

    //Toast
    updateToast('Create an Account.', 'info', true);

    setTimeout(() => {
        //Toast
        updateToast('Unlock special privileges by becoming an Admin!', 'info', true);
    }, 1300);


    // console.log(import.meta.env.VITE_ADMIN_DEV_CODE)
    // console.log(import.meta.env.VITE_ADMIN_UUID_CODE)

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

const isPasswordStrong = (password) => {
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password === "111") { // for dev purpose
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

// onUpdated lifecycle hook
onUpdated(() => {
      if (isAdmin.value && !toastShown.value) {
        toastShown.value = true; // Prevent further toasts
        updateToast("For Development Purposes", 'error', true);
        setTimeout(() => {
          updateToast("Admin UUID Code is 12345", 'info', true);
        }, 900);
      }
});


</script>


<style scoped>

.otp-button {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #9cff9f;
    color: #16921a;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 2px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  }

  .otp-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    z-index: -1;
  }

  .otp-button:hover {
    background-color: #4CAF50; 
    color: #ffffff;
    transform: scale(1.1); 
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5); 
}
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
