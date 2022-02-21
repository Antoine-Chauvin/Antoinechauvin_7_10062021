<template>
  <div class="Profile">
    <div class="infosProfile">
      <img :src="'http://localhost:3000/images' + defaultImg(profile.image_user)" alt="Image de profile" />
      <h2>{{ profile.name }} {{ profile.lastname }}</h2>
    </div>
    <button class="modifProfile" @click="showModif">Modifier l'avatar</button>
    <div class="modifImg" v-if="modifImg">
      <form @submit.prevent="handleSubmit">
        <input type="file" @change="uploadFile" />
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios';
// faireroute vers la route user by id
export default {
  name: 'Profile',
  data() {
    return {
      profile: '',
      files: null,
      modifImg: false,
    };
  },
  methods: {
    uploadFile(event) {
      this.files = event.target.files;
    },
    handleSubmit() {
      const formData = new FormData();
      for (const i of Object.keys(this.files)) {
        formData.append('image', this.files[i]);
      }
      axios.put('http://localhost:3000/api/profile/modifUser', formData,
        { headers: { authorization: `bearer ${localStorage.getItem('Token')}` } })
        .then((res) => {
          this.$emit('update:status');
          console.log(res);
        });
    },
    showModif() {
      this.modifImg = true;
    },
    defaultImg(img) {
      console.log(img);
      if (!img) {
        return '/pinkUser.png';
      }
      return img;
    },
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/profile/:id', {
        headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
      })
      .then((response) => {
        this.profile = response.data;
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/mainCss/main.scss";
.Profile {
  @include cardOptionHeader;
    display: flex;
  flex-direction: column;
.infosProfile {
    height: 80%;
    width: 100%;
    img {
      width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 50%;
      box-shadow: $shadowBox;
    }
  }
  .modifProfile{
    align-self: center;
  }
}
</style>
