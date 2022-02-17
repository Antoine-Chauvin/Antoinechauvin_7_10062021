<template>
 <div class="accueil">
     <Header class="header"/>
     <Chanels class="chanel"/>
     <Posts class="posts"/>
</div> 
</template>

<script>
import Chanels from '@/components/Chanel.vue';
import Posts from '@/components/AllPost.vue';
import Header from '@/components/Header.vue';

export default {
    name: 'accueil',

    components:{
    Header,
    Chanels,
    Posts,
    },
    beforeMount(){
        if(!localStorage.getItem('Token')){
            return this.$router.push({name: 'Home'});
        }
    }

}
</script>

<style lang="scss">
.header{
    width: 100%;
position: fixed;
z-index: 11;
top: 0;
}
.chanel{
float: left;
position: fixed;
top: 100px ;
z-index: 10;
}
.posts{
position: absolute ;
right: 40%;
top: 100px;
}
</style>