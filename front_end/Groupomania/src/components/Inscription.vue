<template>
  <div class="inscription">
    <h1>Création de compte</h1>
    <h1 v-if="error">{{ error }}</h1>
    <form @submit.prevent="createUser">
      <div>
        <label for="userName">Nom :</label>
        <input type="text" v-model="userName" placeholder="Nom" id="name" class="formSignup" />
      </div>
      <div>
        <label for="userLastName">Prénom :</label>
        <input
          type="text"
          v-model="userLastname"
          placeholder="Prénom"
          id="lastname"
          class="formSignup"
        />
      </div>
      <div>
        <label for="userEmail">Email :</label>
        <input type="email" v-model="userEmail" placeholder="Email" id="email" class="ormSignup" />
      </div>
      <div>
        <label for="userPassword">Mot de passe :</label>
        <input
          type="password"
          v-model="userPassword"
          placeholder="Mot de passe"
          id="password"
          class="formSignup"
        />
      </div>
      <button type="submit">Créer un compte</button>
    </form>
</div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Inscription',

  data() {
    return {
      userName: '',
      userLastname: '',
      userEmail: '',
      userPassword: '',
      error: '',
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
          .post('http://localhost:3000/api/auth/signup', {
            name: this.userName,
            lastName: this.userLastname,
            email: this.userEmail,
            password: this.userPassword,
          })
          .then(() => {
            axios
              .post('http://localhost:3000/api/auth/login', {
                email: this.EmailLogin,
                password: this.PasswordLogin,
              })
              .then((response) => {
                localStorage.setItem('Token', response.data.token);
                this.$router.push({ name: 'Accueil' });
              });
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
      } else {
        console.log('validation form, renvoie une erreur');
      }
    },
  },
};
</script>
