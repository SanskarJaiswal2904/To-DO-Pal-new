<template>
    <div class="container" v-if="!verificationCompleted">
    <div class="otp-container">  
      <!-- OTP Input Section -->
      <div class="otp-section" v-if="userIsUnique">
        <div class="otp-inputs">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            v-model="otp[index]"
            class="otp-box"
            type="text"
            maxlength="1"
            @input="focusNextInput(index)"
          />
        </div>
        <button @click="verifyOTP" class="otp-button" title="Verify OTP">Verify OTP</button>
      </div>
      
      <!-- Success or Error message for OTP verification -->
      <div v-if="message" class="message">
        <p>{{ message }}</p>
        <div v-if="userIsUnique">
          <p style="color: red; margin-top: 15px;">For Development Purposes, fallback OTP is 543210.</p>
        </div>
      </div>
    </div>
</div>
  </template>
  
  <script setup>
  import { onMounted, ref, defineEmits } from "vue";
  import axios from "axios";
  
  const props = defineProps({
    emailIdOfUser: String, 
    buttonClicked: Boolean
  }); 
  
  //emit from child to parent
  const emit = defineEmits(['otpSent', 'otpVerified', 'errorMessage']);

  
  // State variables
  const email = ref(""); // User input email
  const otpSent = ref(false); // OTP sent flag
  const otp = ref(Array(6).fill("")); // Array for storing OTP input
  const message = ref(""); // Success or error messages
  const generatedOTP = ref(""); // Generated OTP for verification

  let verificationCompleted = false;
  let userIsUnique = true;
  
  onMounted(() => {
    console.log(props.emailIdOfUser);  // Corrected here
    console.log('OTP services Initiated.');
    email.value = props.emailIdOfUser;
    userIsUnique = true;
    sendOTP();
  });
  
  // Function to send OTP
  async function sendOTP() {
    if (!email.value) {
      message.value = "Please enter a valid email.";
      emit('errorMessage', message.value);
      return;
    }
    message.value = "Please hold on! Sending your OTP...";
    console.log("Sending OTP...")
  
    // Generate a random 6-digit OTP
    generatedOTP.value = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 10)
    ).join("");
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/send-otp`,
        { email: email.value, otp: generatedOTP.value },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.success) {
        otpSent.value = true;
        userIsUnique = true;
        message.value = "OTP sent successfully! Please check your email.";
        setTimeout(() => {
          message.value = "OTP sent! Check your Email and don't forget to check your Spam folder.";
          emit('errorMessage', message.value);
        }, 900);
        emit('otpSent', 'OTP has been sent!');
      } else if (response.status === 409) {
        message.value = "User already exists.";
        emit('errorMessage', message.value);
        userIsUnique = false;
      } else {
        message.value = "An error occurred in the server 😔. Use fallback OTP!";
        emit('errorMessage', message.value);
        generatedOTP.value = "543210"; // Fallback OTP
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 409) {
        message.value = "User already exists.";
        emit('errorMessage', message.value);
        userIsUnique = false;
      } else {
        message.value = "An error occurred in the server 😔. Use fallback OTP!";
        emit('errorMessage', message.value);
        generatedOTP.value = "543210"; // Fallback OTP
      }
    }
  }
  
  // Function to verify OTP
  function verifyOTP() {
    const enteredOTP = otp.value.join("");
  
    if (enteredOTP === generatedOTP.value || enteredOTP === "543210") {
      message.value = "OTP verified successfully!";
      verificationCompleted = true;
      emit('otpVerified', 'OTP has been verified!');
    } else {
      message.value = "Invalid OTP. Please try again.";
      emit('errorMessage', message.value);
    }
  }
  
  // Focus next input on OTP entry
  function focusNextInput(index) {
    if (otp.value[index] && index < otp.value.length - 1) {
      const nextInput = document.querySelectorAll(".otp-box")[index + 1];
      if (nextInput) nextInput.focus();
    }
  }
  </script>
  


  <style scoped>
    .otp-container {
      max-width: 500px;
      margin: 0 auto;
      text-align: center;
    }
  
    .email-section {
      margin-bottom: 20px;
    }
  
    .email-input {
      padding: 10px;
      font-size: 16px;
      margin-right: 10px;
      width: 200px;
      visibility: hidden;
    }
  
    .otp-section {
      margin-top: 20px;
    }
  
    .otp-box {
      width: 40px;
      height: 40px;
      font-size: 20px;
      text-align: center;
      margin: 0 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  
    .otp-inputs {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;
    }
  
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
      z-index: 1;
    }

    .otp-button:hover {
      background-color: #4CAF50; 
      color: #ffffff;
      transform: scale(1.1); 
      box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5); 
  }
  
    .message {
      color: #333;
      margin-top: 10px;
    }
  </style>
  