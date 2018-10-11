<template>
  <div class='home'>
    <img alt='Vue logo' src='../../assets/images/logo.png'>
    <HelloWorld msg='Welcome to Your Vue.js App'/>
  </div>
</template>

<script>
import { Login } from '@/api';
// @ is an alias to /src
import HelloWorld from '@/components/Home/HelloWorld.vue';

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    mounted() {
        Login().then(res => {
            console.warn(res);
        });
    }
};
</script>
