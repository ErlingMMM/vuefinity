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
  <button @click="openModal" class="new-try-button">Allerede registrert?</button>



  <!-- The Modal -->
  <div v-show="isModalOpen" @click.self="closeModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
      <div class="modal-header">
        <span @click="closeModal" class="close">&times;</span>
        <h2>Modal Header</h2>
      </div>
      <div class="modal-body">
        <div class="input-wrapper" @click="focusInput">
          <input ref="modalInput" placeholder="Fyll inn din e-post adresse" class="modal-input" v-model="modalInput" />
        </div>
      </div>
      <button type="submit" @click="startGameExistingUser" class="big-button modal-button">Start spillet</button>

      <div class="modal-footer">
        <h3>Modal Footer</h3>
      </div>
    </div>
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
      isModalOpen: false,
    };
  },
  methods: {
    async performGameAction(email, getUserEndpoint, isExistingUser) {
      try {
        const userExists = userService[getUserEndpoint]().value.some(user => user.email === email);

        if (isExistingUser && !userExists) {
          alert('User with this email does not exist!');
        } else if (!isExistingUser && userExists) {
          alert('User with this email already exists!');
        }

     

        if (!isExistingUser) {
          const newUser = {
            name: this.name,
            email: this.email,
            phoneNumber: this.phone,
            allowContact: this.acceptTerms,
            score: 0,
          };

          await userService.postUser(newUser);
        }


           // Store the email in local storage regardless of user type
           localStorage.setItem('userEmail', email);

        const gameRoute = { name: 'game', params: { userEmail: email } };
        console.log('User Email in LoginPage:', email);
        this.$router.push(gameRoute);

        this.$router.push({
          name: 'where-is-waldo',
          params: { userEmail: email },
        });
      } catch (error) {
        console.error('Error performing game action:', error);
      }
    },

    async startGame() {
      try {
        const getUserEndpoint = 'getAll'; 
        await this.performGameAction(this.email, getUserEndpoint, false);
      } catch (error) {
        console.error('Error starting the game:', error);
      }
    },

    async startGameExistingUser() {
      try {
        const getUserEndpoint = 'getAll'; 
        await this.performGameAction(this.modalInput, getUserEndpoint, true);
      } catch (error) {
        console.error('Error starting the game for existing user:', error);
      }
    },


    openModal() {
      this.isModalOpen = true;
    },

    closeModal() {
      this.isModalOpen = false;
    },

    focusInput() {
      this.$refs.modalInput.focus();
    },
  },
};
</script>

<style>
.login-page {
  max-width: 800px;
  /* Make the container wider */
  margin: auto;
  padding: 40px;
  /* Increase the padding */
  text-align: center;
}

.experis-logo {
  margin-bottom: 1.5cm;
  /* Increase the gap between the logo and the form to 4 cm */
}

.big-text {
  font-size: 24px;
  /* Double the font size */
}

.form-group {
  margin-top: 0px;
  /* Increase the margin between form groups, adjust as needed */
}

.form-label {
  min-width: 200px;
  /* Adjust the width as needed */
  display: inline-block;
  text-align: center;
  /* Center the text inside the label */
}

.rounded-input {
  border: 2px solid #ccc;
  /* Increase the border size */
  border-radius: 10px;
  /* Double the border-radius */
  padding: 16px;
  /* Double the padding */
  width: 45%;
  /* Reduce the width to move it a bit to the left */
  margin-left: -25%;
  /* Add some margin to the left */
  margin-bottom: 0.5cm
}

.big-input {
  font-size: 18px;
  /* Double the font size for input fields */
}

.big-button {
  padding: 20px;
  /* Double the padding for the button */
  font-size: 20px;
  /* Double the font size for the button */
  background-color: #F87200;
  color: white;
  border: none;
  border-radius: 10px;
  /* Double the border-radius for the button */
  cursor: pointer;
}

.big-button:hover {
  background-color: #FF8C29;
}

.new-try-button {
  color: blue;
  border: none;
  background-color: white;
  cursor: pointer;
}

.new-try-button:hover {
  text-decoration: underline;
  /* Underline the text */
}

.checkbox-group {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  margin-bottom: 1cm;
  /* Adjust the margin between the checkbox group and the next form group */
  margin-top: 0.5cm;
}

.checkbox-label {
  display: flex;
  align-items: center;
}

.custom-checkbox {
  width: 20px;
  /* Adjust the width as needed */
  height: 20px;
  /* Adjust the height as needed */
  margin-left: 10px;
  /* Adjust the margin between the text and the checkbox */
}



/**Modal */

.modal {
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  position: relative;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 40%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  -webkit-animation-name: animatetop;
  -webkit-animation-duration: 0.4s;
  animation-name: animatetop;
  animation-duration: 0.4s;
}



@-webkit-keyframes animatetop {
  from {
    top: -300px;
    opacity: 0
  }

  to {
    top: 0;
    opacity: 1
  }
}

@keyframes animatetop {
  from {
    top: -300px;
    opacity: 0
  }

  to {
    top: 0;
    opacity: 1
  }
}

.close {
  color: black;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: gray;
  text-decoration: none;
  cursor: pointer;
}

.modal-header {
  padding: 2px 16px;
  background-color: white;
  color: white;
}

.modal-body {
  padding: 2px 16px;
}

.modal-footer {
  padding: 2px 16px;
  background-color: white;
  color: white;
}

.modal-input {
  border: none;
  width: 90%;
}

.modal-input:focus {
  outline: none;
}

.input-wrapper {
  border: 2px solid #ccc;
  border-radius: 10px;
  padding: 16px 5px;
  margin-bottom: 0.5cm;
}

.input-wrapper:focus-within {
  box-shadow: 0 0 4px gray;
}

.modal-button {
  height: auto;
  padding: 13px;
  font-size: 16px;
}
</style>
