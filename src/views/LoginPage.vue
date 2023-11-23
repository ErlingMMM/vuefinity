<template>
  <div class="login-page">
    <img src="@/assets/experislogo.png" alt="Experis Logo" class="experis-logo" />
    <form @submit.prevent="startGame">
      <div class="form-group">
        <label for="name" class="form-label big-text"></label>
        <input type="text" id="name" v-model="name" placeholder="Brukernavn" class="rounded-input big-input" required />
      </div>
      <div class="form-group">
  <label for="phone" class="form-label big-text"></label>
  <input type="phone" id="phone" v-model="phone" placeholder="Telefon" class="rounded-input big-input" required />
</div>
      <div class="form-group">
        <label for="email" class="form-label big-text"></label>
        <input type="email" id="email" v-model="email" placeholder="E-post" class="rounded-input big-input" required />
      </div>
      <div class="form-group checkbox-group">
  <label class="big-text checkbox-label">
    Jeg ønsker en sjanse til å vinne premien<br>og aksepterer å motta e-post fra Experis.
    <input type="checkbox" v-model="acceptTerms" class="custom-checkbox" />
  </label>
</div>
      <button type="submit" class="big-button">Start spillet</button>
    </form>
  </div>
</template>

<script>
import userService from '@/services/userService';

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      acceptTerms: false,
    };
  },
  methods: {
    async startGame() {
      try {
        // Check if the email already exists in the database
        const userExists = userService.getAll().value.some(user => user.email === this.email);

        if (userExists) {
          // Email already exists, handle accordingly
          console.log('User with this email already exists!');
        } else {
          // Email does not exist, post a new user
          const newUser = {
            name: this.name,
            email: this.email,
            phoneNumber: this.phone,
            allowContact: this.acceptTerms,
            score: 0,
          };

          await userService.postUser(newUser);

          // Save the email in local storage
          localStorage.setItem('userEmail', this.email);

          const gameRoute = { name: 'game', params: { userEmail: this.email } };
          console.log('User Email in LoginPage:', this.email);
          this.$router.push(gameRoute);


          // Pass the email to the ColorTextPage component
          this.$router.push({
            name: 'where-is-waldo',
            params: { userEmail: this.email },
          });
        }
      } catch (error) {
        console.error('Error starting the game:', error);
      }
    },
  },
};
</script>

<style>
.login-page {
  max-width: 800px; /* Make the container wider */
  margin: auto;
  padding: 40px; /* Increase the padding */
  text-align: center;
}

.experis-logo {
  margin-bottom: 1.5cm; /* Increase the gap between the logo and the form to 4 cm */
}

.big-text {
  font-size: 24px; /* Double the font size */
}

.form-group {
  margin-top: 0px; /* Increase the margin between form groups, adjust as needed */
}

.form-label {
  min-width: 200px; /* Adjust the width as needed */
  display: inline-block;
  text-align: center; /* Center the text inside the label */
}

.rounded-input {
  border: 2px solid #ccc; /* Increase the border size */
  border-radius: 10px; /* Double the border-radius */
  padding: 16px; /* Double the padding */
  width: 45%; /* Reduce the width to move it a bit to the left */
  margin-left: -25%; /* Add some margin to the left */
  margin-bottom: 0.5cm
}

.big-input {
  font-size: 18px; /* Double the font size for input fields */
}

.big-button {
  padding: 20px; /* Double the padding for the button */
  font-size: 20px; /* Double the font size for the button */
  background-color: #F87200;
  color: white;
  border: none;
  border-radius: 10px; /* Double the border-radius for the button */
  cursor: pointer;
}

.big-button:hover {
background-color: #FF8C29;
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  margin-bottom: 1cm; /* Adjust the margin between the checkbox group and the next form group */
  margin-top: 0.5cm;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  width: 20px; /* Adjust the width as needed */
  height: 20px; /* Adjust the height as needed */
  margin-left: 10px; /* Adjust the margin between the text and the checkbox */
}

</style>
