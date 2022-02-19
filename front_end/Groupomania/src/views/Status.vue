<template>
  <div>
    <Header @update:status="getPosts($route.params.id)"/>
    <Chanels />
    <AllPost :posts="posts"/>
    
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Chanels from '../components/Chanel.vue';
import AllPost from '../components/AllPost.vue';

export default {
    name: 'Status',
  data(){
      return{
          posts:[],
      }
  },
  components: {
    Header,
    Chanels,
    AllPost,
  },
    methods: {
    getPosts(ID) {
      axios
        .get('http://localhost:3000/api/status/getOneStatus', {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
          params: { StatusId: ID },
        })
        .then((response) => {
          this.posts = response.data;
        });
    },
  },
  mounted() {
    this.getPosts(this.$route.params.id);
  },
};
</script>

<style>

</style>