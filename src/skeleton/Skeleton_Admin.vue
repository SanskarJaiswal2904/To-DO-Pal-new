<template>
  <div class="skeleton-container">
      <div class="skeleton-header"></div>
      <div class="skeleton-body"></div>
      <div class="skeleton-body"></div>
      <div class="skeleton-body"></div>
      <div class="skeleton-body"></div>
      <div class="skeleton-body"></div>

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
    height: 2.8rem;
    margin-bottom: 1.7rem;
    animation: pulse-bg 1.5s infinite;
  }
  
  .skeleton-body {
    width: 98%;
    height: 4rem;
    margin-bottom: 1.1rem;
    margin-left: 15px;
    margin-right:15px;
    animation: pulse-bg 1.5s infinite;
  }
  </style>
  