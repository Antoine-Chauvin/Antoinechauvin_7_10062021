<template>
  <div class="chanel">
    <button class="burger" @click="showMenu">
        <span class="bar"></span>
      </button>
    <div :class="{ouverte: showedBurger == true}" class="chanelsList">
      <h3>Chanels :</h3>
      <div v-for="chanel in chanels" :key=chanel.id_chanel>
        <img src="../assets/hash.svg" alt="tag" />
        <router-link class="router-link"
        :to="{ name: 'Chanel', params: {id: chanel.id_chanel}}">
        {{ chanel.title }}
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Chanels',

  data() {
    return {
      chanels: [],
      showedBurger: false,
    };
  },
  methods: {
    showMenu() {
      if (!this.showedBurger) {
        this.showedBurger = true;
      } else {
        this.showedBurger = false;
      }
    },
  },
  mounted() {
    if (localStorage.getItem('Token')) {
      axios
        .get('http://localhost:3000/api/chanel/getChanels', {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
        })
        .then((response) => {
          this.chanels = response.data;
        });
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/mainCss/main.scss";

.chanel {
  position: fixed;
  top:80px;
  width: 100%;
  border-bottom-left-radius:20px ;
  border-bottom-right-radius:20px ;
  @media screen and (min-width: 768px) {
  width: 20%;
  height: 80%;
  box-shadow: 0px 0px 6px -2px grey;
  background-color:$secondBg;
  border-radius: 20px;
  top: 100px;
  }
  .chanelsList {
    display: none;
    @media screen and (min-width: 768px){
      display: block;
    }
    h3{
      color: $main-color;
    }
    padding: 7px;
    img {
      height: 18px;
    }
    .router-link {
      font-size: 25px;
      color:$main_color;
    }
  }
  .ouverte{
    display: block;
  }

  .burger{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 0;
    width: 100%;
    height:45px;
    border:none;
    background: $secondBg ;
    margin:0;
    border-top-left-radius: 0;
    border-top-right-radius:0 ;
    @media screen and (min-width: 768px) {
      display: none;
    }

      .bar{
        display: block;
        width: 5px;
        height: 5px;
        background-color: $main_color;
        border-radius: 5px;
      }
      .bar::before, .bar::after{
        content: "";
        display: block;
        width: 5px;
        height: 5px;
        background-color: $main_color;
        border-radius: 5px;
        position: absolute;

      }

      .bar::before{
        transform: translateX(-10px);
      }
      .bar::after{
        transform: translateX(10px);
      }
  }
}
</style>
