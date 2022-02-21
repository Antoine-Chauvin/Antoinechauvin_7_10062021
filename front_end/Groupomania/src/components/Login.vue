<template>
  <div class="Login">
    <h1>Connexion</h1>
    <p v-if="error">{{ error }}</p>
    <form @submit.prevent="connectUser">
      <div>
        <label for="userEmail">Email :</label>
        <input
          type="email"
          v-model="EmailLogin"
          placeholder="Email"
          id="emailLogin"
          class="formSignup"
        />
      </div>
      <div>
        <label for="userPassword">Mot de passe :</label>
        <input
          type="password"
          v-model="PasswordLogin"
          placeholder="Mot de passe"
          id="passwordLogin"
          class="formSignup"
        />
      </div>
      <button type="submit">Connexion</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',

  data() {
    return {
      EmailLogin: '',
      PasswordLogin: '',
      error: '',
    };
  },
  methods: {
    connectUser() {
      const formRegExp = new RegExp("^[a-zA-Z0-9,'-]+$");
      const mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

      if (mailRegExp.test(this.EmailLogin) && formRegExp.test(this.PasswordLogin)) {
        axios
          .post('http://localhost:3000/api/auth/login', {
            email: this.EmailLogin,
            password: this.PasswordLogin,
          })
          .then((response) => {
            localStorage.setItem('Token', response.data.token);
            this.$router.push({ name: 'accueil' });
          })
          .catch((error) => {
            this.error = error.response.data.message;
            console.log(error.response.data.message);
          });
      } else {
        console.log('validation,renvoie une erreur');
        this.invalid = true;
      }
    },
  },
};
</script>
