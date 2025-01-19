<template>
    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container text-center">
            <h2 style="margin-top: 10px; margin-bottom: 25px"> © {{new Date().getFullYear()}} TO-DO Pal by SansKar Jaiswal </h2>
            <span class="text-white">
              © {{new Date().getFullYear()}} TO-DO Pal. All rights reserved.
            </span>
            <div class="text-white2">
              <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html" style="transition: box-shadow 0.3s ease, transform 0.3s ease; text-decoration: none;" onmouseover="this.style.boxShadow='0 4px 8px rgba(0, 0, 0, 0.2)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.boxShadow='none'; this.style.transform='translateY(0)'">
                <i class="fas fa-link"></i> Made By Sanskar
              </a>
              
              </div>

              <div class="icon-holder">
                <p>This website is built with  :  </p>
              <div class="icons">
                <div style="display: flex; align-items: center; gap: 20px;">
                  <i class="fa-brands fa-html5" title="HTML5" style="color: #E34F26; margin-left: 20px;"></i>
                  <i class="fa-brands fa-css3" title="CSS3" style="color: #1572B6;"></i>
                  <i class="fa-brands fa-js" title="JavaScript (ES6+)" style="color: #F7DF1E;"></i>
                  <i class="fa-brands fa-vuejs" title="Vue.js" style="color: #42B883;"></i>
                  <i class="fa-brands fa-python" title="Python (Flask)" style="background: linear-gradient(45deg, #306998, #FFD43B); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;"></i>
                  <i class="fa-solid fa-leaf" title="MongoDB" style="color: #47A248;"></i>
                  <img src="../assets/triangle.svg" alt="Server Icon" title="Vercel" width="17" height="17">
                  <img src="../assets/renderIcon.svg" alt="Server Icon" title="Render" width="17" height="17">
                </div>
              </div>
              </div>
              
        </div>
    </footer>
</template>

<script>
export default {
    name:'Footer',

};
</script>

<style>
.icon-holder{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 20px;
  }
  .icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    
  }
.footer {
    background: linear-gradient(to left, #3e026e, #4b0b94, #570bb5, #3b36a2, #1f1e63, #0a0f40);
    padding: 1rem 0;
    color: #fff;
    text-align: center;
    justify-content: center;

}

.footer .container {
    padding: 1rem;
}
.footer .container .text-white2{
    text-decoration: none;
    font-weight: lighter;
    color: #fff;    
    margin-top: 25px;

}
</style>