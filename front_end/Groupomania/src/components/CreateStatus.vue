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
      <button type="submit">Partager</button>
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
      files:{},
    };
  },
  props:{
    postToModif:{
      type:Object,
      default: null,
    },
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
      if(this.postToModif == null){
      axios
        .post('http://localhost:3000/api/status/createStatus', formData, {
          headers: { authorization: `bearer ${localStorage.getItem('Token')}` },
        })
        .then((res) => {
          console.log(res);
          this.$emit('update:status')
        });
        }
        else{
          formData.append('statusId',this.postToModif.id_status)
          axios.put('http://localhost:3000/api/status/modifyStatus',
          formData, 
          {headers: { authorization: `bearer ${localStorage.getItem('Token')}`}})
        .then(()=>{
          this.$emit('update:status')
          });
        }
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
        this.title = this.postToModif?.title || this.title
        this.chanChoose = this.postToModif?.chanel_id || this.chanelChoose
          // "?" renvoi un undifined si l'obj n'existe pas evite ainsi les err
          // "||" vient dire que "title" est la val par defaut de l'opération (là postToModif)
    },
};
</script>

<style></style>
