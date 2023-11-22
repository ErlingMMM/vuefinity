<template>
  <div class="login-page">
    <img src="@/assets/experislogo.png" alt="Experis Logo" class="experis-logo" />
    <h2>Registration</h2>
    <form @submit.prevent="startGame">
      <div class="form-group">
        <label for="name" class="form-label">UserName:</label>
        <input type="text" id="name" v-model="name" required />
      </div>
      <div class="form-group">
        <label for="email" class="form-label">E-Mail:</label>
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
      const whereIsWaldoRoute = { name: 'where-is-waldo' };
      this.$router.push(whereIsWaldoRoute);
    
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

.form-label {
  min-width: 100px; /* Adjust the width as needed */
  display: inline-block;
}

button {
  padding: 10px;
  background-color: #F87200;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>