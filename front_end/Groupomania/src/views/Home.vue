<template>
  <div class="home">
    <img src="../assets/icon-left-font-monochrome-orange.svg" alt="" />
    <div class="homeForm">
      <button @click="showCo" v-if="showsignup">Connexion</button>
      <button @click="showSi" v-if="showConnect">signup</button>
      <div class="Connexion" v-if="showConnect">
        <Login />
      </div>
      <div class="inscription" v-if="showsignup">
        <Inscription />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Login from '@/components/Login.vue';
import Inscription from '@/components/Inscription.vue';

export default {
  name: 'Home',
  data() {
    return {
      showConnect: true,
      showsignup: false,
    };
  },
  components: {
    Login,
    Inscription,
  },
  methods: {
    showCo() {
      if (this.showConnect == true) {
        this.showConnect = false;
        this.showsignup = true;
      } else {
        this.showConnect = true;
        this.showsignup = false;
      }
    },
    showSi() {
      if (this.showsignup == false) {
        this.showsignup = true;
        this.showConnect = false;
      } else {
        this.showsignup = false;
        this.showConnect = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/mainCss/main.scss';
.home {
  img {
    width: 100%;
    @media screen and (min-width: 768px) {
      width: 70%;
    }
  }
  .homeForm {
    background: $secondBg;
      margin: auto;
      margin-top: 30px;
      border-radius: 30px;
      width: 80%;
    @media screen and( min-width: 768px) {
      width: 700px;
    }
  }
}
</style>
