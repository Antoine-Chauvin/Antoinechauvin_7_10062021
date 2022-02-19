<template>
  <div class="header">
    <div class="logoGrp">
      <router-link :to="{name: 'accueil'}">
        <img
          src="../assets/icon-left-font-monochrome-black.png"
          alt="Groupomania logo"
          class="logo"
        />
      </router-link>
    </div>
    <div class="nav">
      <div class="nav-icone" @click="showProfile">
        <img src="../assets/user.svg" alt="" />
      </div>
      <div class="showProfile" v-if="showedProfile">
        <div class="closingCross" @click="closeProfile">
          <img src="../assets/x.svg" alt="fermer" />
        </div>
        <div id="Profile">
          <Profile />
        </div>
      </div>
      <div class="nav-icone">
        <img src="../assets/plus-square.svg" alt="" />
        <div class="createStatus">
          <CreateStatus @update:status="$emit('update:status')"/>
        </div>
      </div>
      <div class="nav-icone" @click="logout">
        <img src="../assets/log-out.svg" alt="Se déconnecter" />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from './Profil.vue';
import CreateStatus from './CreateStatus.vue';

export default {
  name: 'Header',
  data() {
    return {
      showedProfile: false,
    };
  },
  components: {
    Profile,
    CreateStatus,
  },
  methods: {
    logout() {
      localStorage.removeItem('Token');
      this.$router.push({ name: 'Home' });
    },
    showProfile() {
      this.showedProfile = true;
    },
    closeProfile() {
      this.showedProfile = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: rgb(248, 165, 156);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;

  .logoGrp {
    width: 35%;
    height: 80px;
    margin-left: 3%;
    align-content: center;
    .logo {
      height: 100%;
      width: 73%;
      object-fit: cover;
    }
  }
  .nav {
    height: 50%;
    width: 30%;
    display: flex;
    align-content: flex-end;
    justify-content: space-around;
    .nav-icone {
      width: 50%;
      img {
        width: 50px;
      }
    }
  }
  .showProfile {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.315);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 12;
    .closingCross {
      position: relative;
      left: 80%;
      top: 10%;
      width: 50px;
      height: 50px;
    }
    #Profile {
      position: relative;
      left: 20%;
      top: 15%;
      height: 100%;
      width: 100%;
    }
  }
}
</style>
