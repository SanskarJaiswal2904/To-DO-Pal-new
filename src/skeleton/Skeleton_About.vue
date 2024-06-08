<template>
  <div class="skeleton-container">
      <div class="skeleton-header"></div>
      <div class="skeleton-headerBody"></div>
      <div class="container">
        <div class="skeleton-boxes"></div>
        <div class="skeleton-boxes"></div>
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
  
  .skeleton-container {
    background: linear-gradient(to right, #ffa088, #fce942);
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .skeleton-header {
    width: 60%;
    height: 3rem;
    margin-bottom: 1rem;
    animation: pulse-bg 1.5s infinite;
  }
  
  .skeleton-headerBody {
    width: 100%;
    height: 10rem;
    margin-bottom: 1rem;
    animation: pulse-bg 1.5s infinite;
  }

  .container{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  
.skeleton-boxes {
    width: 49%;
    height: 18rem;
    margin-bottom: 0.5rem;
    animation: pulse-bg 1.5s infinite;
  }


  </style>
  