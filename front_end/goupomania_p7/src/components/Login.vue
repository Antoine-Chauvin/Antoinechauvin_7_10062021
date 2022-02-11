<template>
    <div class='Login'>
        <h1>Connexion</h1>
        <div>
      <label for='userEmail'>Email :</label>
      <input
        type='email'
        v-model='userEmailLogin'
        placeholder='Email'
        id='emailLogin'
        class='formSignup'
      />
    </div>
    <div>
      <label for='userPassword'>Mot de passe :</label>
      <input
        type='password'
        v-model='userPasswordLogin'
        placeholder='Mot de passe'
        id='passwordLogin'
        class='formSignup'
      />
    </div>
 <button @click='connectUser'>Connexion</button>
    </div>
</template>

<script>
import axios from 'axios';
import router from '../router';

export default {
  name: 'Login',

  data() {
    return {
      userEmailLogin: '',
      userPasswordLogin: '',
    };
  },
  methods: {
    connectUser() {
      const formRegExp = new RegExp("^[a-zA-Z,'-]+$");
      const mailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');

      if (mailRegExp.test(this.userEmailLogin) && formRegExp.test(this.userPasswordLogin)) {
        axios.post('http://localhost:3000/api/auth/login', {
          email: this.inputEmailLogin,
          password: this.inputPasswordLogin,
        })
          .then(() => {
            alert('connexion en cours');
            router.push({ path: '/' });
          })
          .catch((error) => {
            alert(error.status);
            console.log(error);
          });
      } else {
        console.log('validation,renvoie une erreur');
        this.invalid = true;
      }
    },
  },
};
</script>
