<template>
  <div class="chanels">
    <div>
      <h3>Chanels :</h3>
      <div v-for="chanel in chanels" :key="chanel.id_chanel">
        <img src="../assets/hash.svg" alt="tag" />
        <span>{{ chanel.title }}</span>
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
    };
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/chanel/getChanels', {
        headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
      })
      .then((response) => {
        this.chanels = response.data;
      });
  },
};
</script>

<style lang="scss" scoped>
.chanels {
  width: 20%;
  height: 80%;
  box-shadow: 0px 0px 6px -2px grey;
  background-color: rgb(248, 165, 156);
  border-radius: 20px;

  div {
    padding: 7px;
    img {
      height: 18px;
    }
    span {
      font-size: 20px;
    }
  }
}
</style>
