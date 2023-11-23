<template>
  <section class="waldo-page">
    <div class="countdown">{{ countdownFormatted }}</div>
    <button :style="{ top: buttonPosition.top, left: buttonPosition.left }" @click="handleButtonClick">
      Click me
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      backgroundImage: '',
      randomBackgroundNumber: 0,
      buttonPosition: { top: '50%', left: '50%' }, // Default position in the center
      startTime: 0,
      endTime: 0,
      countdownSeconds: 30, // Set the countdown duration in seconds
      countdownInterval: null, // Initialize the countdown interval variable
    };
  },
  created() {
    this.setRandomBackground();
    this.setButtonPosition();
    this.startCountdown();
    this.$root.UserHighScore = 0; // Initialize UserHighScore
    this.$root.reactionTime = 0;
  },
  computed: {
    countdownFormatted() {
      // Format the countdown with two decimal places
      return this.countdownSeconds.toFixed(0);
    },
  },
  watch: {
    countdownSeconds(newValue) {
      // Format the countdown with two decimal places
      this.countdownFormatted = newValue.toFixed(2);
    },
  },
  methods: {
    setRandomBackground() {
      // Generate a random number between 1 and 3
      this.randomBackgroundNumber = Math.floor(Math.random() * 3) + 1;

      // Set the background image based on the random number
      this.backgroundImage = require(`@/assets/WIW${this.randomBackgroundNumber}.jpg`);

      // Update the CSS variable with the background image URL
      document.documentElement.style.setProperty('--background-image', `url(${this.backgroundImage})`);
    },
    setButtonPosition() {
      switch (this.randomBackgroundNumber) {
        case 1:
          this.buttonPosition = { top: '7%', left: '41%' };
          break;
        case 2:
          this.buttonPosition = { top: '80%', left: '25%' };
          break;
        case 3:
          this.buttonPosition = { top: '80%', left: '42%' };
          break;
        default:
          this.buttonPosition = { top: '50%', left: '50%' };
      }
    },
    startCountdown() {
      // Start the countdown
      this.countdownInterval = setInterval(() => {
        this.countdownSeconds--;

        if (this.countdownSeconds <= 0) {
          // If time runs out and the button is not clicked, set the score to 0.1
          clearInterval(this.countdownInterval);
          this.$root.UserHighScore = 0.1; // Set remaining time to 0.1 seconds
          localStorage.setItem('score', '0.1');

          // Redirect to the next page
          this.$router.push({ name: 'reaction-time' });
        }
      }, 1000); // Update the countdown every second
    },
    handleButtonClick() {
      // Stop the countdown if the button is clicked
      clearInterval(this.countdownInterval);

      // Record the time when the button is clicked
      this.endTime = performance.now();

      // Calculate the elapsed time in milliseconds
      const elapsedTime = this.endTime - this.startTime;

      // Calculate the remaining time in seconds
      const remainingTime = Math.max(this.countdownSeconds - (elapsedTime / 1000), 0);

      // Set the score to a minimum of 0.1 seconds if the user didn't click in time
      //const score = remainingTime > 0 ? remainingTime : 0.1;

      // Save the score to local storage
      localStorage.setItem('score', remainingTime.toString());

      // Redirect to the next page
      this.$router.push({ name: 'reaction-time' });
    },
  },
};
</script>

<style scoped>
:root {
  --background-image: '';
}

.waldo-page {
  position: relative;
  height: 100vh;
  margin: 0;
  overflow: hidden;
}

.waldo-page:hover {
    cursor: pointer;
}

.countdown {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 220px;
  color: black;
}

.waldo-page::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: var(--background-image) center/cover;
  z-index: -1;
}

button {
  position: absolute;
  /* Additional styling for the button (customize as needed) */
  padding: 10px;
  background-color: transparent;
  color: transparent;
  border: none;
  border-radius: 5px;
  height: 100px;
  cursor: pointer;
}
</style>
