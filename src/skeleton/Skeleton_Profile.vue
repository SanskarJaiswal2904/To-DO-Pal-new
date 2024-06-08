<template>
  <div class="parent">
    <div class="skeleton-container">
        <div class="skeleton-header"></div>
        <div class="skeleton-subHeader"></div>
        <div class="skeleton-Input"></div>
        <div class="skeleton-subHeader"></div>
        <div class="skeleton-Input"></div>
        <div class="skeleton-subHeader"></div>
        <div class="skeleton-Input"></div>
      </div>
  </div>
  </template>
  
  <style scoped>
  
@keyframes pulse-bg {
    0% {
      background-color: #ddd;
    }
    25%{
      background-color: #c6c4c4;
    }
    50% {
      background-color: #cacaca;
    }
    75% {
      background-color: #bab9b9;
    }
    100% {
      background-color: #d1cfcf;
    }
  }

  .parent{
    margin-left: 500px;
    margin-right: auto;
  }
  .skeleton-container {
    background: linear-gradient(to right, #ffa088, #fce942);
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .skeleton-header {
    width: 40%;
    height: 1.7rem;
    margin-bottom: 2rem;
    animation: pulse-bg 1.5s infinite;
  }

  .skeleton-subHeader {
    width: 20%;
    height: 1.3rem;
    margin-bottom: 1rem;
    animation: pulse-bg 1.5s infinite;
  }
  
  .skeleton-Input {
    width: 50%;
    height: 2.5rem;
    margin-bottom: 1rem;
    animation: pulse-bg 1.5s infinite;
  }
  </style>
  