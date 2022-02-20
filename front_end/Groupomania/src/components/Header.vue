<template>
  <div class="header">
    <!--  -->
    <div class="logoGrp">
      <router-link :to="{name: 'accueil'}">
        <img
          src="../assets/icon-left-font-monochrome-orange.svg"
          alt="Groupomania logo"
          class="logo"
        />
      </router-link>
    </div>
    <!--  -->
    <div class="nav">
      <div class="nav-icone" @click="showProfile">
        <img src="../assets/user.svg" alt="Profile" />
      </div>
              <!--  -->
      <div class="showOption" v-if="showedProfile">
        <div class="closingCross" @click="closeProfile">
          <img src="../assets/x.svg" alt="fermer" />
        </div>
        <div class="vue">
          <Profile @update:status="$emit('update:status')" />
        </div>
      </div>
      <!--  -->
      <div class="nav-icone" @click="showCreate">
        <img src="../assets/plus-square.svg" alt="Creation de status" />
      </div>
              <!--  -->
      <div class="showOption" v-if="showedCreate">
        <div class="closingCross" @click="closeCreate">
          <img src="../assets/x.svg" alt="fermer" />
        </div>
        <div class="vue">
          <CreateStatus @update:status="$emit('update:status')" />
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
      showedCreate : false,
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
    showCreate() {
      this.showedCreate = true;
    },
    closeCreate() {
      this.showedCreate = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/mainCss/main.scss";
.header {
  background-color:$secondBg;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 85px;
  border-radius: 0;
  @media screen and (min-width:768px) {
  border-radius:15px ;
  }
  

  .logoGrp {
    width: 55%;
    height: 80px;
    margin-left: 3%;
    align-content: center;
      @media screen and (min-width:768px) {
    width: 35%;}
    .logo {
      height: 98%;
      width: 73%;
    }
  }
  .nav {
    height: 50%;
    width: 30%;
    display: flex;
    align-content: flex-end;
    justify-content: space-around;    
    .nav-icone {
      width: 30%;
      @media screen and (min-width:768px) {
      width: 50%;
    }
      img {
        width: 30px;
        @media screen and (min-width:768px) {
          width: 50px;
  }
      }
    }
  }
  .showOption{
    @include showOption;
    .closingCross {
      @include closingCross ;
    }
    .vue {
      @include contentModif;
    }
  }
}
</style>
