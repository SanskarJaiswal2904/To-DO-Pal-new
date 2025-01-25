<template>
  <div class="skeleton-container">
      <div class="skeleton-header"></div>
      <div class="skeleton-subheader"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-title"></div>
      <div class="skeleton-text"></div>
      <div class="skeleton-description"></div>
      <div class="skeleton-title"></div>


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
  
  .skeleton-container {
    background: linear-gradient(to right, #ffa088, #fce942);
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .skeleton-header {
    width: 30%;
    height: 2.5rem;
    margin-bottom: 1rem;
    animation: pulse-bg 1.5s infinite;
  }
  .skeleton-subheader {
    width: 30%;
    height: 2rem;
    margin-bottom: 3rem;
    animation: pulse-bg 1.5s infinite;
  }
  
  .skeleton-title {
    width: 90%;
    height: 2.2rem;
    margin-bottom: 2.5rem;
    animation: pulse-bg 1.5s infinite;
  }
  
  .skeleton-text {
    width: 40%;
    height: 2rem;
    margin-bottom: 0.5rem;
    animation: pulse-bg 1.5s infinite;
  }
  .skeleton-description {
    width: 100%;
    height: 12rem;
    margin-bottom: 2rem;
    animation: pulse-bg 1.5s infinite;
  }
  </style>
  