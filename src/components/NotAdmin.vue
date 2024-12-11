<template>
<div class="not-found-container">
    <img src="../assets/forbidden_image.png" alt="forbidden.png" height="250px">
    <h1>403 - Forbidden</h1>
    <p>Sorry, you don't have permission to access this page.</p>
    <p>You are not an Admin.</p>
    <p>Contact owner of the App.</p>
    <div class="text-white2">
        <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html" style="margin-bottom: 10px; font-size: 1.2rem; font-weight: bold; text-decoration: none; display: inline-flex; align-items: center; transition: all 0.3s ease;">
            <i class="fas fa-link" style="margin-right: 8px; font-size: 1.5rem;"></i> 
            Made By Sanskar
        </a>
    </div>
    <router-link to="/" class="home-link">Go to Homepage</router-link>
</div>
</template>

  
<script>
  document.title = "TO-DO Pal - 403";
export default {
    name: 'NotAdmin',
};
</script>

  
<style scoped>
.text-white2 {
    font-size: 1.2rem; 
    font-weight: bold;
    color: blue;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    padding: 10px;
    transition: all 0.3s ease;
}

.text-white2:hover {
    color: linear-gradient(to right, purple, pink); /* Gradient background */
    transform: scale(1.05); /* Slight zoom effect */
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
.not-found-container  {
    text-decoration: none;
    font-weight: lighter;
    margin-bottom: 2rem;

}

.not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f8f8;
    color: #333;
}

.not-found-container h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.not-found-container p {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

.home-link {
    background-color: #ffffff;
    font-size: 1.2rem;
    color: #4CAF50; /* Greenish primary color */
    text-decoration: none;
    border: 1px solid #4CAF50;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.home-link:hover {
    background-color: #4CAF50; /* Hover with matching color */
    color: #ffffff;
    transform: scale(1.1); /* Slightly enlarge */
    box-shadow: 0 6px 20px rgba(76, 175, 80, 0.5); /* Elegant shadow glow */
}

</style>
