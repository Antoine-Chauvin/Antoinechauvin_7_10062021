<template>
  <div class="Status">
    <Header @update:status="getPosts($route.params.id)" />
    <Chanels />
    <AllPost :posts="posts" @update:status="getPost($route.params.id)" />
    <div class="createComment">
      <form @submit.prevent="handleSubmit">
        <input type="text" v-model="text" placeholder="Votre commentaire" />
        <button type="submit">Partager</button>
      </form>
    </div>
    <div class="comments" v-for="comment in comments" :key="comment.id_comment">
      <div class="commentsCreator">
        <img
          :src="'http://localhost:3000/images' + defaultImg(comment.image_user)"
          alt="Image de profile du créateur"
        />
        <h3>{{ comment.name }} {{ comment.lastname }}</h3>
        <p>à mis en commentaire:</p>
      </div>
      <div>
        <p class="commShared">{{ comment.text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Header from '../components/Header.vue';
import Chanels from '../components/Chanel.vue';
import AllPost from '../components/AllPost.vue';

export default {
  name: 'Status',
  data() {
    return {
      posts: [],
      text: '',
      comments: [],
    };
  },
  components: {
    Header,
    Chanels,
    AllPost,
  },
  methods: {
    defaultImg(img) {
      console.log(img);
      if (!img) {
        return '/pinkUser.png';
      }
      return img;
    },
    getPost(ID) {
      axios
        .get('http://localhost:3000/api/status/getOneStatus', {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
          params: { statusId: ID },
        })
        .then((response) => {
          this.posts = response.data;
        });
    },
    loadComments(id) {
      axios
        .get('http://localhost:3000/api/comment/allComments', {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
          params: { statusId: id },
        })
        .then((response) => {
          this.comments = response.data.resultat;
        });
    },
    handleSubmit() {
      const objectComment = {
        text: this.text,
        statusId: this.$route.params.id,
      };
      axios.post('http://localhost:3000/api/comment/createComment', objectComment, {
        headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
      });
      this.loadComments(this.$route.params.id);
    },
  },
  watch: {
    '$route.params.id': function (id) {
      this.getPost(id);
    },
  },
  mounted() {
    this.getPost(this.$route.params.id);
    this.loadComments(this.$route.params.id);
  },
};
</script>

<style lang="scss" scope>

@import "../assets/mainCss/main.scss";

.createComment {
  position: relative;
  top: 125px;
  left: 0;
  @media screen and (min-width:768px) {
    top: 90px;
    width: 900px;
    left: 25%;
  }

}
.comments{
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 5px;
  box-shadow: $shadowBox;
  top:125px;
  @media screen and (min-width:768px) {
     width: 900px;
      left: 25%;
      top:90px;
  }
  .commentsCreator{
    display: flex;
    flex-wrap: wrap;
    img{
    @include imgCrea;
    margin-left:15px;
    margin-top:5px;
    }
    h3{
      display: inline;
      width: 20%;
    }
    p{
      margin-top: 21.280px;
    }
  }
.commShared{
align-self:left;
}
}
</style>
