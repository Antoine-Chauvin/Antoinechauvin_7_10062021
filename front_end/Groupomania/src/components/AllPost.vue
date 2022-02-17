<template>
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
        <img
          :src="'http://localhost:3000/images' + status.image"
          alt="Image shared"
        />
      </div>
      <!-- <Vote /> -->
      <p>{{ status.created_at_status }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Posts',

  data() {
    return {
      posts: [],
    };
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/status/getAllStatus', {
        headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
      })
      .then((response) => {
        this.posts = response.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.posts {
  max-width: 85%;

  .status {
    box-shadow: 0px 0px 6px -2px grey;
    border-radius: 10px;
    padding: 10px;
    margin: 15px;
    .status__creator {
      img{
        object-fit: cover; 
        height: 50px;
        width: 50px;
        border-radius: 50%;
      }
    }
    .status__shared {
      
      img {
        height: 400px;
        width: 400px;
        object-fit: cover;
      }
    }
  }
}
</style>
