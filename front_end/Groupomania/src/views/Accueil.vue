<template>
  <div class="accueil">
    <Header  @update:status="loadStatus()" />
    <Chanels/>
    <Posts :posts="posts" @update:status="loadStatus()" />
  </div>
</template>

<script>
import axios from 'axios';
import Chanels from '@/components/Chanel.vue';
import Posts from '@/components/AllPost.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'accueil',

  data() {
    return {
      posts: [],
    };
  },
  components: {
    Header,
    Chanels,
    Posts,
  },
  methods: {
    loadStatus() {
      axios
        .get('http://localhost:3000/api/status/getAllStatus', {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
        })
        .then((response) => {
          this.posts = response.data;
        });
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
    this.loadStatus();
  },
};
</script>

<style lang="scss">
</style>
