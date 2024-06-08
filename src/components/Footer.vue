<template>
    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container text-center">
            <span class="text-white">
                © 2024 TO-DO Pal. All rights reserved.
            </span>
            <div class="text-white2">
                <a class="text-white2" href="https://sanskarjaiswal2904.github.io/Sanskar-Website/index.html">
                  <i class="fas fa-link"></i> Made By Sanskar
                </a>
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
.footer {
    background: linear-gradient(to left, #6a11cb, #2575fc);
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
    margin-top: 5px;

}
</style>