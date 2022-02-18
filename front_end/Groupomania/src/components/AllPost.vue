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
        <div v-if="userCon.isAdmin === 1">
      <button>bloquer l'utilisateur</button>
      </div>
      </div>
      <div class="status__shared">
        <h3 class="status--title">{{ status.title }}</h3>
        <img :src="'http://localhost:3000/images' + status.image" alt="Image shared" />
      </div>
      <!-- <Vote /> -->
      <div v-if="userCon.userId == status.user_id">
      <button>Modifer</button>
      </div>
      <div v-if="userCon.isAdmin === 1">
      <button>bloquer le status</button>
      </div>
      <p>{{ status.created_at_status }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Posts',

 data() {
   return {
     userCon : ''
   }
 },
  props: {
    posts: {
      type: Array,
      default: () => {
        [];
      },
    },
  },
  methods: {
    
    verifUser() {
      const userTk = localStorage.getItem('Token').split('.')[1];
      const user = JSON.parse(atob(userTk));
      this.userCon = user
    },
  },
  mounted() {
    this.verifUser();
  },
};
</script>

<style lang="scss" scope>
.posts {
  max-width: 85%;

  .status {
    box-shadow: 0px 0px 6px -2px grey;
    border-radius: 10px;
    padding: 10px;
    margin: 15px;
    .status__creator {
      img {
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
