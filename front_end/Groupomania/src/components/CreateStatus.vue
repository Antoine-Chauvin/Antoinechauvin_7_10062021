<template>
  <div class="createStatus">
    <form @submit.prevent="handleSubmit">
      <input type="file" @change="uploadFile" />
      <input type="text" v-model="title" placeholder="Titre du status" />
      <select name="Chanels" v-model="chanChoose">
        <option v-for="chanel in chanels" :key="chanel.id_chanel" :value="chanel.id_chanel">
          {{ chanel.title }}
        </option>
      </select>
      <button type="submit">Mettre à jour</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      chanels: '',
      chanChoose: '',
      title: '',
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
      formData.append('title', this.title);
      formData.append('chanChoose', this.chanChoose);
      axios
        .post('http://localhost:3000/api/status/createStatus', formData, {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
        })
        .then((res) => {
          console.log(res);
        });
    },
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

<style></style>
