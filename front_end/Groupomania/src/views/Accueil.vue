<template>
  <div class="accueil">
    <Header class="header" @update:status="loadStatus()" />
    <Chanels class="chanel" />
    <Posts class="posts" :posts="posts" @update:status="loadStatus()" />
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
    if (!localStorage.getItem('Token')) {
      return this.$router.push({ name: 'Home' });
    }
  },
  mounted() {
      this.loadStatus()
  },
};
</script>

<style lang="scss">
.header {
  width: 100%;
  position: fixed;
  z-index: 11;
  top: 0;
}
.chanel {
  float: left;
  position: fixed;
  top: 100px;
  z-index: 10;
}
.posts {
  position: absolute;
  right: 40%;
  top: 100px;
}
</style>
