<template>
  <div>
    <Header />
    <Chanels />

    <div class="posts">
      <div class="status" v-for="status in posts" :key="status.id_status">
        <div class="status__creator">
          <img
            :src="'http://localhost:3000/images' + status.image_user"
            alt="Image de profile du créateur"
          />
          <span>{{ status.name }}</span>
          <span>{{ status.lastname }}</span>
        </div>
        <div class="status__shared">
          <h3 class="status--title">{{ status.title }}</h3>
          <img :src="'http://localhost:3000/images' + status.image" alt="Image shared" />
        </div>
        <!-- <Vote /> -->
        <p>{{ status.created_at_status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

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
  },
  watch:{
      
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/status/chanel/getAllStatus', {
        headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
      })
      .then((response) => {
        this.posts = response.data;
      });
  },
};
</script>

<style></style>
