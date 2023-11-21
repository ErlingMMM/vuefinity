<template>
  <section class="waldo-page">
    <button :style="{ top: buttonPosition.top, left: buttonPosition.left }" @click="redirectToReactionTimePage">
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
    };
  },
  created() {
    this.setRandomBackground();
    this.setButtonPosition();
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
    redirectToReactionTimePage() {
      const reactionTime = { name: 'reaction-time' };
      this.$router.push(reactionTime);
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
