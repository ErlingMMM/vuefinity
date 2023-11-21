<template>
    <div class="login-page">
      <h2>Login Page</h2>
      <form @submit.prevent="startGame">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
        </div>
        <div class="form-group">
          <label for="email">E-mail:</label>
          <input type="email" id="email" v-model="email" required />
        </div>
        <div class="form-group">
          <label>
            <input type="checkbox" v-model="acceptTerms" />
            I want a chance to win the prize and accept to receive Emails from Experis.
          </label>
        </div>
        <button type="submit">Start the Game</button>
      </form>
    </div>
  </template>
  
  <script>

  export default {
  data() {
    return {
      name: '',
      email: '',
      acceptTerms: false
    };
  },
  methods: {
    startGame() {
      if (this.acceptTerms) {
        // Perform actions when the user accepts terms (e.g., start the game)
        console.log('Starting the game...');
        
        // Redirect to WhereIsWaldoPage
        this.$router.push({ name: 'where-is-waldo' });
      } else {
        // Show a message or handle the case when terms are not accepted
        console.log('Please accept the terms to start the game.');
      }
    }
  }
};
  </script>
  
  <style>
  .login-page {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  button {
    padding: 10px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  