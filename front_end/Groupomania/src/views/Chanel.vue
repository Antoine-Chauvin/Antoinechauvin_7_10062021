<template>
  <div>
    <Header />
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
  mounted() {
    this.getPosts(this.$route.params.id);
  },
};
</script>

<style></style>
