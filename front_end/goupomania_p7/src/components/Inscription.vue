<template>
  <div class='inscription'>
    <h1>Création de compte</h1>

    <form @submit="createUser">
      <div>
        <label for='userName'>Nom :</label>
        <input
          type='text'
          v-model="userName"
          placeholder='Nom'
          id='name'
          class='formSignup'
        />
      </div>
      <div>
        <label for='userLastName'>Prénom :</label>
        <input
          type='text'
          v-model="userLastname"
          placeholder='Prénom'
          id='lastname'
          class='formSignup'
        />
      </div>
      <div>
        <label for='userEmail'>Email :</label>
        <input
          type='email'
          v-model='userEmail'
          placeholder='Email'
          id='email'
          class='ormSignup'
        />
      </div>
      <div>
        <label for='userPassword'>Mot de passe :</label>
        <input
          type='password'
          v-model="userPassword"
          placeholder='Mot de passe'
          id='password'
          class='formSignup'
        />
      </div>
    <router-link to='/insciption'><button type='submit'>Créer un compte</button></router-link>
    </form>
  <div>
  <p v-for="title in titles" :key="title">{{ title.title }}</p>
  </div>
</div>

</template>
<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'Inscription',

  data() {
    return {
      userName: '',
      userLastname: '',
      userEmail: '',
      userPassword: '',
      titles: [],
    };
  },
  methods: {
    createUser() {
      const formRegEx = new RegExp("^[a-zA-Z,'-]+$");
      const mailRegEx = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
      const passRegex = new RegExp("^[a-zA-Z0-9,'-]+$");
      if (
        formRegEx.test(this.userName)
        && formRegEx.test(this.userLastname)
        && mailRegEx.test(this.userEmail)
        && passRegex.test(this.userPassword)
      ) {
        axios
          .post('http://localhost3000/api/auth/signup', {
            name: this.userName,
            lastName: this.userLastname,
            mailUser: this.userEmail,
            passUser: this.userPassword,
          })
          .then(() => {
            alert('inscription réussie, redirection vers le module de connexion');
            router.push({ path: '/' });
          })
          .catch((error) => {
            alert(error.status);
            console.log(error);
          });
      } else {
        console.log('validation form, renvoie une erreur');
      }
    },
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/status/getAllStatus')
      .then((response) => {
        this.titles = response.data;
      });
  },
};
</script>
