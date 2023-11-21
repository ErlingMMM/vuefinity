<template>
  <section class="full-screen" :class="{ green: isGreen, red: !isGreen }" @click="checkReactionTime">
    <div v-if="!gameStarted || failed" class="message">
      <button @click.stop="startGame">Start</button>
    </div>
    <div v-else>
      <div v-if="!isGreen" class="message">Wait for green</div>
      <div v-if="isGreen" class="message">Click!</div>
    </div>
    <div v-if="reactionTime && !failed" class="reaction-time">Your reaction time: {{ reactionTime }} ms</div>
    <div v-if="highScore && !failed" class="high-score">High Score: {{ highScore }} ms</div>
    <div v-if="failed" class="fail-message">Too soon! Click "Start" to try again.</div>
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
      highScore: this.getHighScore(),
      gameStarted: false,
      failed: false,
    };
  },

  methods: {
    startGame() {
      this.failed = false;  // Reset failed state
      this.gameStarted = true; // Start the game
      this.reactionTime = null; // Reset reaction time
      this.isGreen = false; // Ensure the block is red
      this.changeColor(); // Start the change color sequence
    },

    checkReactionTime() {
      if (!this.gameStarted) {
        // Do nothing if the game hasn't started
        return;
      }
      if (this.isGreen) {
        // Correct click: record the reaction time
        this.endTime = new Date().getTime();
        this.reactionTime = this.endTime - this.startTime;
        this.updateHighScore(this.reactionTime);
        this.$emit('testComplete');
        this.isGreen = false; // Reset the color for the next round
        this.changeColor(); // Immediately start the next round
      } else {
        // Incorrect click: clicked too soon
        this.failed = true; // Set the failed state
        this.gameStarted = false; // Stop the game
        this.isGreen = false; // Reset the color
      }
    },
    
    changeColor() {
      setTimeout(() => {
        this.isGreen = true; // Change to green
        this.startTime = new Date().getTime(); // Record the start time
      }, Math.floor(Math.random() * 5000) + 1000); // Random delay before the color changes
    },

    getHighScore() {
      return localStorage.getItem('highScore') || null;
    },

    updateHighScore(newTime) {
      if (this.highScore === null || newTime < this.highScore) {
        this.highScore = newTime;
        localStorage.setItem('highScore', newTime);
      }
    },
    handleTestComplete() {
    this.$emit('testComplete');
  },
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

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
}

.fail-message {
  color: yellow;
  font-size: 1.5rem;
  margin-top: 20px;
}

</style>
