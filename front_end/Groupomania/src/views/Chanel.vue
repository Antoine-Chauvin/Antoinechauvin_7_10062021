<template>
  <div>
    <Header @update:status="getPosts($route.params.id)"/>
    <Chanels />
    <AllPost :posts="posts" @update:status="getPosts($route.params.id)"/>

  </div>
</template>
<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Chanels from '../components/Chanel.vue';
import AllPost from '../components/AllPost.vue';

export default {
  name: 'Chanel',
  data() {
    return {
      posts: [],
    };
  },
  components: {
    Header,
    Chanels,
    AllPost,
  },
  methods: {
    getPosts(ID) {
      axios
        .get('http://localhost:3000/api/status/chanel/getAllStatus', {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
          params: { chanId: ID },
        })
        .then((response) => {
          this.posts = response.data;
        });
    },
  },
  watch: {
    '$route.params.id': function (id) {
      this.getPosts(id);
    },
  },
  beforeMount() {
    let user = null
    if (localStorage.getItem('Token') !== null) {
      const userTk = localStorage.getItem('Token').split('.')[1];
       user = JSON.parse(atob(userTk));
      }
    if (!localStorage.getItem('Token') || user.exp < Date.now() / 1000) {
      this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
    this.getPosts(this.$route.params.id);
  },
};
</script>

<style></style>
