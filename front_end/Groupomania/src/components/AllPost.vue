<template>
  <div class="posts">
    <div class="popupModif" v-if="showedModif">
      <div class="closingCross" @click="closeModif">
        <img src="../assets/x.svg" alt="fermer" />
      </div>
      <div id="Modif">
        <CreateStatus :postToModif="postToModif"
        @update:status="$emit('update:status')"
        @close-popups="closeModif()" />
      </div>
    </div>
    <div class="status" v-for="status in posts" :key="status.id_status">
      <div class="status__creator">
        <img
          :src="'http://localhost:3000/images' + defaultImg(status.image_user)"
          alt="Image de profile du créateur"
        />
        <h2>{{ status.name }} {{ status.lastname }}</h2>
        <div v-if="userCon.isAdmin === 1">
          <button @click.prevent="blocageCompte(status.user_id)">bloquer l'utilisateur</button>
        </div>
      </div>
      <router-link class="router-link" :to="{ name: 'Status', params: { id: status.id_status } }">
        <div class="status__shared">
          <h3 class="status--title">{{ status.title }}</h3>
          <img :src="'http://localhost:3000/images' + defaultImgStatus(status.image)" alt="Image shared" />
        </div>
        <div class="like">
          <img src="../assets/thumbs-up.svg" alt="like"
          @click.prevent="like(status.id_status, 1)"
          v-if="status.value !==1" />
          <img src="../assets/thumbs-up-filled.svg" alt="unlike"
          @click.prevent="like(status.id_status,0)" v-else />
        </div>
        <div v-if="userCon.userId == status.user_id">
          <button @click.prevent="showModif(status)">Modifer</button>
        </div>
        <div v-if="userCon.isAdmin === 1">
          <button @click.prevent="blocageStatus(status.id_status)">bloquer le status</button>
        </div>
        <p>Status crée le : {{ status.created_at_status }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CreateStatus from './CreateStatus.vue';

export default {
  name: 'Posts',

  data() {
    return {
      userCon: '',
      idStatus: '',
      showedModif: false,
      postToModif: null,
      imageErr: false,
    };
  },
  components: {
    CreateStatus,
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    verifUser() {
      if (localStorage.getItem('Token')) {
        const userTk = localStorage.getItem('Token').split('.')[1];
        const user = JSON.parse(atob(userTk));
        this.userCon = user;
      }
    },

    showModif(Status) {
      this.postToModif = Status;
      this.showedModif = true;
    },
    closeModif() {
      this.showedModif = false;
    },
    blocageCompte(id) {
      axios.put(
        'http://localhost:3000/api/admin/blockUser',
        { userId: id },
        { headers: { authorization: `bearer ${localStorage.getItem('Token')}` } },
      );
    },
    blocageStatus(id) {
      axios
        .put(
          'http://localhost:3000/api/admin/blockStatus',
          { statusId: id },
          { headers: { authorization: `bearer ${localStorage.getItem('Token')}` } },
        )
        .then(() => {
          this.$emit('update:status');
        });
    },
    like(id, value) {
      axios.put('http://localhost:3000/api/status/voteStatus',
        { statusId: id, vote: value },
        { headers: { authorization: `bearer ${localStorage.getItem('Token')}` } })
        .then(() => {
          this.$emit('update:status');
        });
    },
    defaultImg(img) {
      if (!img) {
        return '/pinkUser.png';
      }
      return img;
    },
    defaultImgStatus(img) {
      if (!img) {
        return '/icon.png';
      }
      return img;
    },
  },
  mounted() {
    this.verifUser();
  },
};
</script>

<style lang="scss" scope>
@import "../assets/mainCss/main.scss";
.posts {
  max-width: 100%;
  @media screen and (min-width:768px) {
    max-width: 85%;
}
  .popupModif{
    @include showOption;
    .closingCross{
      @include closingCross;
    }
    .createStatus{
      @include contentModif;
    }
  }
  .status {
    background-color: $thirdBg;
    box-shadow: 0px 0px 6px -2px grey;
    border-radius: 10px;
    padding: 10px;
    margin: 15px;
    .status__creator {
          display: flex;
          justify-content: center;
      img {
       @include imgCrea;
      }
      div.button{
        margin-left: 5%;
      }
     }
    .status__shared {
      img {
        max-height: 700px;
        max-width:95%;
        object-fit: contain;
      }
    }
    div.like{
        position: relative;
        left: 80%;
        top: 50px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: $main_color;
        img{
          width: 75%;
          margin-top:6%;
          margin-left: 6%;
        }
      }
  }
}
</style>
