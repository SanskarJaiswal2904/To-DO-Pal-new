import { createWebHistory, createRouter } from "vue-router";

import SignIn from "@/components/SignIn.vue";
import SignUp from "@/components/SignUp.vue";
import About from '@/components/About.vue';
import Admin from '@/components/Admin.vue';
import Notes from "@/components/Notes.vue";
import Profile from "@/components/Profile.vue";
import PageNotFound from"@/components/PageNotFound.vue";
import NotAdmin from "@/components/NotAdmin.vue";

const routes = [
    {
    name:'SignIn',
    path:'/login',
    component:SignIn
    },
    {
    name:'SignUp',
    path:'/signup',
    component:SignUp
    },
    {
    name:'Notes',
    path:'/',
    component:Notes
    },
    {
    name:'About',
    path:'/about',
    component:About
    },
    {
    name:'Admin',
    path:'/admin',
    component:Admin
    },
    {
    name:'NotAdmin',
    path:'/notadmin',
    component:NotAdmin
    },
    {
    name:'Profile',
    path:'/profile',
    component:Profile
    },
    {
    name: 'PageNotFound',
    path: '/:catchAll(.*)',  // Catch all undefined routes
    component: PageNotFound,
    },
];

const router = createRouter({
    history:createWebHistory(),
    routes
});

export default router;
