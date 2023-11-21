<template>
    <section class="full-screen" :class="{ green: isGreen, red: !isGreen }" @click="checkReactionTime">
        <div v-if="!isGreen" class="message">Wait for green</div>
        <div v-else class="message">Click!</div>
        <div v-if="endTime" class="reaction-time">Your reaction time: {{ reactionTime }} ms</div>
        <div class="high-score" v-if="highScore">High Score: {{ highScore }} ms</div>
    </section>
</template>


<script>
export default {
  data() {
    return {
      startTime: null,
      endTime: null,
      isGreen: false,
      reactionTime: null,
      highScore: this.getHighScore(), // Initialize high score from localStorage
    };
  },
  methods: {
    checkReactionTime() {
      if (this.isGreen) {
        this.endTime = new Date().getTime();
        this.reactionTime = this.endTime - this.startTime;
        this.isGreen = false;
        this.updateHighScore(this.reactionTime);
        setTimeout(this.changeColor, 2000); // Wait 2 seconds before starting over
      }
    },
    changeColor() {
      this.endTime = null; // Reset the end time
      this.reactionTime = null; // Reset the reaction time
      setTimeout(() => {
        this.isGreen = true;
        this.startTime = new Date().getTime();
      }, Math.floor(Math.random() * 5000) + 1000); // Change color randomly between 1 to 5 seconds
    },
    getHighScore() {
      return localStorage.getItem('highScore') || null;
    },
    updateHighScore(newTime) {
      if (this.highScore === null || newTime < this.highScore) {
        this.highScore = newTime;
        localStorage.setItem('highScore', newTime);
      }
    }
  },
  mounted() {
    this.changeColor();
  },
};
</script>


<style>
.full-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  user-select: none; /* Prevent user selection on double clicks */
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.message {
  font-size: 2rem;
  color: white;
  text-align: center;
  margin: 20px;
}

.reaction-time {
  color: white;
  font-size: 1.5rem;
}

</style>
