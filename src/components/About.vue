<template>
    <Navbar/>
    <div class="loading" v-if="isLoading">
        <Skeleton_About/>
      </div>
    
      <div class="alreadyLoaded" v-if="!isLoading">
<div class="allclass">
    <div class="jumbotron text-center my-3 container">
        <h1 class="display-4">TO-DO Pal</h1>
        <p class="lead">
            Welcome to TO-DO Pal, your ultimate companion for organizing your daily tasks. Whether you're managing your work assignments, personal errands, or project deadlines, TO-DO Pal makes it effortless. Simply create your to-do list, mark tasks as completed, and stay productive throughout the day. Start making the most out of your time with TO-DO Pal!
        </p>
    </div>

    <div class="container ourMission">
        <div class="row">
            <div class="col-md-6">
                <h2>Our Story</h2>
                <p>
                    In the hustle and bustle of modern life, we often find ourselves overwhelmed with tasks and commitments. Inspired by this common struggle, the team behind TO-DO Pal embarked on a mission to create a solution that simplifies task management. We poured our passion and expertise into crafting an intuitive platform that empowers users to stay organized and focused amidst the chaos of everyday life.
                </p>
            </div>
            <div class="col-md-6">
                <h2>Our Mission</h2>
                <p>
                    At TO-DO Pal, our mission is to revolutionize the way people manage their tasks and time. We strive to provide a user-friendly tool that enhances productivity and promotes a sense of accomplishment. Our goal is to empower individuals to prioritize their tasks effectively, streamline their workflows, and achieve their goals with confidence. With TO-DO Pal, we aim to make task management not only efficient but also enjoyable.
                </p>
            </div>
        </div>

    </div>

    
    
</div>
</div>
<Footer/>
</template>

  
<script setup>
import Footer from '@/components/Footer.vue'
import Navbar from './Navbar.vue'; 
import Skeleton_About from '@/skeleton/Skeleton_About.vue';
import {ref, onMounted} from 'vue';

const isLoading = ref(true);

onMounted(async () => {
    document.title = "TO-DO Pal - About";
    isLoading.value = true;
    await setTimeout(() => {
        isLoading.value = false;
    }, 750);
});

</script>

<style scoped>
.allclass{
    margin:25px;
}
.ourMission{
    background: linear-gradient(to right, #04ff71, #00e5ff);
}

.jumbotron {
    padding: 3rem 2rem;
    border-radius: 10px;
    color: #fff;
}

.display-4 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.lead {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1rem;
    font-family: serif; 
}

.container {
    margin-top: 2rem;
}

h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #333;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 1rem;
}



.btn-primary {
    background-color: #ff7e5f;
    border-color: #ff7e5f;
    color: #fff;
}

.btn-primary:hover {
    background-color: #feb47b;
    border-color: #feb47b;
}

@media (max-width: 768px) {
    .display-4 {
        font-size: 2.5rem;
    }

    .lead {
        font-size: 1.125rem;
    }

    h2 {
        font-size: 1.75rem;
    }

    p {
        font-size: 0.875rem;
    }
}

.jumbotron h1,
.jumbotron p {
    font-weight: 600;
}

.row {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
}

.col-md-6 {
    background: #f9f9f9;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin: 1rem;
}
</style>
