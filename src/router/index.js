import Vue from 'vue';
import Router from 'vue-router';

// Home
const Home = () => import('../views/Home/Home');
// About
const About = () => import('../views/Home/About');

Vue.use(Router);

export default new Router({
    routes: [
        {
            // Home
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            // About
            path: '/About',
            name: 'About',
            component: About
        }
    ]
});
